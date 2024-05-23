<template>
    <VaModal v-model="isOpen" size="small" mobile-fullscreen hide-default-actions @close="closeModal">
        <VaForm @submit.prevent="handleSubmit" class="flex-col justify-start items-start gap-4 inline-flex w-full">
            <div v-for="column in formColumns" :key="column.key" class="w-full">
                <VaInput v-model="formData[column.key]" :label="column.label" :required="column.required || false"
                    class="w-full" />
            </div>
            <div class="modal-actions w-full">
                <VaButton @click="closeModal" color="secondary">Cancelar</VaButton>
                <VaButton @click="handleSubmit" type="submit">{{ isEditing ? 'Salvar' : 'Adicionar' }}</VaButton>
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
    emits: ['update:isOpen', 'submit'], // Certifique-se de que 'submit' está incluído na lista de eventos emitidos
    methods: {
        handleSubmit() {
            console.log('handleSubmit chamado');
            this.$emit('submit');
        },

        closeModal() {
            // Este método deveria emitir o evento 'update:isOpen' com o valor 'false' para fechar o modal
            this.$emit('update:isOpen', false);
        }
    }
});
</script>
