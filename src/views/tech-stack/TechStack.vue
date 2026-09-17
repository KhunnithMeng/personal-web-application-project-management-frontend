<script setup>
import {ref} from "vue";
import {createTechStack, deleteTechStack, getTechStacks, updateTechStack} from "@/services/tech-stack-service";
import {useMessage} from "@/composibles/useMessage";
import CrudFormDialog from "@/components/commons/CrudFormDialog.vue";
import BaseServerTable from "@/components/commons/BaseServerTable.vue";
import {useLoader} from "@/composibles/useLoader";

const { showMessage } = useMessage();
const { openLoader, closeLoader } = useLoader();

const headers = [
  {title: 'No.', key: 'number'},
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
  { name: 'Color', key: 'color', type: 'colorInput' },
  { name: 'Description', key: 'description', type: 'textarea' }
];

const tableRef = ref(null);
const dialog = ref(false);
const dialogValue = ref({});

function loadTechStack(payload) {
  return getTechStacks(payload).catch(err => console.error(err));
}

function create() {
  dialog.value = true;
}

function save(techStack) {
  openLoader();

  const payload = {
    name: techStack.name,
    color: techStack.color,
    description: techStack.description
  }
  const apiHandler = techStack.isEdit ?
      updateTechStack(techStack.id, payload) :
      createTechStack(payload);

  apiHandler
      .then((res) => {
        if (res) {
          showMessage(res.message);
          tableRef.value.reload();
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        closeLoader();
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
    openLoader();
    deleteTechStack(item.id)
        .then((res) => {
          showMessage(res.message);
          tableRef.value.reload();
        })
        .catch(err => console.log(err))
        .finally(() => closeLoader())
  }
}
</script>

<template>
  <div class="mx-5">
    <div class="d-flex justify-space-between align-center">
      <div>
        <h1>Tech Stack</h1>
        <p class="text-grey">18 technologies registered across your projects</p>
      </div>

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

    <v-row class="mt-3">
      <v-col cols="3" >
        <v-text-field variant="outlined"
                      label="Search By Name..."
                      prepend-inner-icon="mdi-magnify"
                      rounded="lg"></v-text-field>
      </v-col>
    </v-row>

    <BaseServerTable ref="tableRef"
                     :fetcher="loadTechStack"
                     :actions="actions"
                     :headers="headers"
                     @handle-action="handleAction">
    </BaseServerTable>
  </div>
</template>

<style scoped>

</style>
