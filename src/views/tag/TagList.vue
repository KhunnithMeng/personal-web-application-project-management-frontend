<script setup>
import BaseServerTable from "@/components/commons/BaseServerTable.vue";
import {ref} from "vue";
import {tagService} from "@/services/tag-service";
import CrudFormDialog from "@/components/commons/CrudFormDialog.vue";
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
];
const fields = [
  {name: 'Name', key: 'name', type: 'text'},
  {name: 'Color', key: 'color', type: 'colorInput'},
  {name: 'Description', key: 'description', type: 'textarea'},
];

const tagRef = ref();
const totalTags = ref(0);
const isOpenDialog = ref(false);
const dialogValue = ref({});

function fetchTag(payload) {
  return tagService.getTags(payload)
      .then(item => {
        totalTags.value = item.total;
        return item;
      })
      .catch(err => console.log(err));
}

function save({ isEdit, ...payload }) {
  openLoader();
  const apiHandler = isEdit ?
      tagService.updateTagById(payload.id, { ...payload }) :
      tagService.createTag(payload);
  apiHandler.finally(() => {
    tagRef.value.reload();
    closeLoader();
  });

  const message = isEdit ?
      'Tag has been updated successfully' : 'Category has been created successfully.';
  showMessage(message);
}

function handleAction(action, item) {
  if (action === 'edit') {
    dialogValue.value = item;
    isOpenDialog.value = true;
  } else {
    openLoader();
    tagService.deleteTagById(item.id)
        .then(res => {
          tagRef.value.reload();
          showMessage('Tag is successfully deleted');
        })
        .finally(() => {
          closeLoader()
        })
  }
}

</script>

<template>
  <div class="mx-5">
    <div class="d-flex justify-space-between align-center mb-5">
      <div>
        <h1>Tag</h1>
        <p class="text-grey">{{ totalTags }} tags registered across your projects</p>
      </div>

      <v-btn prepend-icon="mdi-plus"
             color="primary"
             rounded="lg"
             @click="isOpenDialog = true">
        Create Tag
      </v-btn>

      <CrudFormDialog v-model="isOpenDialog"
                      title="Tag"
                      :fields="fields"
                      :dialog-value="dialogValue"
                      @submit="save"></CrudFormDialog>
    </div>

    <v-row>
      <v-col cols="3">
        <v-text-field variant="outlined"
                      rounded="lg"
                      label="Tag Search"
                      placeholder="Search by name..."
                      density="comfortable"
                      autocomplete="off"
                      prepend-inner-icon="mdi-magnify"></v-text-field>
      </v-col>
    </v-row>

    <BaseServerTable ref="tagRef"
                     :fetcher="fetchTag"
                     :actions="actions"
                     :headers="headers"
                     @handle-action="handleAction"/>
  </div>
</template>

<style scoped>

</style>