<script setup>

</script>

<template>
<div>
  <div class="d-flex flex-row flex-wrap ga-5">
    <v-text-field label="Name"
                  autocomplete="off"
                  variant="underlined"></v-text-field>

    <v-text-field label="Status"
                  autocomplete="off"
                  variant="underlined"></v-text-field>
  </div>

  <div class="d-flex justify-end">
    <v-btn prepend-icon="mdi-magnify" color="primary" class="mr-2">Search</v-btn>
    <v-btn prepend-icon="mdi-broom" color="secondary">Clear</v-btn>
  </div>
</div>
</template>

<style scoped>

</style>