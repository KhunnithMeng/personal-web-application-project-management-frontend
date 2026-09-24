<script setup>
import {useDialog} from "@/composibles/useDialog";

const { visible, component, dialogOptions } = useDialog();

</script>

<template>
  <v-dialog v-model="visible"
            v-bind="dialogOptions">
    <component :is="component"></component>
  </v-dialog>
</template>

<style scoped>

</style>