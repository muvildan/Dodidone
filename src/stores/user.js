import { ref } from "vue";
import { supabase } from "../supabase";
import { defineStore } from "pinia";
import router from "../router";

export const userStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    async handleLogin(credentials) {
      try {
        const { error, user } = await supabase.auth.signIn({
          email: credentials.email,
          password: credentials.password,
        });
        if (!error) {
          console.log(user);
          this.user = user;
          router.push({ path: "/" });
        } else if (error) {
          alert("Error logging in: " + error.message);
          router.push({ path: "/auth" });
        }
      } catch (error) {
        console.error("Error thrown:", error.message);
        alert(error.error_description || error);
        router.push({ path: "/auth" });
      }
    },
    async handleSignup(credentials, metadata) {
      try {
        const { email, password } = credentials;
        const { userName } = metadata;
        if (!email || !password) {
          alert("Please provide both your email and password.");
          return;
        }
        const { error, user } = await supabase.auth.signUp(
          {
            email,
            password,
          },
          {
            data: {
              userName,
            },
          }
        );

        this.user = user;
        console.log(this.user);

        if (error) {
          alert(error.message);
          console.error(error, error.message);
          return;
        }
        alert("Signup successful, confirmation mail should be sent soon!");
        router.push({ path: "/auth" });
        window.location.href = window.location.href;
      } catch (err) {
        alert("Fatal error signing up");
        console.error("signup error", err);
      }
    },
    async handlePasswordReset() {
      const email = prompt("Please enter your email:");
      if (!email) {
        window.alert("Email address is required.");
      } else {
        const { error } = await supabase.auth.api.resetPasswordForEmail(email);
        if (error) {
          alert("Error: " + error.message);
        } else {
          alert("Password recovery email has been sent.");
        }
      }
    },
    async handleUpdateUser(credentials) {
      try {
        const { error } = await supabase.auth.update(credentials);
        if (error) {
          alert("Error updating user info: " + error.message);
        } else {
          alert("Successfully updated user info!");
          window.location.href = "/";
        }
      } catch (error) {
        alert("Error updating user info: " + error.message);
      }
    },
    async handleLogout() {
      console.log("logging out");
      try {
        const { error } = await supabase.auth.signOut();
        if (error) {
          alert("Error signing out");
          console.error("Error", error);
          return;
        }
        this.user = null;
        router.push({ path: "/auth" });
      } catch (err) {
        alert("Unknown error signing out");
        console.error("Error", err);
      }
    },
  },
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
