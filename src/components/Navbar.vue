<template>
  <v-app-bar app>
    <!-- Navbar Title -->
    <v-toolbar-title>Emmerce CRM</v-toolbar-title>

    <!-- Navbar Navigation Links -->
    <v-spacer></v-spacer>
    <v-btn text to="/dashboard">Dashboard</v-btn>
    <v-btn text to="/profile">Profile</v-btn>
    <v-btn text to="/settings">Settings</v-btn>

    <!-- Logout Button -->
    <v-btn text @click="logout">Logout</v-btn>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function logout() {
  // Logic for logging out
  router.push("/"); // Redirect to home or login page
}
</script>

<style scoped>
/* Custom styling for the navbar if needed */
v-btn {
  margin-left: 10px;
}
</style>
