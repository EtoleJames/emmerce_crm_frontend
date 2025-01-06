<template>
  <nav>
    <ul>
      <li><router-link to="/dashboard">Dashboard</router-link></li>
      <li><router-link to="/profile">Profile</router-link></li>
      <li><router-link to="/settings">Settings</router-link></li>
      <li><button @click="logout">Logout</button></li>
    </ul>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function logout() {
  // Logic for logging out
  router.push("/");
}
</script>

<style scoped>
nav {
  background-color: #f8f9fa;
  padding: 10px;
}
ul {
  list-style: none;
  display: flex;
  gap: 10px;
}
li {
  display: inline;
}
</style>
