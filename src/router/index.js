import {createRouter, createWebHistory} from "vue-router";
import ProjectList from "@/views/project/ProjectList.vue";
import TaskList from "@/views/task/TaskList.vue";
import TaskDetail from "@/views/task/TaskDetail.vue";
import TechStack from "@/views/tech-stack/TechStack.vue";
import Category from "@/views/category/CategoryPage.vue";
import TagList from "@/views/tag/TagList.vue";

const routes = [
    {path: '/', redirect: '/project'},

    {path: '/project',component: ProjectList},

    {path: '/task', component: TaskList},
    {path: '/task/add', component: TaskDetail},
    {path: '/project/:projectId/task', component: TaskList},
    {path: '/project/:projectId/task/add', component: TaskDetail},
    {path: '/project/:projectId/task/edit/:id', component: TaskDetail},

    {path: '/tech-stack', component: TechStack},
    {path: '/category', component: Category},
    {path: '/tag', component: TagList}
];
export const router = createRouter({
    routes,
    history: createWebHistory()
});
