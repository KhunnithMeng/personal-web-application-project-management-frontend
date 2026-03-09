<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  items: {
    type: Array,
    required: true
  },
  label: String,
  modelValue: [String, Number]
});

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <v-select label="Status"
            variant="underlined"
            :items="items"
            item-title="title"
            item-value="value"
            :model-value="modelValue"
            @update:model-value="emit('update:modelValue', $event)">
    <template #selection="{ item }">
                  <span>
                    <v-icon :icon="item.raw.icon"
                            :color="item.raw.color"
                            size="18"
                            class="mr-2"></v-icon> {{ item.title }}
                  </span>
    </template>

    <template #item="{ props, item }">
      <v-list-item v-bind="props">
        <template #prepend>
          <v-icon :icon="item.raw.icon"
                  :color="item.raw.color"></v-icon>
        </template>
      </v-list-item>
    </template>
  </v-select>
</template>

<style scoped>

</style>
