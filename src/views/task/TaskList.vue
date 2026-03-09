<script setup>
import {onMounted, ref} from "vue";
import {deleteTaskById, getTasks} from "@/services/task-service";
import TruncateText from "@/components/commons/TruncateText.vue";
import {formatDate} from "@/utils/date";
import {router} from "@/router";
import {useMessage} from "@/composibles/useMessage";

const headers = Object.freeze([
  { title: 'Title', key: 'title' },
  { title: 'Status', key: 'status' },
  { title: 'Priority', key: 'priority' },
  { title: 'Deadline', key: 'deadline' },
  { title: 'Estimated Hours', key: 'estimatedHours' },
  { title: 'Actual Hours', key: 'actualHours' },
  { title: 'Tags', key: 'tags' },
  { title: 'Description', key: 'description' },
  { title: 'Action', key: 'action' },
]);
const actions = [
  {name: 'Edit', icon: 'mdi-pencil', color: '', value: 'edit'},
  {name: 'Delete', icon: 'mdi-delete', color: 'red', value: 'delete'}
];

const { showMessage } = useMessage();

const loader = ref(false);
const items = ref([]);

onMounted(() => {
  loader.value = true;
  getAllTask();
});

function getAllTask() {
  getTasks()
      .then(res => {
        items.value = res;
      })
      .catch(err => console.error(err))
      .finally(() => loader.value = false)
}

function create() {
  router.push('/task/add');
}

function handleAction(action, data) {
  if (action === 'edit') {
    router.push('/project/'+ data.projectId +'/task/edit/' + data.id);
  }

  if (action === 'delete') {
    handleDeleteTask(data);
  }
}

function handleDeleteTask(data) {
  loader.value = true;
  deleteTaskById(data.projectId, data.id)
      .then(() => {
        showMessage('Task is successfully deleted');
        getAllTask();
      })
      .catch(res => showMessage(res.message, 'error'))
      .finally(() => loader.value = false)
}

</script>

<template>
  <div class="ma-5">
    <div class="d-flex justify-space-between align-center">
      <h1>Task</h1>

      <v-btn color="primary"
             prepend-icon="mdi-plus-thick" @click="create()">
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
