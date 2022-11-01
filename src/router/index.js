import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../pages/Auth.vue"),
  },
  {
    path: "/",
    name: "Todo",
    component: () => import("../pages/Todo.vue"),
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  },
});

export default router;
