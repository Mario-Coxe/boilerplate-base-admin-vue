<template>
    <div>
        <BaseTable :columns="columns" :data="luggageData" :formColumns="formColumns" :fetchData="fetchData"
            :loading="loading" :showActions="showActions" />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseTable from '../../../components/base-admin/BaseTable.vue';
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
            luggageData: [],
            formColumns: [
                { key: 'description', label: 'Description', required: true },
                { key: 'value', label: 'Value' },
            ],
            loading: false,
            showActions: true,
        };
    },
    methods: {
        async fetchData(params = {}) {
            try {
                const response = await colorsTypeService.getRecords(params);
                this.luggageData = response.data.data;
                return response;
            } catch (error) {
                console.error('Error fetching colors data:', error);
                throw error;
            }
        },
    },
});
</script>
