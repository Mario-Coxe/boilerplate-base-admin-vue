<template>
    <div>
        <BaseTable :columns="columns" :data="luggageData" :formColumns="formColumns" :fetchData="fetchData"
            :loading="loading" :showActions="showActions" />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseTable from '../../../components/base-admin/BaseTable.vue';
import luggageTypeService from '../luggageTypeService';

export default defineComponent({
    name: 'LuggageTable',
    components: {
        BaseTable,
    },
    data() {
        return {
            columns: [
                { key: 'index', label: 'Index' },
                { key: 'uuid', label: 'UUID' },
                { key: 'slug', label: 'Slug' },
                { key: 'description', label: 'Description' },
                { key: 'is_active', label: 'Active' },
                { key: 'is_deleted', label: 'Deleted' },
                { key: 'created_at', label: 'Created At' },
                { key: 'updated_at', label: 'Updated At' },
                //{ key: 'actions', label: 'Actions' },
            ],
            luggageData: [],
            formColumns: [
                { key: 'description', label: 'Description', required: true },
                { key: 'slug', label: 'Slug' },
            ],
            loading: false,
            showActions: false, 
        };
    },
    methods: {
        async fetchData(params = {}) {
            try {
                const response = await luggageTypeService.getRecords(params);
                this.luggageData = response.data.data;
                return response;
            } catch (error) {
                console.error('Error fetching luggage data:', error);
                throw error;
            }
        },
    },
});
</script>
