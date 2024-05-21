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

            <!-- Tabela -->
            <VaDataTable :items="paginatedData" :columns="columns" class="va-table">
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
            <VaPagination v-if="totalPages > 1" v-model:page="currentPage" :total="totalPages" class="mt-4" />
        </VaCardContent>
    </VaCard>

    <!-- Modal -->
    <ItemModal :isOpen="isModalOpen" :isEditing="isEditing" :formData="formData" :formColumns="formColumns"
        @update:isOpen="isModalOpen = $event" @submit="handleSubmit" />
</template>

<script>
import { defineComponent } from 'vue';
//import ItemModal from './ItemModal.vue';

import ItemModal from './parts/ItemModal.vue';

export default defineComponent({
    name: 'BaseTable',
    components: {
        ItemModal,
    },
    props: {
        columns: {
            type: Array,
            required: true
        },
        data: {
            type: Array,
            required: true
        },
        formColumns: {
            type: Array,
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
            itemsPerPage: 10
        };
    },
    computed: {
        filterOptions() {
            return this.columns.map(column => ({ label: column.label, value: column.label }));
        },
        filteredData() {
            let filtered = this.data;

            if (this.searchQuery) {
                filtered = filtered.filter(item => {
                    if (this.selectedColumn) {
                        return item[this.selectedColumn]?.toString().toLowerCase().includes(this.searchQuery.toLowerCase());
                    }
                    return Object.values(item).some(value => value.toString().toLowerCase().includes(this.searchQuery.toLowerCase()));
                });
            }

            return filtered;
        },
        paginatedData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredData.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.filteredData.length / this.itemsPerPage);
        }
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
                // Lógica para atualizar o item
                console.log("Updating item:", this.formData);
            } else {
                // Lógica para adicionar o novo item
                console.log("Adding item:", this.formData);
            }
            this.closeModal();
        },
        editItem(item) {
            this.formData = { ...item };
            this.isEditing = true;
            this.openModal();
        },
        deleteItem(id) {
            // Lógica para deletar o item
            console.log("Deleting item with id:", id);
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
        }
    }
});
</script>

<style scoped>
.va-table {
    width: 100%;
}
</style>
