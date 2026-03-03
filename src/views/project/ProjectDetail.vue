<script setup>
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {getTechStacks} from "@/services/tech-stack-service";
import {getCategories} from "@/services/category-service";
import {createProject, getProjectById, updateProjectById} from "@/services/project-service";
import {useLoader} from "@/composibles/useLoader";
import {useMessage} from "@/composibles/useMessage";

const statusList = Object.freeze([
  { name: 'Planning', value: 'planning' },
  { name: 'Active', value: 'active' },
  { name: 'Complete', value: 'complete' },
  { name: 'Waiting', value: 'waiting' }
])

const route = useRoute();
const router = useRouter();
const { openLoader, closeLoader } = useLoader();
const { showMessage } = useMessage();

let projectId = ref(null);
let project = ref({
  name: '',
  description: '',
  status: 'planning',
  startDate: '',
  endDate: '',
  techStackIds: [],
  categoryId: null
});
let categories = ref([]);
let techStacks = ref([]);

function submit() {
  const payload = {
    ...project.value,
    startDate: project.value.startDate && new Date(project.value.startDate).toISOString(),
    endDate: project.value.endDate && new Date(project.value.endDate).toISOString(),
    techStackIds: [...project.value.techStackIds]
  }

  openLoader();
  if (projectId.value) {
    updateProjectById(projectId.value, project.value)
        .then(() => showMessage('Successfully updated'))
        .catch(err => console.error(err))
        .finally(() => {
          closeLoader();
          router.back();
        })
  } else {
    createProject(payload)
        .catch(err => console.log(err))
        .finally(() => {
          closeLoader();
          router.back();
        });
  }
}

onMounted(async () => {
  projectId.value = route.params.id;

  if (projectId.value > 0) {
    bindProjectToForm();
  }

  fetchTechStacks();
  fetchCategories();
})

function bindProjectToForm() {
  openLoader();
  getProjectById(projectId.value).then(res => {
    if (res) {
      project.value = {
        ...res,
        techStackIds: res.techStack?.map(t => t.id) || [],
        categoryId: res.category?.id || null
      }
    }
  }).finally(() => closeLoader())
}

function fetchTechStacks() {
  getTechStacks().then(res => techStacks.value = res || []);
}

function fetchCategories() {
  getCategories().then(res => categories.value = res || []);
}

</script>

<template>
  <div class="ma-5">
    <div class="d-flex justify-space-between align-center mb-3">
      <h1>{{ projectId ? 'Edit Project' : 'Create Project' }}</h1>

      <span>
        <v-btn prepend-icon="mdi-cancel"
               class="mr-2"
               color="grey"
               @click="router.back()">Cancel</v-btn>
        <v-btn prepend-icon="mdi-plus"
               color="primary"
               @click="submit()" >Submit</v-btn>
      </span>
    </div>

    <v-card class="mx-auto pa-5" max-width="1200">
      <span class="d-flex justify-space-between align-center ga-5">
        <v-text-field label="Project Title"
                      v-model="project.name"
                      autocomplete="off"
                      variant="underlined"></v-text-field>
        <v-btn-toggle color="primary"
                      v-model="project.status">
          <v-btn v-for="status of statusList"
                 :key="status.value"
                 :value="status.value">
            {{ status.name }}
          </v-btn>
        </v-btn-toggle>
      </span>

      <span class="d-flex justify-space-between align-center ga-5">
        <v-date-input prepend-icon=""
                      prepend-inner-icon="$calendar"
                      label="Start Date"
                      v-model="project.startDate"
                      persistent-placeholder
                      autocomplete="off"></v-date-input>
        <v-date-input prepend-icon=""
                      prepend-inner-icon="$calendar"
                      label="End Date"
                      v-model="project.endDate"
                      persistent-placeholder
                      autocomplete="off"></v-date-input>
      </span>

      <v-combobox variant="underlined"
                  chips
                  clearable
                  placeholder="Tech Stack"
                  :items="techStacks"
                  item-value="id"
                  item-title="name"
                  v-model="project.techStackIds"
                  :return-object="false"
                  autocomplete="off"
                  multiple></v-combobox>

      <v-autocomplete variant="underlined"
                      placeholder="Category"
                      :items="categories"
                      item-value="id"
                      item-title="name"
                      autocomplete="off"
                      v-model="project.categoryId"
                      clearable></v-autocomplete>

      <v-textarea row="4"
                  placeholder="Description"
                  v-model="project.description"
                  clearable></v-textarea>
    </v-card>
  </div>

</template>

<style scoped>

</style>