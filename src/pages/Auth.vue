<template>
  <main>
    <div class="flex flex-col h-screen w-full justify-center mx-auto align-middle sm:w-1/2 xl:w-1/3">
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
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
