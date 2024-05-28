<template>
    <VaAlert v-model="isSucessAlert" color="success" closeable class="mb-6">
        {{ message }}
    </VaAlert>

    <VaAlert color="danger" border="top" class="mb-6" v-model="isFailedAlert">
        {{ message }}
    </VaAlert>

    <VaAlert color="warning" icon="warning" class="mb-6" v-model="isWaringAlert" closeable>
        It is in development
    </VaAlert>

    <pdfexport ref="gridPdfExport">
        <VaCard>
            <VaCardContent>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                    <VaInput v-model="searchQuery" placeholder="Search" label="Search">
                        <template #prependInner>
                            <VaIcon name="search" color="secondary" size="small" />
                        </template>
                    </VaInput>

                    <div class="max-w-xs">
                        <VaSelect v-model="value" label="Filter by" :options="options" multiple searchable
                            highlight-matched-text />
                    </div>

                    <VaButton icon="update" color="success" @click="loadData"> Refresh </VaButton>
                    <VaButton @click="openModal" icon="add" v-show="showActions">Adicionar Item</VaButton>
                    <VaButtonDropdown class="mr-2 flex space-x-4" preset="secondary" label="Export"
                        border-color="primary">
                        <VaButton icon="download" preset="primary" class="mr-6 mb-2" @click="exportPdf"> PDF </VaButton>
                        <VaButton icon="download" preset="primary" class="mr-6 mb-2" @click="exportExcel"> Excel
                        </VaButton>
                    </VaButtonDropdown>

                </div>

                <VaDataTable :items="tableData" :columns="columns" class="va-table va-table--striped" v-if="!loading">
                    <template #cell(index)="{ index }">
                        <span>{{ getRecordIndex(index) }}</span>
                    </template>
                    <template #cell(actions)="{ row }">
                        <div v-show="showActions">
                            <VaButton @click="editItem(row.itemKey)" preset="primary" size="small" icon="edit"
                                aria-label="Edit item" />
                            <VaButton @click="deleteItem(row.itemKey.id)" preset="primary" size="small" icon="delete"
                                color="danger" aria-label="Delete item" />
                        </div>
                    </template>
                </VaDataTable>


                <div class="p-10" v-if="loading">
                    <VaInnerLoading loading color="warning">
                        <VaCard>
                            <VaCardTitle></VaCardTitle>
                            <VaCardContent>

                            </VaCardContent>
                        </VaCard>
                    </VaInnerLoading>

                </div>


                <div class="pagination">
                    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
                    <span>Page {{ currentPage }} of {{ totalPages }}</span>
                    <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
                </div>
            </VaCardContent>
        </VaCard>
    </pdfexport>

    <ItemModal :isOpen="isModalOpen" :isEditing="isEditing" :formData="formData" :formColumns="formColumns"
        @update:isOpen="isModalOpen = $event" @submit="editOrCreate" />
</template>

<script>
import { defineComponent } from 'vue';
import ItemModal from './parts-components/ItemModal.vue';

export default defineComponent({
    name: 'BaseTable',
    components: {
        ItemModal,
    },
    props: {
        columns: {
            type: Array,
            required: true,
        },
        formColumns: {
            type: Array,
            required: true,
        },
        showActions: {
            type: Boolean,
            default: true,
        },
        service: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            searchQuery: '',
            selectedColumn: null,
            isModalOpen: false,
            isEditing: false,
            formData: this.getInitialFormData(),
            currentPage: 1,
            itemsPerPage: 10,
            totalPages: 1,
            isSucessAlert: false,
            isFailedAlert: false,
            isWaringAlert: false,
            message: '',
            loading: false,
            tableData: [],
        };
    },
    computed: {
        paginatedData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return (start, end);
        },
    },
    watch: {
        searchQuery() {
            this.loadData();
        },
    },
    methods: {
        async loadData() {

            this.loading = true;
            const params = {
                page: this.searchQuery ? 1 : this.currentPage,
                perPage: this.searchQuery ? this.total : this.itemsPerPage,
                search: this.searchQuery,
            }
            const response = await this.service.getRecords(params)

            this.tableData = response.data.data
            this.total = response.data.total
            this.totalPages = response.data.lastPage


            setTimeout(() => {
                this.loading = false;
            }, 500);
        },
        openModal() {
            this.formData = this.isEditing ? { ...this.formData } : this.getInitialFormData();
            this.isModalOpen = true;
        },

        closeModal() {
            this.isModalOpen = false;
            this.isEditing = false;
            this.formData = this.getInitialFormData();
        },

        async editOrCreate() {
            try {
                if (this.isEditing) {
                    try {
                        const response = await this.service.update(this.formData.id, this.formData);
                        this.message = response.data.message;
                        this.isSucessAlert = true;
                        this.closeModal();
                        setTimeout(() => {
                            this.isSucessAlert = false;
                        }, 2000);
                        this.loadData();
                        return response;
                    } catch (error) {
                        this.message = error.response.data.message;
                        this.isFailedAlert = true;
                        setTimeout(() => {
                            this.isFailedAlert = false;
                        }, 2500);
                        this.closeModal();
                    }
                } else {
                    try {
                        const response = await this.service.create(this.formData);
                        this.message = response.data.message;
                        this.isSucessAlert = true;
                        this.closeModal();
                        setTimeout(() => {
                            this.isSucessAlert = false;
                        }, 2000);
                        this.loadData();
                    } catch (error) {
                        this.message = error.response.data.message;
                        this.isFailedAlert = true;
                        setTimeout(() => {
                            this.isFailedAlert = false;
                        }, 2500);
                        this.closeModal();
                    }
                }
            } catch (error) {
                this.message = error;
                this.isFailedAlert = true;
            }
        },


        editItem(item) {
            this.formData = { ...item };
            this.isEditing = true;
            this.openModal();
        },
        async deleteItem(id) {
            try {
                const response = await this.service.delete(id);
                this.message = response.data.message;
                this.isSucessAlert = true;
                setTimeout(() => {
                    this.isSucessAlert = false;
                }, 2000);
                this.loadData();
            } catch (error) {
                this.message = error
                this.isFailedAlert = true;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.loadData();
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.loadData();
            }
        },
        formatDate(date) {
            if (!date) return 'N/A';
            return new Date(date).toLocaleString();
        },
        getInitialFormData() {
            return this.formColumns.reduce((acc, column) => {
                acc[column.key] = '';
                return acc;
            }, {});
        },
        getRecordIndex(index) {
            return (this.currentPage - 1) * this.itemsPerPage + index + 1;
        },
        exportPdf() {
            this.isWaringAlert = true;
            setTimeout(() => {
                this.isWaringAlert = false;
            }, 2000);
        },
        exportExcel() {
            this.isWaringAlert = true;
            setTimeout(() => {
                this.isWaringAlert = false;
            }, 2000);
        }
    },
    created() {
        this.loadData();
    },
});
</script>

<style scoped>
.pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 10px;
}

.loader {
    text-align: center;
    padding: 20px;
}
</style>