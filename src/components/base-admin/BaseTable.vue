<!-- BaseTable.vue -->
<template>
    <div class="base-table overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th v-for="column in columns" :key="column.key"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {{ column.label }}
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(row, rowIndex) in paginatedData" :key="rowIndex">
                    <td v-for="column in columns" :key="column.key" class="px-6 py-4 whitespace-nowrap">
                        <slot :name="column.key" :row="row">{{ row[column.key] }}</slot>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="pagination mt-4 flex items-center justify-between">
            <button @click="prevPage" :disabled="currentPage === 1"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50">
                Anterior
            </button>
            <span class="text-sm text-gray-700">
                Página {{ currentPage }} de {{ totalPages }}
            </span>
            <button @click="nextPage" :disabled="currentPage === totalPages"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50">
                Próxima
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BaseTable',
    props: {
        columns: {
            type: Array,
            required: true
        },
        data: {
            type: Array,
            required: true
        },
        pageSize: {
            type: Number,
            default: 10
        }
    },
    data() {
        return {
            currentPage: 1
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.data.length / this.pageSize);
        },
        paginatedData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.data.slice(start, end);
        }
    },
    methods: {
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        }
    }
}
</script>

<style scoped>
.base-table {
    width: 100%;
}

.pagination button:disabled {
    cursor: not-allowed;
}
</style>
