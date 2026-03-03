<script setup>
import {useLoader} from "@/composibles/useLoader";

const { loader } = useLoader();

</script>

<template>
  <v-dialog max-width="300" v-model="loader">
    <v-card class="d-flex align-center justify-center ga-3 py-6">
      <v-progress-circular indeterminate :size="70" color="primary"></v-progress-circular>
      <v-card-title>
        <h5>Loading...</h5>
      </v-card-title>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>