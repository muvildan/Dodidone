import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { reactive } from "vue";
// import router from "../router";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },

  actions: {
    async fetchUser() {
      const user = await supabase.auth.getSession();
      if (user) this.user = user;
    },

    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) this.user = user;
    },
  },

  // async logIn({ commit }, form) {
  //   try {
  //     const { error, user } = await supabase.auth.signIn({
  //       email: form.email,
  //       password: form.password,
  //     });
  //     if (error) throw error;
  //     await router.push("/");
  //     commit("setUser", user.email);
  //   } catch (error) {
  //     alert(error.error_description || error.message);
  //   }
  // },

  // async logOut({ commit }) {
  //   try {
  //     const { error } = await supabase.auth.signOut();
  //     if (error) throw error;
  //     commit("setUser", null);
  //     await router.push("/auth");
  //   } catch (error) {
  //     alert(error.error_description || error.message);
  //   }
  // },
  // },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
