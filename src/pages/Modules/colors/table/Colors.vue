<template>
    <div>
        <BaseTable :columns="columns" :formColumns="formColumns" :loading="loading" :showActions="showActions"
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
});
</script>
