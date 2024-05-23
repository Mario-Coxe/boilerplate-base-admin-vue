<template>
    <VaCard>
        <VaCardContent>
            <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
                <VaInput v-model="searchQuery" placeholder="Search">
                    <template #prependInner>
                        <VaIcon name="search" color="secondary" size="small" />
                    </template>
                </VaInput>
                <VaSelect v-model="selectedColumn" :options="filterOptions" placeholder="Select Filter Column"
                    class="w-48" />
                <VaButton @click="openModal">Adicionar Item</VaButton>
            </div>

            <VaDataTable :items="paginatedData" :columns="columns" class="va-table" v-if="!loading">
                <template #cell(index)="{ index }">
                    <span>{{ getRecordIndex(index) }}</span>
                </template>
                <template #cell(actions)="{ row }">
                    <div v-show="showActions">
                        <VaButton @click="editItem(row)" preset="primary" size="small" icon="edit"
                            aria-label="Edit item" />
                        <VaButton @click="deleteItem(row.id)" preset="primary" size="small" icon="delete" color="danger"
                            aria-label="Delete item" />
                    </div>
                </template>
            </VaDataTable>

            <!-- Paginação -->
            <div v-if="totalPages > 1" class="pagination">
                <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
                <span>Page {{ currentPage }} of {{ totalPages }}</span>
                <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
            </div>

        </VaCardContent>
    </VaCard>

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
            tableData: [],
        };
    },
    computed: {
        filterOptions() {
            return this.columns.map((column) => ({ label: column.label, value: column.key }));
        },
        filteredData() {
            let filtered = this.tableData;
            if (this.searchQuery) {
                filtered = filtered.filter((item) => {
                    if (this.selectedColumn) {
                        return item[this.selectedColumn]?.toString().toLowerCase().includes(this.searchQuery.toLowerCase());
                    }
                    return Object.values(item).some((value) => value.toString().toLowerCase().includes(this.searchQuery.toLowerCase()));
                });
            }
            return filtered;
        },
        paginatedData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredData.slice(start, end);
        },
    },
    watch: {
        currentPage() {
            this.loadData();
        },
        itemsPerPage() {
            this.loadData();
        },
        searchQuery() {
            this.loadData();
        },
    },
    methods: {
        async loadData() {
            const params = {
                page: this.currentPage,
                perPage: this.itemsPerPage,
                search: this.searchQuery,
            };
            const response = await this.fetchData(params);
            this.tableData = response.data.data;
            this.totalPages = response.data.lastPage;
        },
        openModal() {
            this.formData = this.getInitialFormData();
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
            this.isEditing = false;
            this.formData = this.getInitialFormData();
        },
        async handleSubmit() {
            if (this.isEditing) {
                await this.updateItem(this.formData);
            } else {
                await this.createItem(this.formData);
            }
            this.closeModal();
            this.loadData();
        },
        editItem(item) {
            this.formData = { ...item };
            this.isEditing = true;
            this.openModal();
        },
        async deleteItem(id) {
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
    },
});
</script>

<style scoped>
.va-table {
    width: 100%;
}

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
