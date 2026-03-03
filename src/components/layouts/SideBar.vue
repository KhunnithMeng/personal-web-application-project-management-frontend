<script setup>
import {defineModel} from "vue";
import {useRouter} from "vue-router";

const drawer = defineModel('drawer', { type: Boolean });
const router = useRouter();

function navigate(value) {
  router.push('/' + value);
}

</script>

<template>
  <v-navigation-drawer v-model="drawer" absolute permanent>
    <v-list>
      <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/10.jpg"
                   title="Vanessa Harris"
                   subtitle="vanessaharris@email.com">

      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list >
      <v-list-item prepend-icon="mdi-lightbulb-on-outline"
                   title="Projects"
                   @click="navigate('project')"
                   value="project">
      </v-list-item>

      <v-list-item prepend-icon="mdi-format-list-bulleted"
                   title="Tasks"
                   @click="navigate('task')"
                   value="task">
        <RouterLink to="/task"></RouterLink>
      </v-list-item>
    </v-list>

    <v-divider> </v-divider>

    <v-list>
      <v-list-item prepend-icon="mdi-database-cog"
                   title="Tech Stack"
                   value="techStack">
      </v-list-item>

      <v-list-item prepend-icon="mdi-shape"
                   title="Category"
                   value="category">
      </v-list-item>

      <v-list-item prepend-icon="mdi-tag-outline"
                   title="Tag"
                   value="tag">
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <pre>{ drawer }</pre>
</template>

<style scoped>

</style>