<script setup>
import {computed, defineProps, defineEmits} from 'vue';
import TruncateText from "@/components/commons/TruncateText.vue";
import {PROJECT_STATUSES} from "@/constants/projectStatus";
import {formatMonthDayNumberYear} from "../../../utils/date";
import {PROJECT_ACTION} from "@/constants/projectAction";

const emits = defineEmits(['handleAction']);
const props = defineProps([
  'category',
  'status',
  'title',
  'description',
  'startDate',
  'endDate',
  'techStacks'
]);

const statusTypeColor = computed(() => {
  return PROJECT_STATUSES
      .find(projectStatus => projectStatus.value === props.status)?.color || 'primary'
});

</script>

<template>
    <v-sheet class="pa-5 d-flex flex-column ga-3 h-100 project-card"
             rounded="lg"
             :class="status"
             :style="{ '--status-color': statusTypeColor }">
      <div class="d-flex justify-space-between">
        <span>{{ category }}</span>
        <v-chip variant="tonal" :color="statusTypeColor">
          {{ status }}
        </v-chip>
      </div>
      <h3>{{ title }}</h3>
      <p class="h-100 text-grey">
        <TruncateText :text="description" length="250"></TruncateText>
      </p>
      <v-divider></v-divider>
      <span>
          <v-icon size="small" class="mr-2">mdi-calendar-blank</v-icon>
          {{ formatMonthDayNumberYear(startDate) }} → {{ formatMonthDayNumberYear(endDate) || 'No End Date' }}
        </span>
      <v-divider></v-divider>
      <div class="v-flex flex-row">
        <v-chip class="ma-1">Next.js</v-chip>
        <v-chip class="ma-1">Tailwind CSS</v-chip>
        <v-chip class="ma-1">TypeScript</v-chip>
      </div>
      <div class="mt-3 d-flex flex-row justify-end ga-1">

        <v-tooltip location="bottom" v-for="action of PROJECT_ACTION" :key="action.value">
          <template #activator="{ props }">
            <v-btn size="small"
                   v-bind="props"
                   variant="tonal"
                   :icon="action.icon"
                   @click="emits('handleAction', action.value)">
            </v-btn>
          </template>
          {{ action.name }}
        </v-tooltip>
      </div>
    </v-sheet>
</template>

<style scoped>
.project-card {
  overflow: hidden;
  position: relative;
}

.project-card:before {
  content: ' ';
  height: 3px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.planning:before {
  content: '';
  background-color: #FDD835;
}

.active:before {
  content: '';
  background-color: #039BE5;
}

.complete:before {
  content: '';
  background-color: #66BB6A;
}

.waiting:before {
  content: '';
  background: #FB8C00;
}
</style>