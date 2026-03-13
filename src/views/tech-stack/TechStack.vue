<script setup>
import {ref} from "vue";
import {createTechStack, getTechStacks} from "@/services/tech-stack-service";
import {useMessage} from "@/composibles/useMessage";

const { showMessage } = useMessage()

const headers = [
  {title: 'ID', key: 'id'},
  {title: 'Name', key: 'name', align: 'start'},
  {title: 'Description', key: 'description', align: 'start'},
  {title: 'Action', key: 'action'}
];
const actions = [
  {name: 'Edit', icon: 'mdi-pencil', color: '', value: 'edit'},
  {name: 'Delete', icon: 'mdi-delete', color: 'red', value: 'delete'}
]

const itemsPerPage = ref(10);
const page = ref(1);
const techStacks = ref([]);
const totalTechStacks = ref(0);
const loading = ref(false);

const dialog = ref(false);
const techStackForm = ref({ name: '', description: '' });

function loadTechStack({ page, itemsPerPage }) {
  loading.value = true;
  getTechStacks({ page, itemsPerPage })
      .then(res => {
        techStacks.value = res.data || [];
        totalTechStacks.value = res.total || 20;
      })
      .catch(err => console.error(err))
      .finally(() => loading.value = false)
}

function create() {
  dialog.value = true;
}

function save() {
  loading.value = true;
  createTechStack(techStackForm.value)
      .then((res) => {
        if (res) {
          showMessage(res.message);
          loadTechStack({ page: page.value, itemsPerPage: itemsPerPage.value});
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        loading.value = false;
        techStackForm.value = { name: '', description: '' }
        dialog.value = false;
      })
}

function handleAction(value, item) {
  console.log(value, item)

}
</script>

<template>
  <div class="ma-3">
    <div class="d-flex justify-space-between align-center">
      <h1>Tech Stack</h1>

      <span>
        <v-dialog v-model="dialog" max-width="600">
          <template v-slot:activator="{props: activatorProps}">
            <v-btn text="Create Tech Stack"
                   prepend-icon="mdi-plus"
                   color="primary"
                   v-bind="activatorProps"
                   @click="create()"></v-btn>
          </template>

          <v-card prepend-icon="mdi-list-box-outline"
                  title="Create Tech Stack">
            <v-card-text>
              <v-row density="comfortable">
                <v-col cols="12">
                  <v-text-field label="Name"
                                variant="underlined"
                                v-model="techStackForm.name"
                                :rules="[v => !!v || 'Name is required']"
                                autocomplete="off"></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-textarea label="Description"
                              autocomplete="off"
                              v-model="techStackForm.description"
                              counter></v-textarea>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn text="Cancel" variant="plain" @click="dialog = false"></v-btn>
              <v-btn text="Save" color="primary" variant="tonal" @click="save()"></v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </span>
    </div>

    <div class="mt-3">
      <v-data-table-server v-model:items-per-page="itemsPerPage"
                           v-model:page="page"
                           :items="techStacks"
                           :items-length="totalTechStacks"
                           :loading="loading"
                           :headers="headers"
                           @update:options="loadTechStack">

        <template v-slot:[`item.action`]="{ item }">
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
            <v-menu activator="parent">
              <v-list>
                <v-list-item v-for="(action, index) of actions"
                             :key="index">
                  <v-btn :prepend-icon="action.icon"
                         class="w-100 justify-start"
                         :color="action.color"
                         @click="handleAction(action.value, item)">
                    {{ action.name }}
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-btn>
        </template>

      </v-data-table-server>
    </div>
  </div>
</template>

<style scoped>

</style>
