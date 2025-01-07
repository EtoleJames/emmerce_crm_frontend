<template>
  <!-- Snackbar for error message -->
  <v-snackbar v-model="snackbarVisible" :color="snackbarColor" timeout="5000">
    {{ snackbarMessage }}
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="snackbarVisible = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>

  <v-container
    class="d-flex justify-center align-center"
    style="
      min-height: 100vh;
      background-color: #f5f5f5;
      padding: 0;
      width: 100%;
    "
  >
    <v-card
      class="py-6 px-8"
      style="
        width: 400px;
        max-width: 90%;
        border-radius: 16px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      "
    >
      <v-card-title
        class="justify-center text-h5 font-weight-bold"
        style="color: #4a90e2"
      >
        Login
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="isFormValid">
          <v-text-field
            v-model="email"
            label="Email"
            outlined
            class="mb-4"
            :rules="[rules.required]"
          />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            outlined
            class="mb-4"
            :rules="[rules.required]"
          />

          <v-btn
            color="primary"
            block
            large
            rounded
            class="mb-4"
            @click="login"
            :disabled="!isFormValid || loading"
            style="background-color: #4a90e2; color: white"
          >
            <span v-if="!loading">Login</span>
            <v-progress-circular
              v-else
              indeterminate
              color="white"
              size="24"
              width="2"
              class="mr-2"
            ></v-progress-circular>
            <span v-if="loading">Logging In...</span>
          </v-btn>

          <v-divider />
          <div class="text-center mt-4">
            <small style="color: #7a7a7a">
              Don’t have an account?
              <router-link
                to="/register"
                style="color: #4a90e2; text-decoration: none"
                >Sign Up</router-link
              >
            </small>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";
import { api } from "../api/api";

const router = useRouter();
const authStore = useAuthStore(); // Access auth store
const email = ref("");
const password = ref("");
const isFormValid = ref(false);
const loading = ref(false); // Track loading state
const snackbarVisible = ref(false); // Snackbar visibility
const snackbarMessage = ref(""); // Snackbar message content
const snackbarColor = ref(""); // Snackbar color (success, error, etc.)

const rules = {
  required: (value) => !!value || "This field is required",
};

// Check if the user already has a valid token upon landing on the login page
onMounted(() => {
  if (authStore.isAuthenticated) {
    // If the access token exists, redirect to the dashboard
    router.push("/dashboard");
  }
});

async function login() {
  loading.value = true; // Show loader
  const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/`; // Get the base URL from the environment

  if (email.value && password.value) {
    try {
      // Use the api.js utility for the request
      const response = await api(`${BASE_URL}auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });

      // Store both access and refresh tokens securely and update the auth store
      const { access, refresh, current_user } = response;
      authStore.setTokens(access, refresh, current_user.id); // Update the store with tokens

      // Redirect to the dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error); // Log error details
      // Show error snackbar
      snackbarMessage.value = "Invalid email or password. Please try again.";
      snackbarColor.value = "red"; // Error color
      snackbarVisible.value = true; // Show snackbar
    } finally {
      loading.value = false; // Hide loader after the request is done
    }
  } else {
    // Show error snackbar for missing fields
    snackbarMessage.value = "Please fill in all fields.";
    snackbarColor.value = "red"; // Error color
    snackbarVisible.value = true; // Show snackbar
    loading.value = false; // Hide loader if fields are empty
  }
}
</script>

<style scoped>
v-container {
  font-family: "Roboto", sans-serif;
  color: #ffffff;
}

v-card {
  background: #ffffff;
}

@media (min-width: 1280px) {
  .v-container {
    width: 100% !important;
    max-width: 100% !important;
  }
}

@media (min-width: 960px) {
  .v-container {
    width: 100% !important;
    max-width: 100% !important;
  }
}

@media (min-width: 700px) {
  .v-container {
    max-width: 90%; /* Set max-width for screens larger than 700px */
  }
}
</style>
