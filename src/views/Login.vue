<template>
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
            v-model="username"
            label="Username"
            outlined
            class="mb-4"
            :rules="[rules.required]"
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            outlined
            class="mb-4"
            :rules="[rules.required]"
          ></v-text-field>

          <v-btn
            color="primary"
            block
            large
            rounded
            class="mb-4"
            @click="login"
            :disabled="!isFormValid"
            style="background-color: #4a90e2; color: white"
          >
            Login
          </v-btn>

          <v-divider></v-divider>

          <div class="text-center mt-4">
            <small style="color: #7a7a7a">
              Don’t have an account?
              <a href="#" style="color: #4a90e2; text-decoration: none"
                >Sign Up</a
              >
            </small>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");
const isFormValid = ref(false);

const rules = {
  required: (value) => !!value || "This field is required",
};

function login() {
  if (username.value && password.value) {
    // Perform authentication logic here
    router.push("/dashboard"); // Redirect to the dashboard
  } else {
    alert("Please fill in all fields.");
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
</style>
