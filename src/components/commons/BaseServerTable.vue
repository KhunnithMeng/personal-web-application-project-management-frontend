<script setup>

import {reactive, defineProps, defineEmits, defineExpose, ref} from "vue";

defineExpose({
  reload: fetchData
});
const props = defineProps({
  headers: {
    type: Array,
    required: true
  },
  actions: {
    type: Array,
    required: true
  },
  fetcher: {
    type: Function,
    required: true
  }
});
const emits = defineEmits(['handleAction']);

const items = ref([]);
const pagination = reactive({
  page: 1,
  itemPerPage: 10
});
const total = ref(0);
const loading = ref(false);

const rowNumber = (index) => {
  return (pagination.page - 1) * pagination.itemPerPage + index + 1;
}

async function fetchData() {
  loading.value = true;

  const response = await props.fetcher(pagination);

  items.value = response.data || [];
  total.value = response.total || 20;

  loading.value = false;
}

function handleAction(action, item) {
  emits('handleAction', action, item);
}

</script>

<template>
  <v-data-table-server v-model:items-per-page="pagination.itemPerPage"
                       v-model:page="pagination.page"
                       :items="items"
                       :items-length="total"
                       :loading="loading"
                       :headers="props.headers"
                       @update:options="fetchData">
    <template v-slot:[`item.number`]="{ internalItem }">
      {{ rowNumber(internalItem.index) }}
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
        <v-menu activator="parent">
          <v-list>
            <v-list-item v-for="(action, index) of props.actions" :key="index">
              <v-btn :prepend-icon="action.icon"
                     :color="action.color"
                     class="w-100 justify-start"
                     @click="handleAction(action.value, item)"> {{ action.name }}</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </template>
  </v-data-table-server>
</template>

<style scoped>

</style>
