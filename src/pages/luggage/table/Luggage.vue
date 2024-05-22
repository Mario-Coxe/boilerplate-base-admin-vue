<template>
    <div>
        <BaseTable :columns="columns" :data="luggageDataWithIndex" :formColumns="formColumns" :fetchData="fetchData" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseTable from '../../../components/base-admin/BaseTable.vue';
import luggageTypeService from '../luggageTypeService';

interface Column {
    key: string;
    label: string;
}

interface FormColumn {
    key: string;
    label: string;
    required?: boolean;
}

interface LuggageType {
    id: number;
    uuid: string;
    slug: string;
    description: string;
    is_active: number;
    is_deleted: number;
    created_at: string;
    updated_at: string;
}

export default defineComponent({
    name: 'LuggageTable',
    components: {
        BaseTable,
    },
    data() {
        return {
            columns: [
                { key: 'index', label: 'ID' },
                { key: 'slug', label: 'Slug' },
                { key: 'description', label: 'Description' },
                { key: 'created_at', label: 'Created At' },
                { key: 'actions', label: 'Actions' },
            ] as Column[],
            luggageData: [] as LuggageType[],
            formColumns: [
                { key: 'description', label: 'Description', required: true },
                { key: 'slug', label: 'Slug' },
            ] as FormColumn[],
            currentPage: 1,
            itemsPerPage: 10,
            totalPages: 1,
        };
    },
    computed: {
        luggageDataWithIndex() {
            return this.luggageData.map((item, index) => {
                return { ...item, index: (this.currentPage - 1) * this.itemsPerPage + index + 1 };
            });
        }
    },
    methods: {
        async fetchData(params = {}) {
            try {
                const response = await luggageTypeService.getRecords(params);
                this.luggageData = response.data.data;
                this.totalPages = response.data.lastPage;
            } catch (error) {
                console.error('Error fetching luggage data:', error);
            }
        },
    },
    created() {
        this.fetchData({ page: this.currentPage, perPage: this.itemsPerPage });
    },
});
</script>
