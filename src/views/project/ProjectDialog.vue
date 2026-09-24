<script setup>

import {useDialog} from "@/composibles/useDialog";
import {PROJECT_STATUSES} from "@/constants/projectStatus";
import {onMounted, ref} from "vue";
import {getTechStacks} from "@/services/tech-stack-service";
import {getCategories} from "@/services/category-service";
import {projectService} from "@/services/project-service";
import {useMessage} from "@/composibles/useMessage";

const dialog = useDialog();
const message = useMessage();

const form = ref(null);
let project = ref({
  name: '',
  description: '',
  status: 'planning',
  startDate: '',
  endDate: '',
  techStackIds: [],
  categoryId: null
});
const projectId = ref(null);
const techStacks = ref([]);
const categories = ref([]);
const loading = ref(false);
const cardLoading = ref(false);

onMounted(() => {
  fetchTechStacks();
  fetchCategories();

  const { props } = dialog.dialogOptions.value;
  projectId.value = props?.projectId;

  if (projectId.value) {
    fetchProjectById(projectId.value);
  }
})

function fetchProjectById(id) {
  cardLoading.value = true;
  projectService.getProjectById(id).then(res => {
    if (res) {
      project.value = {
        ...res.data,
        categoryId: res.data.category?.id || null,
        techStackIds: res.data.techStack?.map(t => t.id) || []
      }
    }
  }).finally(() => cardLoading.value = false)
}

function fetchTechStacks() {
  getTechStacks({ itemsPerPage: 0 }).then(res => techStacks.value = res?.data || []);
}

function fetchCategories() {
  getCategories({ itemsPerPage: 0 }).then(res => categories.value = res?.data || []);
}

async function submit() {
  const { valid } = await form.value.validate();

  if (!valid) {
    message.showMessage(
        'Please check the highlighted fields — some information is missing or incorrect.', 'error')
    return;
  }

  if (projectId.value) {
    loading.value = true;
    projectService.updateProjectById(projectId.value, project.value)
        .then(() => {
          message.showMessage('Project is updated successfully');
          dialog.close(true);
        })
        .finally(() => loading.value = false);

    return;
  }

  loading.value = true;
  projectService.createProject(project.value)
      .then(() => {
        message.showMessage('Project is saved successfully');
        dialog.close(true);
      })
      .finally(() => loading.value = false)
}

</script>

<template>
  <v-card :loading="cardLoading">
    <v-card-item>
      <v-card-title>
        {{ projectId ? 'Update' : 'Create' }} Project
      </v-card-title>
      <v-card-subtitle>
        Fill in the details below to {{ projectId ? 'update a existing project' : 'add a new project' }}.
      </v-card-subtitle>

      <template #append>
        <v-btn icon="mdi-close"
               @click="dialog.close()"></v-btn>
      </template>
    </v-card-item>

    <v-divider></v-divider>

    <v-card-text>
      <v-form ref="form">
        <v-row density="comfortable">
          <v-col cols="12" md="6">
            <v-text-field variant="outlined"
                          density="comfortable"
                          label="Project Title"
                          rounded="lg"
                          placeholder="e.g. Nexus E-commerce Platform"
                          v-model="project.name"
                          :rules="[v => !!v || 'Project Title is required']"></v-text-field>
          </v-col>
          <v-col cols=12 md="6">
            <v-autocomplete variant="outlined"
                            density="comfortable"
                            rounded="lg"
                            label="Category"
                            placeholder="Select a category..."
                            item-value="id"
                            item-title="name"
                            autocomplete="off"
                            clearable
                            required
                            v-model="project.categoryId"
                            :items="categories"
                            :rules="[v => !!v || 'Category is required']"></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-label>Status</v-label>
            <v-chip-group mandatory
                          column
                          selected-class="text-white"
                          v-model="project.status">
              <v-chip v-for="status of PROJECT_STATUSES"
                      filter
                      :color="status.color"
                      :key="status.value"
                      :value="status.value">
                {{ status.name }}
              </v-chip>
            </v-chip-group>
          </v-col>
          <v-col cols="12" md="6">
            <v-combobox variant="outlined"
                        rounded="lg"
                        density="comfortable"
                        chips
                        clearable
                        label="Tech Stack"
                        item-value="id"
                        item-title="name"
                        autocomplete="off"
                        required
                        multiple
                        :rules="[v => (!!v && v.length > 0) || 'Tech stack is required at least one']"
                        :return-object="false"
                        :items="techStacks"
                        v-model="project.techStackIds"></v-combobox>
          </v-col>
          <v-col cols="12" md="6" >
            <v-date-input prepend-icon=""
                          prepend-inner-icon="$calendar"
                          label="Start Date"
                          v-model="project.startDate"
                          persistent-placeholder
                          autocomplete="off"
                          variant="outlined"
                          density="comfortable"
                          rounded="lg"
                          required
                          :rules="[v => !!v || 'Start date is required']"></v-date-input>
          </v-col>
          <v-col cols="12" md="6">
            <v-date-input prepend-icon=""
                          prepend-inner-icon="$calendar"
                          label="End Date"
                          v-model="project.endDate"
                          persistent-placeholder
                          variant="outlined"
                          density="comfortable"
                          rounded="lg"
                          autocomplete="off"></v-date-input>
          </v-col>
          <v-col cols="12">
            <v-textarea row="4"
                        variant="outlined"
                        rounded="lg"
                        density="comfortable"
                        placeholder="Description"
                        v-model="project.description"></v-textarea>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
          text="Close"
          variant="plain"
          @click="dialog.close()"
      ></v-btn>

      <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          rounded="lg"
          variant="flat"
          :loading="loading"
          @click="submit()"
      >
        {{ projectId ? 'Update Project' : 'Create Project' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>