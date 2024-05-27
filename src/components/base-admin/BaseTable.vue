<template>
    <VaAlert v-model="isSucessAlert" color="success" closeable class="mb-6">
        {{ message }}
    </VaAlert>

    <pdfexport ref="gridPdfExport">
        <VaCard>
            <VaCardContent>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                    <VaInput v-model="searchQuery" placeholder="Search">
                        <template #prependInner>
                            <VaIcon name="search" color="secondary" size="small" />
                        </template>

                    </VaInput>
                    <VaButton icon="update" color="success" @click="loadData"> Refresh </VaButton>
                    <VaButton @click="openModal" icon="add">Adicionar Item</VaButton>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end left">
                        <VaButton icon="download" preset="primary"> PDF </VaButton>
                        <VaButton icon="download" preset="primary"> Excel </VaButton>
                    </div>
                </div>

                <VaDataTable :items="tableData" :columns="columns" class="va-table-responsive" v-if="!loading">
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

                <!-- Paginação -->
                <div class="pagination">
                    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
                    <span>Page {{ currentPage }} of {{ totalPages }}</span>
                    <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
                </div>
            </VaCardContent>
        </VaCard>
    </pdfexport>

    <ItemModal :isOpen="isModalOpen" :isEditing="isEditing" :formData="formData" :formColumns="formColumns"
        @update:isOpen="isModalOpen = $event" @submit="handleSubmit" />
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
        fetchData: {
            type: Function,
            required: true,
        },
        createItem: {
            type: Function,
            required: true,
        },
        updateItem: {
            type: Function,
            required: true,
        },
        removeItem: {
            type: Function,
            required: true,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        showActions: {
            type: Boolean,
            default: true,
        },
        service: {
            type: Function,
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
            message: '',
            service: Function,
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
        // currentPage() {
        //     this.loadData();
        // },
        // itemsPerPage() {
        //     this.loadData();
        // },
        searchQuery() {
            this.loadData();
        },
    },
    methods: {
        async loadData() {
            const params = {
                page: this.searchQuery ? 1 : this.currentPage,
                perPage: this.searchQuery ? this.total : this.itemsPerPage,
                search: this.searchQuery,
            }
            const response = await this.fetchData(params)

            this.tableData = response.data.data
            this.total = response.data.total
            this.totalPages = response.data.lastPage
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
        async handleSubmit() {
            //service
            /*
      
            */
            try {
                if (this.isEditing) {
                    const response = await service.update(this.formData.id, this.formData)
                    this.isSucessAlert = true;
                    this.message = response.message;
                    setTimeout(() => {
                        this.isSucessAlert = false;
                    }, 2000);
                    return response;
                } else {
                    await this.createItem(this.formData);
                }
                await this.loadData();
                this.closeModal();
            } catch (error) {
                console.error('Error saving item:', error);
            }
        },
        editItem(item) {
            this.formData = { ...item };
            this.isEditing = true;
            this.openModal();
        },
        async deleteItem(id) {
            //console.log("id >>> ", id);  
            try {
                await this.removeItem(id);
                await this.loadData();
            } catch (error) {
                console.error('Error deleting item:', error);
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
    },
    created() {
        this.loadData();
        console.log("Service >>> ", this.service)
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