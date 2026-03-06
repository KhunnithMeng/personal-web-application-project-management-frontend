<script setup>
import {onMounted, ref} from "vue";
import {getTasks} from "@/services/task-service";
import TruncateText from "@/components/commons/TruncateText.vue";
import {formatDate} from "@/utils/date";

const headers = Object.freeze([
  { title: 'Title', key: 'title' },
  { title: 'Status', key: 'status' },
  { title: 'Priority', key: 'priority' },
  { title: 'Deadline', key: 'deadline' },
  { title: 'Estimated Hours', key: 'estimatedHours' },
  { title: 'Actual Hours', key: 'actualHours' },
  { title: 'Tags', key: 'tags' },
  { title: 'Description', key: 'description' },
]);

const loader = ref(false);
const items = ref([]);

onMounted(() => {
  loader.value = true;
  getTasks()
      .then(res => {
        items.value = res;
      })
      .catch(err => console.error(err))
      .finally(() => loader.value = false)
})

</script>

<template>
  <div class="ma-5">
    <div class="d-flex justify-space-between align-center">
      <h1>Task</h1>

      <v-btn color="primary"
             prepend-icon="mdi-plus-thick">
        Create Task
      </v-btn>
    </div>

    <div class="mt-3">
      <v-data-table :headers="headers"
                    :items="items"
                    :loading="loader">
        <template v-slot:[`item.status`]="{ value }">
          <v-chip> {{value}} </v-chip>
        </template>

        <template v-slot:[`item.deadline`]="{ value }">
          {{ formatDate(value) }}
        </template>

        <template v-slot:[`item.estimatedHours`]="{ value }">
          {{ value }} Hours
        </template>

        <template v-slot:[`item.actualHours`]="{ value }">
          {{ value }} Hours
        </template>

        <template v-slot:[`item.tags`]="{ value }">
          <v-chip-group column>
            <v-chip v-for="tag of value" :key="tag.id">
              {{ tag.name }}
            </v-chip>
          </v-chip-group>
        </template>

        <template v-slot:[`item.description`]="{ value }">
          <TruncateText :text="value"></TruncateText>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<style scoped>

</style>
