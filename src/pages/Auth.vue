<template>
  <main class="bg-gray-200">
    <div
      class="flex flex-col gap-4 h-screen w-full justify-center mx-auto align-middle sm:w-1/2 xl:w-1/3"
    >
      <div
        class="flex flex-col self-end bg-gradient-to-r bg-clip-text from-indigo-400 via-green-600 to-indigo-400 animate-text"
      >
        <h1 class="font-bold text-6xl text-transparent">Dodidone.</h1>
      </div>
      <Transition name="fade" mode="out-in">
        <div v-if="!register">
          <LogIn @handleAuthSwitch="handleAuthSwitch($event)" />
        </div>
        <div v-else>
          <SignUp @handleAuthSwitch="handleAuthSwitch($event)" />
        </div>
      </Transition>
    </div>
  </main>
</template>

<script>
import LogIn from "../components/LogIn.vue";
import SignUp from "../components/SignUp.vue";

export default {
  name: "Auth",
  components: {
    LogIn,
    SignUp,
  },
  data() {
    return {
      register: false,
    };
  },
  methods: {
    handleAuthSwitch(register) {
      this.register = register;
    },
  },
};
</script>

<style>
.container {
  position: relative;
  padding: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
