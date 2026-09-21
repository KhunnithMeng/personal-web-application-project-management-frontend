<script setup>

import {ref, defineEmits, onMounted, defineProps} from "vue";
import {getCategories} from "@/services/category-service";
import {getTechStacks} from "@/services/tech-stack-service";

const searchEmit = defineEmits(['search']);
const props = defineProps(['filterResultAmount'])

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
<v-sheet border rounded color="surface" class="pa-5">
  <v-row no-gutters>
    <v-row dense class="mb-5">
      <h3 class="mr-2">Filters</h3>
      <v-chip size="small" color="primary" variant="elevated">{{ filterResultAmount }} Active</v-chip>
    </v-row>
  </v-row>
  <v-row no-gutters class="ga-5">
    <v-col>
      <v-text-field label="Name"
                    autocomplete="off"
                    v-model="filter.name"
                    density="compact"
                    rounded="lg"
                    variant="outlined"></v-text-field>
    </v-col>

    <v-col>
      <v-select label="Status"
                :items="statusList"
                density="compact"
                rounded="lg"
                item-title="name"
                item-value="value"
                variant="outlined"
                v-model="filter.status"></v-select>
    </v-col>

    <v-col>
      <v-date-input prepend-icon=""
                    prepend-inner-icon="$calendar"
                    density="compact"
                    rounded="lg"
                    label="Start Date"
                    v-model="filter.startDate"
                    persistent-placeholder
                    variant="outlined"
                    autocomplete="off"></v-date-input>
    </v-col>

    <v-col>
      <v-date-input prepend-icon=""
                    prepend-inner-icon="$calendar"
                    density="compact"
                    rounded="log"
                    label="End Date"
                    v-model="filter.endDate"
                    persistent-placeholder
                    variant="outlined"
                    autocomplete="off"></v-date-input>
    </v-col>

    <v-col>
      <v-autocomplete variant="outlined"
                      placeholder="Category"
                      density="compact"
                      rounded="lg"
                      :items="categories"
                      autocomplete="off"
                      v-model="filter.category"
                      clearable></v-autocomplete>
    </v-col>

    <v-col>
      <v-select label="Tech Stack"
                :items="techStacks"
                density="compact"
                rounded="lg"
                variant="outlined"
                v-model="filter.techStack"></v-select>
    </v-col>

  </v-row>

  <v-row dense class="d-flex justify-start">
    <v-btn prepend-icon="mdi-magnify"
           color="primary"
           class="mr-2" @click="search()">Search</v-btn>
    <v-btn prepend-icon="mdi-broom"
           color="secondary"
           @click="clear()">Clear</v-btn>
  </v-row>
</v-sheet>
</template>
