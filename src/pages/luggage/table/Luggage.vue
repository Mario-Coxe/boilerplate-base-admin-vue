<template>
    <div>
        <BaseTable :columns="columns" :data="luggageData" :formColumns="formColumns" :fetchData="fetchData" />
        <div v-if="totalPages > 1" class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
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
                { key: 'index', label: 'index' },
                { key: 'uuid', label: 'UUID' },
                { key: 'slug', label: 'Slug' },
                { key: 'description', label: 'Description' },
                { key: 'is_active', label: 'Active' },
                { key: 'is_deleted', label: 'Deleted' },
                { key: 'created_at', label: 'Created At' },
                { key: 'updated_at', label: 'Updated At' },
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
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.fetchData({ page: this.currentPage, perPage: this.itemsPerPage });
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.fetchData({ page: this.currentPage, perPage: this.itemsPerPage });
            }
        },
        getFirstRecordIndex() {
            return (this.currentPage - 1) * this.itemsPerPage + 1;
        }
    },
    created() {
        this.fetchData({ page: this.currentPage, perPage: this.itemsPerPage });
    },
});
</script>

<style>
.pagination {
    margin-top: 20px;
}
</style>
