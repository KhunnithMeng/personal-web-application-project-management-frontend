<script setup>

import {onMounted, ref, defineEmits, defineProps, watch} from "vue";
import {TASK_STATUSES} from "@/constants/taskStatus";
import {TASK_PRIORITY} from "@/constants/taskPriority";
import {getTags} from "@/services/tag-service";
import {formatDateLocal} from "@/utils/date";
import {getProjects} from "@/services/project-service";

const emit = defineEmits(['search']);
const props = defineProps(['projectId'])

const filterForm = ref({
  title: '',
  status: null,
  priority: null,
  deadline: null,
  tags: null,
  projectId: null,
});
const tags = ref([]);
const projects = ref([]);

onMounted(() => {
  getTags().then(res => tags.value = res?.data.map(r => r.name) || []);
  getProjects().then(res => {
    projects.value = res?.data || [];
  });
});

watch(() => props.projectId, () => {
  filterForm.value.projectId = props.projectId || null
});

function search() {
  const filter = filterForm.value;
  const payload = {
    ...filter,
    deadline: filter.deadline && formatDateLocal(filter.deadline),
    tags: filter.tags && filter.tags.join(',')
  }
  emit('search', payload);
}

function clear() {
  filterForm.value = {title: '', projectId: props.projectId || null};
  emit('search', filterForm.value);
}

</script>

<template>
  <v-sheet rounded border color="surface" class="pa-5">
    <v-row dense class="mb-5">
      <h3 class="mr-2">Filters</h3> <v-chip size="small" color="primary" variant="elevated">1 Active</v-chip>
    </v-row>
    <v-row no-gutters class="ga-2">
      <v-col>
        <v-text-field label="Title"
                      name="title"
                      v-model="filterForm.title"
                      variant="outlined"></v-text-field>
      </v-col>
      <v-col>
        <v-select label="Status"
                  clearable
                  :items="TASK_STATUSES"
                  item-title="title"
                  item-value="value"
                  variant="outlined"
                  v-model="filterForm.status"></v-select>
      </v-col>
      <v-col>
        <v-select label="Priority"
                  clearable
                  :items="TASK_PRIORITY"
                  variant="outlined"
                  item-title="title"
                  item-value="value"
                  v-model="filterForm.priority"></v-select>
      </v-col>
      <v-col>
        <v-date-input prepend-icon=""
                      prepend-inner-icon="$calendar"
                      variant="outlined"
                      persistent-placeholder
                      autocomplete="off"
                      v-model="filterForm.deadline"
                      label="Deadline"></v-date-input>
      </v-col>
      <v-col>
        <v-select chips
                  label="Tags"
                  variant="outlined"
                  multiple
                  clearable
                  :items="tags"
                  v-model="filterForm.tags"></v-select>
      </v-col>
    </v-row>
    <v-row no-gutters class="justify-start align-content-start">
      <v-col cols="4">
        <v-select
            label="Select"
            :items="projects"
            item-title="name"
            item-value="id"
            v-model="filterForm.projectId"
            variant="outlined"
            :readonly="projectId"
        ></v-select>
      </v-col>
    </v-row>
    <v-row dense>
      <v-btn prepend-icon="mdi-magnify"
             class="mr-2"
             type="button"
             color="primary"
             @click="search">Search</v-btn>

      <v-btn prepend-icon="mdi-broom"
             type="button"
             variant="tonal"
             @click="clear">Cancel All</v-btn>
    </v-row>
  </v-sheet>
</template>

<style scoped>

</style>
