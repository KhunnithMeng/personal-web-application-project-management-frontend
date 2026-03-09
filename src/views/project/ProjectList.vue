<script setup>
import {onMounted, ref} from "vue";
import TruncateText from "@/components/commons/TruncateText.vue";
import {formatDate} from "../../utils/date";
import {deleteProjectId, getProjects} from "@/services/project-service";
import {router} from "@/router";
import ProjectFilter from "@/views/project/ProjectFilter.vue";
import {PROJECT_STATUSES} from "@/constants/projectStatus";

const headers = Object.freeze([
  {title: 'Title', key: 'name'},
  {title: 'Description', key: 'description'},
  {title: 'Status', key: 'status'},
  {title: 'Start Date', key: 'startDate'},
  {title: 'End Date', key: 'endDate'},
  {title: 'Tech Stack', key: 'techStack'},
  {title: 'Category', key: 'category'},
  {title: 'Action', key: 'action'},
]);

const actions = [
  {name: 'Show Tasks', icon: 'mdi-format-list-bulleted', color: '', value: 'task'},
  {name: 'Edit', icon: 'mdi-pencil', color: '', value: 'edit'},
  {name: 'Delete', icon: 'mdi-delete', color: 'red', value: 'delete'}
];

let items = ref([]);
let loading = ref(false);

onMounted( () => {
  fetchProjects();
});

function fetchProjects() {
  loading.value = true;
  getProjects()
      .then(res => items.value = res)
      .catch(err => console.error(err))
      .finally(() => loading.value = false)
}

function handleAction(action, data) {
  if (action === 'edit') {
    router.push('/project/edit/' + data.id);
    return;
  }

  if (action === 'delete') {
    deleteProjectId(data.id)
        .then(() => fetchProjects())
        .catch(err => console.log(err))
  }
}

function search(value) {
  loading.value = true;
  getProjects(value)
      .then((res) => items.value = res)
      .catch((err) => console.log(err))
      .finally(() => loading.value = false)
}

</script>

<template>
  <div class="ma-5">
    <div class="d-flex justify-space-between align-center">
      <h1>Project</h1>

      <v-btn color="primary"
             prepend-icon="mdi-plus-thick"
             @click="router.push('/project/add')">
        Create Project
      </v-btn>
    </div>

    <ProjectFilter @search="search" />

    <div class="mt-3">
      <v-data-table :items="items" :headers="headers" :loading="loading">
        <template v-slot:[`item.description`]="{ value }">
          <TruncateText :text="value"></TruncateText>
        </template>

        <template v-slot:[`item.status`]="{ value }">
          <v-chip variant="flat"
                  :color="PROJECT_STATUSES.find(s => s.value === value)?.color">
            {{ value }}
          </v-chip>
        </template>

        <template v-slot:[`item.startDate`]="{ value }">
          {{ formatDate(value) }}
        </template>


        <template v-slot:[`item.endDate`]="{ value }">
          {{ formatDate(value) }}
        </template>


        <template v-slot:[`item.techStack`]="{ value }">
          <v-chip-group column>
            <v-chip v-for="techStack of value" :key="techStack">
              {{ techStack.name }}
            </v-chip>
          </v-chip-group>
        </template>

        <template v-slot:[`item.category`]="{ value }">
          {{ value.name }}
        </template>

        <template v-slot:[`item.action`]="{ item }">
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
            <v-menu activator="parent">
              <v-list>
                <v-list-item v-for="(action, index) of actions"
                             :key="index" >
                  <v-btn :prepend-icon="action.icon"
                         class="w-100 justify-start"
                         :color="action.color"
                         @click="handleAction(action.value, item)">
                    {{ action.name }}
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<style scoped>

</style>
