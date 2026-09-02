<script setup>
import {defineProps, onMounted, ref} from 'vue';
import {formatDate, getDaysBetweenDates} from "@/utils/date";

const props = defineProps({
  deadline: {
    type: String,
    required: true,
  }
});

const date = ref({});
const isDeadlineSoon = ref(false);
const isDeadline = ref(false);

onMounted(() => {
  if (!props.deadline) return;

  const dateMemberList = formatDate(props.deadline).split(' ');
  if (dateMemberList?.length > 0) {
    const month = dateMemberList[1];
    const day = dateMemberList[2];
    const year = dateMemberList[3];
    date.value = {month, day, year}
  }

  const currentDate = new Date();
  const deadline = new Date(props.deadline);
  if (deadline < currentDate) {
    isDeadline.value = true;
  } else if (getDaysBetweenDates(currentDate, deadline) < 3) {
    isDeadlineSoon.value = true;
  } else {
    isDeadlineSoon.value = false;
    isDeadline.value = false;
  }
})

</script>

<template>
  <div class="mr-1 align-center"
       :class="{'text-amber': isDeadlineSoon, 'text-red': isDeadline}">
    {{ date.month }} {{ date.day }}
    <span class="text-white">{{ date.year }}</span>
    <template v-if="isDeadlineSoon || isDeadline">
      <v-chip v-if="isDeadlineSoon"
              size="x-small"
              variant="tonal"
              class="ml-1"
              color="amber">
        Soon
      </v-chip>
      <v-chip v-else-if="isDeadline"
              size="x-small"
              variant="tonal"
              class="ml-1"
              color="red">
        Overdue
      </v-chip>
    </template>
  </div>
</template>

<style scoped>

</style>
