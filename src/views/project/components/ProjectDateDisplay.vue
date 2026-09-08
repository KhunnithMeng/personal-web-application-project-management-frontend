<script setup>
import {defineProps, onMounted, ref} from 'vue';

const props = defineProps({
  date: {
    type: String,
    required: true
  }
});

const monthDay = ref('');
const year = ref('');

onMounted(() => {
  if (!props.date) {
    monthDay.value = ''
    year.value = '';
    return
  }

  const date = new Date(props.date);
  const dayOfTheMonth = String(date.getDate()).padStart(2, '0');
  const shortMonth = date.toLocaleDateString('default', { month: 'short' })
  monthDay.value = `${shortMonth} ${dayOfTheMonth}`;
  year.value = String(date.getFullYear());
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