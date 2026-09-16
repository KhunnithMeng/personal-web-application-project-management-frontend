<script setup>
import {computed, onMounted, ref} from "vue";
import TruncateText from "@/components/commons/TruncateText.vue";
import {deleteProjectId, getProjects} from "@/services/project-service";
import {router} from "@/router";
import ProjectFilter from "@/views/project/components/ProjectFilter.vue";
import {PROJECT_STATUSES} from "@/constants/projectStatus";
import ProjectDateDisplay from "@/views/project/components/ProjectDateDisplay.vue";
import ProjectGridView from "@/views/project/components/ProjectGridView.vue";
import {PROJECT_ACTION} from "@/constants/projectAction";

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

const totalProjectAmount = computed(() => {
  return items.value.length
});
const totalActiveProjectAmount = computed(() => {
  return items.value.filter(item => item.status === 'active').length;
});

let items = ref([]);
let loading = ref(false);
let isTableView = ref(true);

onMounted( () => {
  fetchProjects();
});


function fetchProjects() {
  loading.value = true;
  getProjects()
      .then(res => items.value = res?.data || [])
      .catch(err => console.error(err))
      .finally(() => loading.value = false)
}

function handleAction(action, data) {
  if (action === 'task') {
    router.push(`/project/${data.id}/task`);
    return;
  }

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
      .then((res) => items.value = res?.data || [])
      .catch((err) => console.log(err))
      .finally(() => loading.value = false)
}

function getRowProps({ item }) {
  return {
    class: `row-accent row-accent--${item.status}`
  }
}

</script>

<template>
  <div class="mx-5">
    <div class="d-flex justify-space-between align-center mb-5">
      <div>
        <h1>Project</h1>
        <p>{{ totalProjectAmount }} projects · {{ totalActiveProjectAmount }} active · updated moments ago</p>
      </div>

      <div class="d-flex ga-2 align-center">
        <v-btn-toggle divided
                      border
                      density="comfortable"
                      v-model="isTableView"
                      rounded="xl">
          <v-btn :value="true">
            <v-icon start>mdi-menu</v-icon>
            <span>Table</span>
          </v-btn>
          <v-btn :value="false">
            <v-icon start>mdi-grid-large</v-icon>
            <span>Card</span>
          </v-btn>
        </v-btn-toggle>
        <v-btn color="primary"
               prepend-icon="mdi-plus-thick"
               @click="router.push('/project/add')">
          Create Project
        </v-btn>
      </div>
    </div>

    <ProjectFilter @search="search" :filter-result-amount="totalProjectAmount"/>

    <div class="mt-5">
      <v-data-table v-if="isTableView"
                    :items="items"
                    :headers="headers"
                    :loading="loading"
                    :row-props="getRowProps">
        <template v-slot:[`item.description`]="{ value }">
          <TruncateText :text="value"></TruncateText>
        </template>

        <template v-slot:[`item.status`]="{ value }">
          <v-chip variant="tonal"
                  :color="PROJECT_STATUSES.find(s => s.value === value)?.color">
            {{ PROJECT_STATUSES.find(s => s.value === value)?.name }}
          </v-chip>
        </template>

        <template v-slot:[`item.startDate`]="{ value }">
          <ProjectDateDisplay :date="value"></ProjectDateDisplay>
        </template>


        <template v-slot:[`item.endDate`]="{ value }">
          <ProjectDateDisplay :date="value"></ProjectDateDisplay>
        </template>


        <template v-slot:[`item.techStack`]="{ value }">
            <v-chip v-for="techStack of value"
                    class="ma-1"
                    :key="techStack.id">
              {{ techStack.name }}
            </v-chip>
        </template>

        <template v-slot:[`item.category`]="{ value }">
          {{ value.name }}
        </template>

        <template v-slot:[`item.action`]="{ item }">
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
            <v-menu activator="parent">
              <v-list>
                <v-list-item v-for="(action, index) of PROJECT_ACTION"
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
      <template v-else>
        <ProjectGridView :projects="items" @handle-action="handleAction"></ProjectGridView>
      </template>
    </div>
  </div>
</template>

<style scoped>

:deep(.row-accent)  {
  box-shadow: inset 3px 0 0 var(--row-accent-color);
}

:deep(.row-accent--planning) { --row-accent-color: #FDD835; }
:deep(.row-accent--active) { --row-accent-color: #039BE5; }
:deep(.row-accent--complete) { --row-accent-color: #66BB6A; }
:deep(.row-accent--waiting) { --row-accent-color: #FB8C00; }

</style>
