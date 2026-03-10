<script setup>

import {onMounted, ref, defineEmits} from "vue";
import {TASK_STATUSES} from "@/constants/taskStatus";
import {TASK_PRIORITY} from "@/constants/taskPriority";
import {getTags} from "@/services/tag-service";
import {formatDateLocal} from "@/utils/date";

const emit = defineEmits(['search'])

const filterForm = ref({
  title: '',
  status: null,
  priority: null,
  deadline: null,
  tags: null
});
const tags = ref([]);

onMounted(() => {
  getTags().then(res => tags.value = res?.map(r => r.name) || [])
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
  filterForm.value = {title: ''};
  emit('search', filterForm.value);
}

</script>

<template>
<v-row>
  <v-col>
    <v-text-field label="Title"
                  name="title"
                  v-model="filterForm.title"
                  variant="underlined"></v-text-field>
  </v-col>
  <v-col>
    <v-select label="Status"
              clearable
              :items="TASK_STATUSES"
              item-title="title"
              item-value="value"
              variant="underlined"
              v-model="filterForm.status"></v-select>
  </v-col>
  <v-col>
    <v-select label="Priority"
              clearable
              :items="TASK_PRIORITY"
              variant="underlined"
              item-title="title"
              item-value="value"
              v-model="filterForm.priority"></v-select>
  </v-col>
  <v-col>
    <v-date-input prepend-icon=""
                  prepend-inner-icon="$calendar"
                  variant="underlined"
                  persistent-placeholder
                  autocomplete="off"
                  v-model="filterForm.deadline"
                  label="Deadline"></v-date-input>
  </v-col>
  <v-col>
    <v-select chips
              label="Tags"
              variant="underlined"
              multiple
              clearable
              :items="tags"
              v-model="filterForm.tags"></v-select>
  </v-col>
</v-row>
<v-row class="justify-end">
  <v-col class="d-flex justify-end" cols="4">
    <v-btn prepend-icon="mdi-magnify"
           class="mr-2"
           type="button"
           color="primary"
           @click="search">Search</v-btn>

    <v-btn prepend-icon="mdi-broom"
           type="button"
           color="secondary"
           @click="clear">Cancel</v-btn>
  </v-col>
</v-row>
</template>

<style scoped>

</style>
