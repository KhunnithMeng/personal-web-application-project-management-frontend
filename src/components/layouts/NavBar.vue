<script setup>
import {ref} from "vue";
import { defineEmits } from 'vue';

const emit = defineEmits(['expenseSideBar']);
const drawer = ref(true);

function click() {
  drawer.value = !drawer.value;
  emit('expenseSideBar', drawer.value);

}
</script>

<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="click()"></v-app-bar-nav-icon>

    <v-app-bar-title>Progeny</v-app-bar-title>
  </v-app-bar>
</template>

<style scoped>

</style>