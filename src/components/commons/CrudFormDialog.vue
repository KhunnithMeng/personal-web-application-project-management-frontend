<script setup>
import {defineProps, defineEmits, ref, watch} from 'vue';

const props = defineProps({
  modelValue: Boolean,
  title: String,
  fields: Array,
  dialogValue: {}
});
const emit = defineEmits(['update:modelValue', 'submit', 'cancel']);
const form = ref({});

watch(() => props.dialogValue, value => {
  form.value = Object.keys(value).length === 0 ? {} : { ...value };
}, { immediate: true })

function submit() {
  emit('submit', { isEdit: !!Object.keys(props.dialogValue).length, ...form.value });
  emit('update:modelValue', false);
  form.value = {};
}

function cancel() {
  emit('update:modelValue', false);
  emit('cancel');
  form.value = {};
}
</script>

<template>
  <v-dialog max-width="600"
            :model-value="modelValue"
            @update:model-value="v => emit('update:modelValue', v)">
    <v-card prepend-icon="mdi-list-box-outline"
            :title="title">
      <v-card-text>
        <v-row density="confortable">
          <v-col cols="12"
                 v-for="field in fields"
                 :key="field.key" >

            <v-text-field v-if="field.type === 'text'"
                          :label="field.name"
                          v-model="form[field.key]">
            </v-text-field>

            <v-textarea v-if="field.type === 'textarea'"
                        :label="field.name"
                        v-model="form[field.key]"></v-textarea>

          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn color="secondary"
               title="Cancel"
               type="flat"
               @click="cancel()">Cancel</v-btn>

        <v-btn color="primary"
               title="Submit"
               type="flat"
               @click="submit()">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
