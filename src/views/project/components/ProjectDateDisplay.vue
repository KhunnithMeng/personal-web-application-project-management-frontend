<script setup>
import {computed, defineProps, onMounted, ref} from 'vue';

const props = defineProps({
  date: {
    type: String,
    required: true
  }
});


onMounted(() => {
  if (!props.date) {
    monthDay.value = ''
    year.value = '';
  }
})

const monthDay = computed(() => {
  const date = new Date(props.date);
  const dayOfTheMonth = String(date.getDate()).padStart(2, '0');
  const shortMonth = date.toLocaleDateString('default', { month: 'short' })
  return `${shortMonth} ${dayOfTheMonth}`;
});

const year = computed(() => {
  const date = new Date(props.date);
  return String(date.getFullYear());
})

</script>

<template>
  <div>
    {{ monthDay }} <br>
    <span class="font-weight-bold">{{ year }}</span>
  </div>
</template>

<style scoped>

</style>