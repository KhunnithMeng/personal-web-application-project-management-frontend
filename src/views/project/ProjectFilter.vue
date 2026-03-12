<script setup>

import {ref, defineEmits, onMounted} from "vue";
import {getCategories} from "@/services/category-service";
import {getTechStacks} from "@/services/tech-stack-service";

const searchEmit = defineEmits(['search']);

const statusList = Object.freeze([
  { name: 'Planning', value: 'planning' },
  { name: 'Active', value: 'active' },
  { name: 'Complete', value: 'complete' },
  { name: 'Waiting', value: 'waiting' }
]);
const categories = ref([]);
const techStacks = ref([]);
const filter = ref({
  name: '',
  status: null,
  startDate: null,
  endDate: null,
  category: null,
  techStack: null
});

onMounted(() => {
  getCategories().then(res => categories.value = res?.data.map(r => r.name));
  getTechStacks().then(res => techStacks.value = res?.data.map(r => r.name));
});

function search() {
  searchEmit('search', filter.value);
}

function clear() {
  filter.value = {name: ''}
  searchEmit('search', filter.value)
}

</script>

<template>
<div>
  <div class="d-flex flex-row flex-wrap ga-5">
    <v-text-field label="Name"
                  autocomplete="off"
                  v-model="filter.name"
                  variant="underlined"></v-text-field>

    <v-select label="Status"
              :items="statusList"
              item-title="name"
              item-value="value"
              variant="underlined"
              v-model="filter.status"></v-select>

    <v-date-input prepend-icon=""
                  prepend-inner-icon="$calendar"
                  label="Start Date"
                  v-model="filter.startDate"
                  persistent-placeholder
                  variant="underlined"
                  autocomplete="off"></v-date-input>

    <v-date-input prepend-icon=""
                  prepend-inner-icon="$calendar"
                  label="End Date"
                  v-model="filter.endDate"
                  persistent-placeholder
                  variant="underlined"
                  autocomplete="off"></v-date-input>

    <v-autocomplete variant="underlined"
                    placeholder="Category"
                    :items="categories"
                    autocomplete="off"
                    v-model="filter.category"
                    clearable></v-autocomplete>

    <v-select label="Tech Stack"
              :items="techStacks"
              variant="underlined"
              v-model="filter.techStack"></v-select>
  </div>

  <div class="d-flex justify-end">
    <v-btn prepend-icon="mdi-magnify"
           color="primary"
           class="mr-2" @click="search()">Search</v-btn>
    <v-btn prepend-icon="mdi-broom"
           color="secondary"
           @click="clear()">Clear</v-btn>
  </div>
</div>
</template>
