<script setup>
import {defineProps, onMounted, ref} from 'vue';
import {formatDate} from "@/utils/date";

const props = defineProps({
  task: {
    type: Object,
    required: true,
  }
});

const date = ref({});

onMounted(() => {
  const dateMemberList = formatDate(props.task).split(' ');
  if (dateMemberList?.length > 0) {
    const month = dateMemberList[1];
    const day = dateMemberList[2];
    const year = dateMemberList[3];
    date.value = { month, day, year }
  }
})

</script>

<template>
  <div class="d-flex flex-row">
    <span class="text-amber mr-1">{{ date.month }} {{ date.day }} </span> {{ date.year }}
    <v-chip class="d-inline d-flex justify-center align-center ml-1"
            size="x-small"
            variant="elevated"
            color="amber">
      Soon
    </v-chip>
  </div>

</template>

<style scoped>

</style>
