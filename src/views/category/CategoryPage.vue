<script setup>
import CrudFormDialog from "@/components/commons/CrudFormDialog.vue";
import {ref} from "vue";
import BaseServerTable from "@/components/commons/BaseServerTable.vue";
import {
  deleteCategoryById,
  getCategories,
  saveCategory,
  updateCategoryById
} from "@/services/category-service";
import {useLoader} from "@/composibles/useLoader";
import {useMessage} from "@/composibles/useMessage";

const { openLoader, closeLoader } = useLoader();
const { showMessage } = useMessage();

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
  { name: 'Description', key: 'description', type: 'textarea' },
];

const isOpenDialog = ref(false);
const dialogValue = ref({});
const tableRef = ref();
const totalCategories = ref(0);

function openDialog() {
  isOpenDialog.value = true;
}

function save({ isEdit, ...item }) {
  openLoader();
  let apiHandler = isEdit ?
      updateCategoryById(item.id, { ...item }) :
      saveCategory(item);
  apiHandler.finally(() => {
    tableRef.value.reload();
    closeLoader();

    const message = isEdit ?
        'Category has been updated successfully' : 'Category has been created successfully.'
    showMessage(message)
  });
}

function fetchCategory(payload) {
  return getCategories(payload)
      .then(item => {
        totalCategories.value = item.total;
        return item;
      })
      .catch(err => console.error(err));
}

function handleAction(action, item) {
  if (action === 'edit') {
    dialogValue.value = {...item}
    isOpenDialog.value = true;
    return;
  }

  if (action === 'delete') {
    openLoader();
    deleteCategoryById(item.id)
        .catch(error => console.error(error))
        .finally(() => {
          tableRef.value.reload();
          closeLoader();
          showMessage('Category has been deleted successfully.')
        });
  }
}
</script>

<template>
<div class="mx-5">
  <div class="d-flex justify-space-between align-center">
    <div>
      <h1>Category</h1>
      <p class="text-grey">{{ totalCategories }} categories registered across your projects</p>
    </div>

    <v-btn color="primary"
           rounded="lg"
           prepend-icon="mdi-plus"
           @click="openDialog()">
      Create Category
    </v-btn>

    <CrudFormDialog v-model="isOpenDialog"
                    title="Category"
                    :fields="fields"
                    :dialog-value="dialogValue"
                    @submit="save"></CrudFormDialog>
  </div>

  <v-row class="mt-3">
    <v-col cols="3">
      <v-text-field variant="outlined"
                    prepend-inner-icon="mdi-magnify"
                    rounded="lg"
                    label="Search by name..."
                    autocomplete="off"></v-text-field>
    </v-col>
  </v-row>

  <BaseServerTable ref="tableRef"
                   :fetcher="fetchCategory"
                   :actions="actions"
                   :headers="headers"
                   @handleAction="handleAction" />
</div>
</template>

<style scoped>

</style>