<template>
  <v-container
    class="d-flex justify-center align-center"
    style="
      background-color: #f5f5f5;
      padding: 0;
      min-height: 100vh;
      width: 100%;
    "
  >
    <v-card
      class="py-6 px-8"
      style="
        width: 400px;
        border-radius: 16px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        height: 600px;
      "
    >
      <v-card-title
        class="justify-center text-h5 font-weight-bold"
        style="color: #4a90e2"
      >
        Register
      </v-card-title>

      <v-card-text class="overflow-auto" style="max-height: calc(100% - 60px)">
        <v-form ref="form" v-model="isFormValid">
          <v-text-field
            v-model="username"
            label="Username"
            outlined
            class="mb-4"
            :rules="[rules.required]"
          />
          <v-text-field
            v-model="email"
            label="Email"
            outlined
            class="mb-4"
            :rules="[rules.required, rules.email]"
          />
          <v-text-field
            v-model="phone"
            label="Phone Number"
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
          <v-text-field
            v-model="confirmPassword"
            label="Confirm Password"
            type="password"
            outlined
            class="mb-4"
            :rules="[rules.required, passwordMatch]"
          />

          <v-btn
            color="primary"
            block
            large
            rounded
            class="mb-4"
            @click="register"
            :disabled="!isFormValid || loading"
            style="background-color: #4a90e2; color: white"
          >
            <span v-if="!loading">Register</span>
            <v-progress-circular
              v-else
              indeterminate
              color="white"
              size="24"
              width="2"
              class="mr-2"
            ></v-progress-circular>
            <span v-if="loading">Registering...</span>
          </v-btn>

          <v-divider />
          <div class="text-center mt-4">
            <small style="color: #7a7a7a">
              Already have an account?
              <router-link
                to="/login"
                style="color: #4a90e2; text-decoration: none"
                >Login</router-link
              >
            </small>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

    <!-- Snackbar for success or error message -->
    <v-snackbar v-model="snackbarVisible" :color="snackbarColor" timeout="5000">
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarVisible = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { api } from "../api/api"; // Import the api utility

const router = useRouter();
const username = ref("");
const email = ref("");
const phone = ref("");
const password = ref("");
const confirmPassword = ref("");
const isFormValid = ref(false);
const loading = ref(false); // Track loading state

const snackbarVisible = ref(false);
const snackbarMessage = ref("");
const snackbarColor = ref(""); // Green for success, red for error

const rules = {
  required: (value) => !!value || "This field is required",
  email: (value) => /.+@.+\..+/.test(value) || "Please enter a valid email",
};

const passwordMatch = (value) =>
  value === password.value || "Passwords must match";

// Check if the user already has a valid token upon landing on the register page
onMounted(() => {
  const token = localStorage.getItem("access_token");
  if (token) {
    // If the access token exists, redirect to the dashboard
    router.push("/dashboard");
  }
});

async function register() {
  loading.value = true; // Show loader

  const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/`; // Get the base URL from the environment

  if (
    username.value &&
    email.value &&
    phone.value &&
    password.value &&
    confirmPassword.value
  ) {
    try {
      // Use the api.js utility for the request
      const response = await api(`${BASE_URL}auth/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.value,
          email: email.value,
          phone: phone.value,
          password: password.value,
        }),
      });

      // Show success snackbar
      snackbarMessage.value = "User successfully registered!";
      snackbarColor.value = "green";
      snackbarVisible.value = true;

      // Redirect to the login page after successful registration
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error); // Log error details
      // Show error snackbar
      snackbarMessage.value =
        "There was an error during registration. Please try again.";
      snackbarColor.value = "red";
      snackbarVisible.value = true;
    } finally {
      loading.value = false; // Hide loader after the request is done
    }
  } else {
    snackbarMessage.value = "Please fill in all fields.";
    snackbarColor.value = "red";
    snackbarVisible.value = true;
    loading.value = false; // Hide loader if fields are empty
  }
}
</script>

<style scoped>
v-container {
  font-family: "Roboto", sans-serif;
  color: #ffffff;
  padding: 0;
  width: 100%; /* Ensure the container takes full width */
}

v-card {
  background: #ffffff;
}

.overflow-auto {
  overflow-y: auto;
  max-height: 600px; /* Ensure content can scroll */
}

.v-card-text {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
