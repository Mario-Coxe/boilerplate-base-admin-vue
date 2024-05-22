<template>
    <VaModal v-model="isOpen" size="small" mobile-fullscreen hide-default-actions @close="closeModal">
        <VaForm @submit.prevent="handleSubmit" class="flex-col justify-start items-start gap-4 inline-flex w-full">
            <div v-for="column in formColumns" :key="column.key" class="w-full">
                <VaInput v-model="formData[column.key]" :label="column.label" :required="column.required || false"
                    class="w-full" />
            </div>
            <div class="modal-actions w-full">
                <VaButton @click="closeModal" color="secondary">Cancelar</VaButton>
                <VaButton type="submit">{{ isEditing ? 'Salvar' : 'Adicionar' }}</VaButton>
            </div>
        </VaForm>
    </VaModal>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ItemModal',
    props: {
        isOpen: {
            type: Boolean,
            required: true
        },
        isEditing: {
            type: Boolean,
            required: true
        },
        formData: {
            type: Object,
            required: true
        },
        formColumns: {
            type: Array,
            required: true
        }
    },
    emits: ['update:isOpen', 'submit'],
    methods: {
        handleSubmit() {
            this.$emit('submit');
        },
        closeModal() {
            this.$emit('update:isOpen', false);
        }
    }
});
</script>

<style scoped>
.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
}
</style>
