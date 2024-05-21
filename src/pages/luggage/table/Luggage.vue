<template>
    <BaseTable :columns="columns" :data="luggageData" />
</template>

<script>
import { defineComponent } from 'vue';

import BaseTable from '../../../components/base-admin/BaseTable.vue';
import luggageTypeService from '../luggageTypeService';


export default defineComponent({
    name: 'LuggageTable',
    components: {
        BaseTable
    },
    data() {
        return {
            columns: [
                { key: 'id', label: 'ID' },
                { key: 'uuid', label: 'UUID' },
                { key: 'slug', label: 'Slug' },
                { key: 'description', label: 'Description' },
                { key: 'is_active', label: 'Active' },
                { key: 'is_deleted', label: 'Deleted' },
                { key: 'created_at', label: 'Created At' },
                { key: 'updated_at', label: 'Updated At' },
                { key: 'actions', label: 'Actions' }
            ],
            luggageData: [],
            loading: true
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
            } finally {
                this.loading = false;
            }
        }
    }
});
</script>
