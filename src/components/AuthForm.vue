<script>
import { useUserStore } from "../stores/user";

export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      userName: "",
      email: "",
      password: "",
      renderLogin: true,
    };
  },
  methods: {
    async signUp() {
      await this.userStore.signUp(this.email, this.password);
    },
  },
};
</script>

<template>
  <div>
    <h1 class="title_logo">Dodidone</h1>
    <!-- Log in -->
    <form @submit.preventDefault="signIn" v-if="renderLogin" class="log_in">
      <input type="email" v-model="email" placeholder="email" />
      <input type="password" v-model="password" placeholder="password" />
      <button type="submit">Log in</button>
      <hr />
      <div>Don't have an account?</div>
      <button @click="renderLogin = !renderLogin">Sign up</button>
    </form>

    <!-- Sign up -->
    <form @submit.preventDefault="signUp" class="sign_up" v-else>
      <hr />
      <div>Already have an account?</div>
      <button @click="renderLogin = !renderLogin">Log in</button>
      <input type="text" v-model="userName" placeholder="name" />
      <input type="email" v-model="email" placeholder="email" />
      <input type="password" v-model="password" placeholder="password" />
      <button type="submit">Sign up</button>
    </form>
  </div>
</template>

<style scoped>
.title_logo {
  font-family: "Permanent Marker";
}

.log_in {
  display: flex;
  flex-direction: column;
  gap: 2vh;
}
.sign_up {
  display: flex;
  flex-direction: column;
  gap: 2vh;
}
</style>
