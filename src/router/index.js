import {createRouter, createWebHistory} from "vue-router";
import ProjectList from "@/views/project/ProjectList.vue";
import TaskList from "@/views/task/TaskList.vue";
import ProjectDetail from "@/views/project/ProjectDetail.vue";

const routes = [
    {path: '/', redirect: '/project'},
    {path: '/project',component: ProjectList},
    {path: '/project/add',component: ProjectDetail},
    {path: '/project/edit/:id',component: ProjectDetail},
    {path: '/task', component: TaskList}
];
export const router = createRouter({
    routes,
    history: createWebHistory()
});