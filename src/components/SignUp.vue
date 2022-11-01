<template>
  <div class="border-teal p-8 border-t-12 mb-6 rounded-lg shadow-lg bg-white">
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <label class="font-bold text-grey-darker mb-2"> Name</label>
        <input
          type="text"
          class="appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
          placeholder="Great"
          v-model="userName"
        />
      </div>
      <div>
        <div>
          <label class="font-bold text-grey-darker mb-2"> Surname</label>
          <input
            type="text"
            class="appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
            placeholder="Peacock"
            v-model="userSurname"
          />
        </div>
      </div>
    </div>
    <div class="mb-4">
      <label class="font-bold text-grey-darker block mb-2"> Email</label>
      <input
        type="text"
        class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
        placeholder="great.peacock@example.com"
        v-model="email"
      />
    </div>
    <div class="mb-4">
      <label class="font-bold text-grey-darker block mb-2">Password</label>
      <input
        type="password"
        class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
        placeholder="🔐"
        v-model="password"
      />
    </div>

    <div class="flex flex-col gap-2">
      <a
        @click="auth.handleSignup({ email, password })"
        href="#"
        class="btn-black"
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
    const userSurname = ref("");
    const email = ref("");
    const password = ref("");
    const register = ref(true);

    return {
      userName,
      userSurname,
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
