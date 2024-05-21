<!-- LuggageTable.vue -->
<template>
    <BaseTable :columns="columns" :data="luggageData">
        <template #description="{ row }">
            <strong>{{ row.description }}</strong>
        </template>
        <template #created_at="{ row }">
            <span>{{ formatDate(row.created_at) }}</span>
        </template>
        <template #updated_at="{ row }">
            <span>{{ formatDate(row.updated_at) }}</span>
        </template>
    </BaseTable>

</template>

<script>
import BaseTable from '../../../components/base-admin/BaseTable.vue';
import luggageTypeService from '../luggageTypeService';


export default {
    name: 'LuggageTable',
    components: {
        BaseTable
    },
    data() {
        return {
            columns: [
                { key: 'id', label: 'ID' },
                { key: 'slug', label: 'Slug' },
                { key: 'description', label: 'Description' },
                { key: 'is_active', label: 'Active' },
                { key: 'created_at', label: 'Created At' },
                { key: 'updated_at', label: 'Updated At' }
            ],
            luggageData: []
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const response = await luggageTypeService.getRecords();
                this.luggageData = response.data.data;
            } catch (error) {
                console.error('Error fetching luggage data:', error);
            }
        },
        formatDate(date) {
            if (!date) return 'N/A';
            return new Date(date).toLocaleString();
        }
    }
}
</script>

<style scoped></style>
