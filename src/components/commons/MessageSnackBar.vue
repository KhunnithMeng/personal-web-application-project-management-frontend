<script setup>
import {useMessage} from "@/composibles/useMessage";

const { message, closeMessage } = useMessage();

</script>

<template>
  <v-snackbar v-model="message.isShow"
              :color="message.color"
              location="top">
    {{ message.text }}
    <template v-slot:actions>
      <v-btn variant="text"
             @click="closeMessage()">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped>
</style>