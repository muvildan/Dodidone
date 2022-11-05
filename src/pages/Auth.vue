<template>
  <main class="bg-gray-200">
    <div
      class="flex flex-col gap-4 h-screen w-screen justify-center mx-auto align-middle sm:w-1/2 xl:w-1/3"
    >
      <div
        class="flex flex-col self-center xl:self-end mb-10 xl:mb-5 w-fit sm:min-h-1/2 xl:min-h-1/3 border-teal px-6 border-t-12 rounded-lg shadow-xl bg-white"
      >
        <div
          class="bg-gradient-to-r bg-clip-text from-indigo-500 via-green-600 to-indigo-500 animate-text"
        >
          <h1
            class="font-bold p-3 xl:p-6 text-4xl xl:text-6xl text-transparent"
          >
            Dodidone.
          </h1>
        </div>
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
