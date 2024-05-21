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
                <VaButton @click="openModal">Adicionar Item</VaButton>
            </div>

            <!-- Tabela -->
            <VaDataTable :items="filteredData" :columns="columns" class="va-table">
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
                    <VaButton @click="editItem(row)" preset="primary" size="small" icon="mso-edit"
                        aria-label="Edit item" />
                    <VaButton @click="deleteItem(row.id)" preset="primary" size="small" icon="mso-delete" color="danger"
                        aria-label="Delete item" />
                </template>
            </VaDataTable>
        </VaCardContent>
    </VaCard>

    <!-- Modal -->
    <VaModal v-model="isModalOpen">
        <template #header>{{ isEditing ? 'Editar Item' : 'Adicionar Item' }}</template>
        <VaForm @submit.prevent="handleSubmit">
            <VaInput v-model="formData.description" label="Description" required />
            <!-- Outros campos do formulário aqui -->
            <VaButton type="submit">{{ isEditing ? 'Salvar' : 'Adicionar' }}</VaButton>
        </VaForm>
    </VaModal>
</template>

<script>
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'BaseTable',
    props: {
        columns: {
            type: Array,
            required: true
        },
        data: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            searchQuery: '',
            isModalOpen: false,
            isEditing: false,
            formData: {
                description: ''
            }
        };
    },
    computed: {
        filteredData() {
            if (!this.searchQuery) return this.data;
            return this.data.filter(item => Object.values(item).some(value => value.toString().toLowerCase().includes(this.searchQuery.toLowerCase())));
        }
    },
    methods: {
        openModal() {
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
            this.isEditing = false;
            this.formData = {
                description: ''
            };
        },
        handleSubmit() {
            if (this.isEditing) {
                // Lógica para atualizar o item
            } else {
                // Lógica para adicionar o novo item
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
        },
        formatDate(date) {
            if (!date) return 'N/A';
            return new Date(date).toLocaleString();
        }
    }
});
</script>

<style scoped>
.va-table {
    width: 100%;
}
</style>
