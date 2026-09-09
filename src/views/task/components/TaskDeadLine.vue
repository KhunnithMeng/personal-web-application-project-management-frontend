<script setup>
import {defineProps, onMounted, ref} from 'vue';
import {formatDate, getDaysBetweenDates} from "@/utils/date";

const props = defineProps({
  deadline: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
  }
});

const date = ref({});
const isDeadlineSoon = ref(false);
const isDeadline = ref(false);
const isComplete = ref(false);

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

  if (props.status === 'completed') {
    isComplete.value = true;
    return
  }

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
       :class="{'text-amber': isDeadlineSoon, 'text-red': isDeadline, 'text-green': isComplete}">
    {{ date.month }} {{ date.day }}
    <span class="text-white mr-1">{{ date.year }}</span>
    <template v-if="isComplete">
      <v-chip size="x-small"
              variant="tonal"
              color="green">
        Complete
      </v-chip>
    </template>
    <template v-else-if="isDeadlineSoon || isDeadline">
      <v-chip v-if="isDeadlineSoon"
              size="x-small"
              variant="tonal"
              color="amber">
        Soon
      </v-chip>
      <v-chip v-if="isDeadline"
              size="x-small"
              variant="tonal"
              color="red">
        Overdue
      </v-chip>
    </template>
  </div>
</template>

<style scoped>

</style>
