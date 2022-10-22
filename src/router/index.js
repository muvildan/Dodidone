import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../pages/Auth.vue"),
  },
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../pages/Home.vue"),
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  },
});

// router.beforeEach((to, from, next) => {
//   const currentUser = supabase.auth.user();
//   const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

//   if (requiresAuth && !currentUser) next("sign-in");
//   else if (!requiresAuth && currentUser) next("/");
//   else next();
// });

export default router;
