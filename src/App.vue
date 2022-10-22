<template>
  <section>
    <router-view class="app-main" />
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useUserStore } from "./stores/user.js";

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(async () => {
  try {
    await userStore.fetchUser();
    if (!user.session) {
      console.log("No estás loggeado");
      router.push({ path: "/auth" });
    } else {
      console.log("Estás loggeado");
      router.push({ path: "/" });
    }
  } catch (e) {
    console.log(e);
  }
});
</script>
