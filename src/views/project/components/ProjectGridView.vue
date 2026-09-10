<script setup>
import ProjectCard from "@/views/project/components/ProjectCard.vue";
import { defineProps, defineEmits } from 'vue';

const emits = defineEmits(['handleAction']);
const props = defineProps({
  projects: {
    type: Array,
    required: true
  }
});

function handleAction(action, project) {
  emits('handleAction', action, project);
}

</script>

<template>
  <v-row>
    <v-col v-for="project in projects" :key="project.id"
           cols="12"
           sm="6"
           md="4"
           class="d-flex">
      <ProjectCard class="flex-grow-1"
                   :category="project.category.name"
                   :status="project.status"
                   :title="project.name"
                   :description="project.description"
                   :start-date="project.startDate"
                   :end-date="project.endDate"
                   :tech-stacks="project.techStacks"
                   @handle-action="handleAction($event, project)"
      ></ProjectCard>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>