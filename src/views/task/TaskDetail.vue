<script setup>
import {router} from "@/router";
import IconSelect from "@/components/commons/IconSelect.vue";
import {ref} from "vue";
import {TASK_STATUSES} from "@/constants/taskStatus";

const taskForm = ref({
  status: 'todo'
})
function submit() {
  console.log(taskForm.value)
}
</script>

<template>
<div class="ma-5">
  <div class="d-flex justify-space-between align-center mb-3">
    <h1> Create Task </h1>

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
    <v-form>
      <v-container>
        <v-row class="align-start">
          <v-col>
            <v-text-field placeholder="Title"
                          variant="underlined"
                          clearable
                          label="Title"
                          name="title"></v-text-field>

            <v-textarea label="Description (Optional)"
                        clearable
                        counter></v-textarea>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col>
            <v-row class="align-start">
              <v-col>
                <IconSelect :items="TASK_STATUSES" label="Status" v-model="taskForm.status"></IconSelect>
              </v-col>
              <v-col>
                <v-select label="Priority" variant="underlined" :items="['in progress', 'active']"></v-select>
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
