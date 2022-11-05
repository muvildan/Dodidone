<script>
import { userStore } from "../stores/user";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LogOut",
  setup() {
    const userState = userStore();
    return {
      userState,
    };
  },
});
</script>

<template>
  <button
    class="mx-12 mb-5 xl:mb-10 btn-black place-self-end w-1/8"
    @click="userState.handleLogout"
  >
    Logout
  </button>
</template>

<style></style>
