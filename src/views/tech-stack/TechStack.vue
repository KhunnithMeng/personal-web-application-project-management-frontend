<script setup>
import {ref} from "vue";
import {createTechStack, deleteTechStack, getTechStacks, updateTechStack} from "@/services/tech-stack-service";
import {useMessage} from "@/composibles/useMessage";
import CrudFormDialog from "@/components/commons/CrudFormDialog.vue";

const { showMessage } = useMessage()

const headers = [
  {title: 'ID', key: 'id'},
  {title: 'Name', key: 'name', align: 'start'},
  {title: 'Description', key: 'description', align: 'start'},
  {title: 'Action', key: 'action'}
];
const actions = [
  {name: 'Edit', icon: 'mdi-pencil', color: '', value: 'edit'},
  {name: 'Delete', icon: 'mdi-delete', color: 'red', value: 'delete'}
]
const fields = [
  { name: 'Name', key: 'name', type: 'text' },
  { name: 'Description', key: 'description', type: 'textarea' }
];

const itemsPerPage = ref(10);
const page = ref(1);
const techStacks = ref([]);
const totalTechStacks = ref(0);
const loading = ref(false);

const dialog = ref(false);
const dialogValue = ref({});

function loadTechStack({ page, itemsPerPage }) {
  loading.value = true;
  getTechStacks({ page, itemsPerPage })
      .then(res => {
        techStacks.value = res.data || [];
        totalTechStacks.value = res.total || 20;
      })
      .catch(err => console.error(err))
      .finally(() => loading.value = false)
}

function create() {
  dialog.value = true;
}

function save(techStack) {
  loading.value = true;
  const apiHandler = techStack.isEdit ?
      updateTechStack(techStack.id, { name: techStack.name, description: techStack.description }) :
      createTechStack(techStack);
  apiHandler
      .then((res) => {
        if (res) {
          showMessage(res.message);
          loadTechStack({ page: page.value, itemsPerPage: itemsPerPage.value});
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        loading.value = false;
        dialog.value = false;
        dialogValue.value = {};
      })
}

function handleAction(value, item) {
  if (value === 'edit') {
    dialogValue.value = { ...item };
    dialog.value = true;
  }

  if (value === 'delete') {
    loading.value = true;
    deleteTechStack(item.id)
        .then((res) => {
          showMessage(res.message);
          loadTechStack({ page: page.value, itemsPerPage: itemsPerPage.value });
        })
        .catch(err => console.log(err))
        .finally(() => loading.value = false)
  }
}
</script>

<template>
  <div class="ma-3">
    <div class="d-flex justify-space-between align-center">
      <h1>Tech Stack</h1>

      <span>
        <v-btn text="Create Tech Stack"
               prepend-icon="mdi-plus"
               color="primary"
               @click="create()"></v-btn>

        <CrudFormDialog title="Tech Stack"
                        v-model="dialog"
                        :fields="fields"
                        :dialog-value="dialogValue"
                        @cancel="dialogValue = {}"
                        @submit="save"></CrudFormDialog>
      </span>
    </div>

    <div class="mt-3">
      <v-data-table-server v-model:items-per-page="itemsPerPage"
                           v-model:page="page"
                           :items="techStacks"
                           :items-length="totalTechStacks"
                           :loading="loading"
                           :headers="headers"
                           @update:options="loadTechStack">

        <template v-slot:[`item.action`]="{ item }">
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
            <v-menu activator="parent">
              <v-list>
                <v-list-item v-for="(action, index) of actions"
                             :key="index">
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

      </v-data-table-server>
    </div>
  </div>
</template>

<style scoped>

</style>
