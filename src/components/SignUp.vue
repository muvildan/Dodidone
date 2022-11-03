<template>
  <div
    class="sm:min-h-1/2 xl:min-h-1/3 border-teal p-8 border-t-12 rounded-lg shadow-xl bg-white"
  >
    <div class="mb-4">
      <div>
        <label class="font-bold text-grey-darker block mb-2">Username</label>
        <input
          type="text"
          class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
          placeholder="CoolKangaroo"
          v-model="userName"
        />
      </div>
    </div>
    <div class="mb-4">
      <label class="font-bold text-grey-darker block mb-2"> Email</label>
      <input
        type="text"
        class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
        placeholder="coolkangaroo@example.com"
        v-model="email"
      />
    </div>
    <div class="mb-4">
      <label class="font-bold text-grey-darker block mb-2">Password</label>
      <input
        type="password"
        placeholder="Password"
        class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow placeholder:pl-0"
        v-model="password"
      />
    </div>

    <div class="flex flex-col gap-2">
      <a
        @click="
          auth.handleSignup({ email, password }, { userName, userSurname })
        "
        href="#"
        class="btn-black-outline"
        tabindex="0"
      >
        Sign up
      </a>
    </div>
    <div class="mt-4">
      <div class="relative">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm leading-5">
          <span class="px-2 bg-white text-gray-500">Already a dodidoner?</span>
        </div>
      </div>
      <div class="flex flex-col">
        <a @click="handleAuthSwitch" href="#" class="py-2 px-4 text-center">
          <span>Back to log in</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { userStore } from "../stores/user";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "SignUp",

  setup() {
    const auth = userStore();
    const userName = ref("");
    const email = ref("");
    const password = ref("");
    const register = ref(true);

    return {
      userName,
      email,
      password,
      register,
      auth,
    };
  },
  methods: {
    handleAuthSwitch() {
      this.$emit("handleAuthSwitch", false);
    },
  },
});
</script>

<style scoped></style>
