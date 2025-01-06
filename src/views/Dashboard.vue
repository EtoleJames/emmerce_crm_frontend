<template>
  <v-app>
    <!-- Navbar remains unchanged -->
    <Navbar />

    <!-- Full screen container for the login page -->
    <v-container
      fluid
      class="d-flex justify-center align-center login-container"
      style="height: 100vh; background-color: #f5f5f5"
    >
      <!-- Card for login form -->
      <v-card class="pa-5" max-width="400px" width="100%">
        <v-card-title>
          <span class="headline">Login</span>
        </v-card-title>

        <!-- Login Form -->
        <v-form ref="form" v-model="valid" @submit.prevent="login">
          <v-text-field
            v-model="email"
            label="Email"
            prepend-icon="mdi-email"
            type="email"
            :rules="[emailRules]"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            prepend-icon="mdi-lock"
            type="password"
            :rules="[passwordRules]"
            required
          ></v-text-field>

          <v-btn :disabled="!valid" color="primary" block type="submit">
            Login
          </v-btn>
        </v-form>
      </v-card>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import Navbar from "../components/Navbar.vue";

const email = ref("");
const password = ref("");
const valid = ref(false);

const emailRules = [
  (v) => !!v || "Email is required",
  (v) => /.+@.+\..+/.test(v) || "Email must be valid",
];

const passwordRules = [
  (v) => !!v || "Password is required",
  (v) => v.length >= 6 || "Password must be at least 6 characters",
];

const login = () => {
  // handle login logic here
};
</script>

<style scoped>
/* Override the max-width for the login page */
.login-container {
  width: 100vw !important;
}

.v-container {
  padding: 0 !important;
}

.v-card {
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
}
</style>
