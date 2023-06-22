import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ListPage from "@/views/TasksPage.vue";
import MainPage from "@/views/MainPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    name: "List",
    component: ListPage,
    path: "/tasks",
  },
  {
    name: "Main",
    component: MainPage,
    path: "/main",
  },
  { path: "/:pathMatch(.*)", redirect: "/main" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
