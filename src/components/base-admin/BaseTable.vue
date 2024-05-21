<template>
    <VaCard>
        <VaCardContent>
            <div class="flex flex-col md:flex-row gap-2 mb-2 justify-between">
                <div class="flex flex-col md:flex-row gap-2 justify-start">
                    <VaInput placeholder="Search">
                        <template #prependInner>
                            <VaIcon name="search" color="secondary" size="small" />
                        </template>
                    </VaInput>
                </div>
                <VaButton>Add User</VaButton>
            </div>

            <div class="va-table-responsive">
                <table class="va-table">
                    <thead class="bg-gray-200">
                        <tr>
                            <th v-for="column in columns" :key="column.key"
                                class="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">{{
                                    column.label }}</th>
                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">Ações
                            </th>
                        </tr>
                    </thead>

                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(row, index) in data" :key="row.id">
                            <td v-for="column in columns" :key="column.key" class="px-4 py-2 whitespace-nowrap">
                                {{
                                    row[column.key] }}</td>
                            <td class="px-4 py-2 whitespace-nowrap">
                                <VaButton preset="primary" size="small" icon="mso-edit" aria-label="Edit user" />
                                <VaButton preset="primary" size="small" icon="mso-delete" color="danger"
                                    aria-label="Delete user" />

                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>

        </VaCardContent>
    </VaCard>
</template>

<script>
export default {
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
            default: true,
            isModalOpen: false,
            isEditing: false,
            formData: {
                description: ''
            }
        };
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
            } else {
            }
            this.closeModal();
        },
        editItem(item) {
            this.formData = { ...item };
            this.isEditing = true;
            this.openModal();
        },
        deleteItem(id) {
        },

    }
}
</script>

<style></style>
