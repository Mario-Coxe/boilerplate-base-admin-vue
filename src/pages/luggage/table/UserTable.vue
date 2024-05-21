<!-- UserTable.vue -->
<template>
    <div class="user-table">
        <BaseTable :columns="columns" :data="users">
            <template #name="{ row }">
                <strong>{{ row.name }}</strong>
            </template>
            <template #email="{ row }">
                <a :href="'mailto:' + row.email" class="text-blue-600">{{ row.email }}</a>
            </template>
        </BaseTable>
    </div>
</template>

<script>
import BaseTable from '../../../components/base-admin/BaseTable.vue';
export default {
    name: 'UserTable',
    components: {
        BaseTable
    },
    data() {
        return {
            columns: [
                { key: 'id', label: 'ID' },
                { key: 'name', label: 'Nome' },
                { key: 'email', label: 'Email' },
                { key: 'created_at', label: 'Criado em' }
            ],
            users: [
                { id: 1, name: 'John Doe', email: 'john@example.com', created_at: '2023-01-01' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com', created_at: '2023-02-15' }
                // mais dados de exemplo...
            ]
        };
    }
}
</script>

<style scoped>
.user-table {
    margin: 20px;
}
</style>
