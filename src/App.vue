<template>
  <section>
    <router-view class="app-main" />
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { userStore } from "./stores/user";

const router = useRouter();
const storage = userStore();
const { user } = storeToRefs(storage);

onMounted(async () => {
  try {
    await storage.fetchUser();
    if (!user.value) {
      router.push({ path: "/auth" });
    } else {
      router.push({ path: "/" });
    }
  } catch (e) {
    console.log(e);
  }
});
</script>

<style>
html,
body {
  height: 100%;
}
body {
  margin: 0;
}
</style>
