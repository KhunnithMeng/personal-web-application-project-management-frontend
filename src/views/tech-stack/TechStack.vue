<script setup>

import {ref} from "vue";
import {getTechStacks} from "@/services/tech-stack-service";

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Name', key: 'name', align: 'start' },
  { title: 'Description', key: 'description', align: 'start' }
];
const itemsPerPage = 5;
const techStacks = ref([]);
const totalTechStacks = ref(0);
const loading = ref(false);

function loadTechStack({ page, itemsPerPage }) {
  loading.value = true;
  getTechStacks({page, itemsPerPage})
      .then(res => {
        techStacks.value = res.data || [];
        totalTechStacks.value = res.total || 20;
      })
      .catch(err => console.error(err))
      .finally(() => loading.value = false)
}
</script>

<template>
  <div class="ma-3">
    <div class="d-flex justify-space-between align-center">
      <h1>Tech Stack</h1>

      <span>
      <v-btn color="primary"
             prepend-icon="mdi-plus">
        Create Tech Stack
      </v-btn>
    </span>
    </div>

    <div class="mt-3">
      <v-data-table-server v-model:items-per-page="itemsPerPage"
                           :items="techStacks"
                           :items-length="totalTechStacks"
                           :loading="loading"
                           :headers="headers" @update:options="loadTechStack">

      </v-data-table-server>
    </div>
  </div>
</template>

<style scoped>

</style>
