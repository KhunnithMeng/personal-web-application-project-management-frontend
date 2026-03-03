<script setup>
import {computed, defineProps} from 'vue';
const props = defineProps({
  text: { type: String, default: '' },
  length: { type: Number, default: 60 }
});

const truncate = computed(() => {
  return props.text?.length > props.length ?
      props.text.slice(0, props.length) + '...' : props.text;
})
</script>

<template>
{{ truncate }}
</template>

<style scoped>

</style>