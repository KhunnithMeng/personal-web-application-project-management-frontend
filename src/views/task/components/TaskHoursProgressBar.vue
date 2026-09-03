<script setup>
import {defineProps, onMounted, ref} from 'vue';

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

const progressHours = ref(0);
const progressColorIndicator = ref('blue-darken-1');

onMounted(() => {
  if (props.task) {
    progressHours.value = (props.task.actualHours /props.task.estimatedHours) * 100;
    progressColorIndicator.value = progressHours.value > 60 ? 'red-lighten-1' : 'blue-darken-1';
  }
})

</script>

<template>
  <div class="d-flex justify-space-between">
    <div>Est. <span class="font-weight-bold">{{ props.task?.estimatedHours }}h</span></div>
    <div>Act. <span class="font-weight-bold">{{ props.task?.actualHours }}h</span></div>
  </div>
  <v-progress-linear :color="progressColorIndicator"
                     :height="5"
                     rounded
                     :model-value="progressHours"></v-progress-linear>
</template>

<style scoped>

</style>