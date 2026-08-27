<script setup>
import {router} from "@/router";
import IconSelect from "@/components/commons/IconSelect.vue";
import {onMounted, ref} from "vue";
import {TASK_STATUSES} from "@/constants/taskStatus";
import {TASK_PRIORITY} from "@/constants/taskPriority";
import {getTags} from "@/services/tag-service";
import {getProjects} from "@/services/project-service";
import {useLoader} from "@/composibles/useLoader";
import {createTask, editTaskById, getTaskById} from "@/services/task-service";
import {useMessage} from "@/composibles/useMessage";
import {useRoute} from "vue-router";

const route = useRoute();
const { loader } = useLoader();
const { showMessage } = useMessage();

const taskId = ref(null);
const projectId = ref(null);
const isAllTask = ref(false);

const tags = ref([]);
const projects = ref([]);
const form = ref(null);
const task = ref({
  title: '',
  description: '',
  status: 'todo',
  priority: 'low',
  estimatedHours: 0,
  actualHours: 0,
  deadline: null,
  tagIds: [],
  projectId: null
});

onMounted(() => {
  getTags().then(res => tags.value = res?.data || []);
  getProjects().then(res => projects.value = res?.data || []);

  isAllTask.value = route.query.isAllTask === 'true';
  projectId.value = +route.params.projectId;
  taskId.value = +route.params.id;
  if (taskId.value && projectId.value) {
    getTaskById(projectId.value, taskId.value).then(res => {
      if (res) {
        task.value = { ...res.data, tagIds: res.data.tags?.map(t => t.id) }
      }
    });
    return;
  }

  if (projectId.value) {
    task.value.projectId = projectId.value;
  }
});

async function submit() {
  const { valid } = await form.value.validate();
  if (!valid) {
    showMessage('Please check the highlighted fields — some information is missing or incorrect.', 'error');
    return;
  }

  if (projectId.value && taskId.value) {
    handleEditTask();
  } else {
    handleCreateTask();
  }
}

function handleEditTask() {
  loader.value = true;
  editTaskById(projectId.value, taskId.value, task.value)
      .then(() => {
        showMessage('Task is successfully edited');
        if (isAllTask.value) {
          router.push('/task');
        } else {
          router.push(`/project/${projectId.value}/task`)
        }
      })
      .catch(res => showMessage(res.message, 'error'))
      .finally(() => loader.value = false);
}

function handleCreateTask() {
  loader.value = true;
  createTask(task.value.projectId, task.value)
      .then(() => {
        showMessage('Task is successfully created');
        if (projectId.value) {
          router.push(`/project/${projectId.value}/task`);
        } else {
          router.push('/task');
        }
      })
      .catch(res => showMessage(res.message, 'error'))
      .finally(() => loader.value = false);
}

</script>

<template>
<div class="ma-5">
  <div class="d-flex justify-space-between align-center mb-3">
    <h1> {{ taskId ? 'Edit Task' : 'Create Task' }} </h1>

    <span>
      <v-btn prepend-icon="mdi-cancel"
             color="grey"
             class="mr-2"
             @click="router.back()">
        Cancel
      </v-btn>
      <v-btn prepend-icon="mdi-plus"
             color="primary"
             @click="submit()">
        Submit
      </v-btn>
    </span>
  </div>

  <v-card class="mx-auto">
    <v-form ref="form">
      <v-container>
        <v-row class="align-start">
          <v-col>
            <v-select label="Project"
                      variant="underlined"
                      required
                      autocomplete="off"
                      item-title="name"
                      item-value="id"
                      v-model="task.projectId"
                      :rules="[v => !!v || 'Project is required']"
                      :items="projects"
                      :readonly="projectId && !isAllTask"></v-select>

            <v-text-field placeholder="Title"
                          variant="underlined"
                          clearable
                          required
                          label="Title"
                          name="title"
                          v-model="task.title"
                          :rules="[v => !!v || 'Title is required']"></v-text-field>

            <v-textarea label="Description (Optional)"
                        clearable
                        rows="7"
                        v-model="task.description"
                        counter></v-textarea>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col>
            <v-row class="align-start">
              <v-col>
                <IconSelect :items="TASK_STATUSES" label="Status" v-model="task.status"></IconSelect>
              </v-col>
              <v-col>
                <IconSelect :items="TASK_PRIORITY" label="Priority" v-model="task.priority"></IconSelect>
              </v-col>
            </v-row>
            <v-row >
              <v-col>
                <v-number-input label="Estimated Hours"
                                variant="underlined"
                                :min="0"
                                :precision="null"
                                v-model="task.estimatedHours"></v-number-input>
              </v-col>
              <v-col>
                <v-number-input label="Actual Hours"
                                variant="underlined"
                                :min="0"
                                :precision="null"
                                v-model="task.actualHours"></v-number-input>
              </v-col>
            </v-row>
            <v-row >
              <v-col>
                <v-date-input prepend-icon=""
                              prepend-inner-icon="$calendar"
                              label="Dateline"
                              v-model="task.deadline"
                              persistent-placeholder
                              variant="underlined"
                              autocomplete="off"></v-date-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-combobox variant="underlined"
                            chips
                            clearable
                            item-value="id"
                            item-title="name"
                            v-model="task.tagIds"
                            autocomplete="off"
                            multiple
                            :return-object="false"
                            :items="tags"
                            placeholder="Tags"></v-combobox>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</div>
</template>

<style scoped>

</style>
