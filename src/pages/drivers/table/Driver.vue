<template>
    <div>
        <BaseTable :columns="columns" :formColumns="formColumns" :fetchData="fetchData" :createItem="createItem"
            :updateItem="updateItem" :removeItem="removeItem" :loading="loading" :showActions="showActions" />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseTable from '../../../components/base-admin/BaseTable.vue';
import driverService from '../driverService';

export default defineComponent({
    name: 'DriverTable',
    components: {
        BaseTable,
    },
    data() {
        return {
            columns: [
                { key: 'full_name', label: 'Name' },
                { key: 'phone_number', label: 'Phone' },
                { key: 'email', label: 'Email' },
                { key: 'suppliers.name', label: 'Suppliers'}

                // { key: 'actions', label: 'Actions' },
            ],
            formColumns: [

            ],
            loading: false,
            showActions: false,
        };
    },
    methods: {
        async fetchData(params = {}) {
            try {
                const response = await driverService.getRecords(params);
                return response;
            } catch (error) {
                console.error('Error fetching  driver data:', error);
                throw error;
            }
        },
    },
});
</script>
