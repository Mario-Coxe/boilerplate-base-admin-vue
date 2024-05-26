<template>
    <div>
        <BaseTable :columns="columns" :formColumns="formColumns" :fetchData="fetchData" :createItem="createItem"
            :updateItem="updateItem" :removeItem="removeItem" :loading="loading" :showActions="showActions" />
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
                { key: 'slug', label: 'Slug' },
                { key: 'description', label: 'Description' },
                { key: 'created_at', label: 'Created At' },
                // { key: 'actions', label: 'Actions' },
            ],
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
                return response;
            } catch (error) {
                console.error('Error fetching luggage data:', error);
                throw error;
            }
        },
        async createItem(data) {
            try {
                const response = await luggageTypeService.create(data);
                return response;
            } catch (error) {
                console.error('Error creating luggage item:', error);
                throw error;
            }
        },
        async updateItem(data) {
            try {
                const response = await luggageTypeService.update(data.id, data);
                return response;
            } catch (error) {
                console.error('Error updating luggage item:', error);
                throw error;
            }
        },
        async removeItem(id) {
            try {
                const response = await luggageTypeService.remove(id);
                return response;
            } catch (error) {
                console.error('Error deleting luggage item:', error);
                throw error;
            }
        },
    },
});
</script>
