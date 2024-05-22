<template>
    <VaCard>
        <VaCardContent>
            <!-- Barra de Ações -->
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
                <template #cell(id)="{ index }">
                    <span>{{ startIndex + index + 1 }}</span>
                </template>
                <template #cell(description)="{ value }">
                    <strong>{{ value }}</strong>
                </template>
                <template #cell(created_at)="{ value }">
                    <span>{{ formatDate(value) }}</span>
                </template>
                <template #cell(updated_at)="{ value }">
                    <span>{{ formatDate(value) }}</span>
                </template>
                <template #cell(actions)="{ row }">
                    <VaButton @click="editItem(row)" preset="primary" size="small" icon="edit" aria-label="Edit item" />
                    <VaButton @click="deleteItem(row.id)" preset="primary" size="small" icon="delete" color="danger"
                        aria-label="Delete item" />
                </template>
            </VaDataTable>



            <!-- Paginação -->
            <VaPagination v-model:page="currentPage" :total="totalPages" class="mt-4" buttons-preset="secondary"
                :boundary-links="true" :direction-links="true" />

            <!-- Loader -->
            <!-- <div v-if="loading" class="loader">Loading...</div> -->
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
        data: {
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
        loading: {
            type: Boolean,
            default: false,
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
        };
    },
    computed: {
        filterOptions() {
            return this.columns.map((column) => ({ label: column.label, value: column.key }));
        },
        filteredData() {
            let filtered = this.data;
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
        startIndex() {
            return (this.currentPage - 1) * this.itemsPerPage;
        },
    },
    watch: {
        currentPage() {
            this.fetchData({ page: this.currentPage, perPage: this.itemsPerPage, search: this.searchQuery });
        },
        itemsPerPage() {
            this.fetchData({ page: this.currentPage, perPage: this.itemsPerPage, search: this.searchQuery });
        },
        searchQuery() {
            this.fetchData({ page: this.currentPage, perPage: this.itemsPerPage, search: this.searchQuery });
        },
    },
    methods: {
        openModal() {
            this.formData = this.getInitialFormData();
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
            this.isEditing = false;
            this.formData = this.getInitialFormData();
        },
        handleSubmit() {
            if (this.isEditing) {
                // Chame a API para atualizar o item e, em seguida, buscar os dados
            } else {
                // Chame a API para adicionar o item e, em seguida, buscar os dados
            }
            this.closeModal();
        },
        editItem(item) {
            this.formData = { ...item };
            this.isEditing = true;
            this.openModal();
        },
        async deleteItem(id) {
            // Chame a API para deletar o item e, em seguida, buscar os dados
            try {
                // Chame a função de remoção do serviço
                await this.remove(id);
                // Atualize os dados após a remoção
                await this.fetchData({ page: this.currentPage, perPage: this.itemsPerPage, search: this.searchQuery });
            } catch (error) {
                console.error('Error deleting item:', error);
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
    },
});
</script>

<style scoped>
.va-table {
    width: 100%;
}

.loader {
    text-align: center;
    padding: 20px;
}
</style>
