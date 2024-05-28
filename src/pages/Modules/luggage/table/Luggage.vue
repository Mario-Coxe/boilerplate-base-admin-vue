<template>
    <div>
        <h3 class="page-title font-bold">Luggage Type</h3>
        <BaseTable :columns="columns" :formColumns="formColumns" :showActions="showActions"
            :service="luggageTypeService" />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseTable from '../../../../components/base-admin/BaseTable.vue';
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
            ],
            formColumns: [
                { key: 'description', label: 'Description', required: true },
                { key: 'slug', label: 'Slug' },
            ],
            luggageTypeService,
            showActions: false,
        };
    }

});
</script>
