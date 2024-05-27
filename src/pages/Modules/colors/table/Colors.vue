<template>
    <div>
        <BaseTable :columns="columns" :formColumns="formColumns" :fetchData="fetchData" :createItem="createItem"
            :updateItem="updateItem" :removeItem="removeItem" :loading="loading" :showActions="showActions"
            :service="colorsTypeService" />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseTable from '../../../../components/base-admin/BaseTable.vue';
import colorsTypeService from '../colorsTypeService';

export default defineComponent({
    name: 'ColorsTable',
    components: {
        BaseTable,
    },
    data() {
        return {
            columns: [
                { key: 'slug', label: 'Slug' },
                { key: 'description', label: 'Description' },
                { key: 'value', label: 'Value' },
                { key: 'created_at', label: 'Created At' },
                { key: 'actions', label: 'Actions' },
            ],
            formColumns: [
                { key: 'description', label: 'Description', required: true },
                { key: 'value', label: 'Value' },
            ],
            loading: false,
            showActions: true,
            colorsTypeService
        };
    },
    methods: {
        async fetchData(params = {}) {
            try {
                const response = await colorsTypeService.getRecords(params);
                return response;
            } catch (error) {
                console.error('Error fetching colors data:', error);
                throw error;
            }
        },
        
         async createItem(data) {
             try {
                 const response = await colorsTypeService.create(data);
                 return response;
             } catch (error) {
                 console.error('Error creating color:', error);
                 throw error;
             }
         },
         
        async updateItem(data) {
            try {
                const response = await colorsTypeService.update(data.id, data);
                this.message = response.message
                return response;
            } catch (error) {
                console.error('Error updating color:', error);
                throw error;
            }
        },
        async removeItem(id) {
            try {
                const response = await colorsTypeService.remove(id);
                return response;
            } catch (error) {
                console.error('Error deleting color:', error);
                throw error;
            }
        },
    },
});
</script>
