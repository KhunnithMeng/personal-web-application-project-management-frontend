<template>
  <v-app id="inspire">

    <!--This is where all the side bar content reside-->
    <SideBar :drawer="drawer" />

    <!--This is where all the navigation bar content reside-->
    <NavBar @expenseSideBar="expenseSideBar" />

    <v-main>
      <LoaderDialog/>
      <MessageSnackBar/>
      <RouterView/>
    </v-main>
  </v-app>
</template>

<script setup>
import NavBar from "@/components/layouts/NavBar.vue";
import SideBar from "@/components/layouts/SideBar.vue";
import {ref} from "vue";
import LoaderDialog from "@/components/commons/LoaderDialog.vue";
import MessageSnackBar from "@/components/commons/MessageSnackBar.vue";

const drawer = ref(null);

function expenseSideBar(value) {
  drawer.value = value;
}

</script>