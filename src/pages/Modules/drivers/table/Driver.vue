<template>
    <div>
        <BaseTable :columns="columns" :formColumns="formColumns" :showActions="showActions" :service="driverService" />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseTable from '../../../../components/base-admin/BaseTable.vue';
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
                { key: 'suppliers.name', label: 'Suppliers' }
            ],
            formColumns: [

            ],
            driverService,
            showActions: false,
        };
    }
});
</script>
