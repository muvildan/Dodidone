<template>
  <div
    class="mx-10 xl:m-0 sm:min-h-1/2 xl:min-h-1/3 border-teal p-8 border-t-12 rounded-lg shadow-xl bg-white"
  >
    <p class="text-start mb-4 xl:mb-7">
      The place where you'll get things
      <span
        class="inline-block no-line-through transition duration-500 hover:line-through hover:decoration-2"
      >
        done</span
      >.
    </p>
    <div class="mb-4">
      <label class="font-bold text-grey-darker block mb-2">Email</label>
      <input
        type="text"
        class="focus:border-indigo-400 block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
        placeholder="Your email"
        v-model="email"
      />
    </div>
    <div class="mb-4">
      <label class="font-bold text-grey-darker block mb-2">Password</label>
      <input
        type="password"
        class="focus:border-indigo-400 block w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
        placeholder="Your password"
        v-model="password"
      />
    </div>

    <div class="my-2 text-sm leading-5">
      <a
        @click.prevent="userState.handlePasswordReset"
        href="/auth"
        class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
      >
        Forgot your password?
      </a>
    </div>

    <div class="flex flex-col gap-2">
      <a
        @click="userState.handleLogin({ email, password })"
        href="#"
        class="btn-black-outline xl:py-2 xl:w-fit self-center"
      >
        <span>Log in</span>
      </a>
    </div>

    <div class="mt-4">
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm leading-5">
          <span class="px-2 bg-white text-gray-500">New here?</span>
        </div>
      </div>
      <div class="flex flex-col">
        <a @click="handleAuthSwitch" href="#" class="py-2 px-4 text-center">
          <span>Register now for free!</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { userStore } from "../stores/user";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LogIn",
  setup() {
    const userState = userStore();
    const email = ref("");
    const password = ref("");
    const register = ref(false);

    return {
      userState,
      email,
      password,
      register,
    };
  },
  methods: {
    handleAuthSwitch() {
      this.$emit("handleAuthSwitch", true);
    },
  },
});
</script>

<style scoped></style>
