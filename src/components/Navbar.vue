<template>
  <v-app-bar app>
    <!-- Navbar Title -->
    <v-toolbar-title>Emmerce CRM</v-toolbar-title>

    <!-- Navbar Navigation Links -->
    <v-spacer></v-spacer>
    <v-btn text to="/dashboard">Dashboard</v-btn>
    <v-btn text to="/profile">Profile</v-btn>
    <v-btn text to="/settings">Settings</v-btn>

    <!-- Bell Button with reminder indicator -->
    <v-btn text @click="viewReminders">
      <v-icon>
        <!-- Conditional rendering of the bell icon with red dot if reminders exist -->
        {{ hasReminders ? "mdi-bell-ring" : "mdi-bell" }}
      </v-icon>
      <v-badge
        v-if="hasReminders"
        color="red"
        content=""
        overlap
        style="
          position: absolute;
          top: -5px;
          right: -5px;
          width: 10px;
          height: 10px;
        "
      ></v-badge>
    </v-btn>

    <!-- Logout Button -->
    <v-btn text @click="logout">Logout</v-btn>
  </v-app-bar>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { mdiBell, mdiBellRing } from "@mdi/js"; // Import Material Design Icons

const router = useRouter();

// Dummy state to represent whether the user has reminders (for now, this is hardcoded)
const hasReminders = ref(false); // Change this to `true` if you want to simulate having reminders

onMounted(() => {
  // Checking if the user has an access token in localStorage, indicating they are logged in
  const token = localStorage.getItem("access_token");
  if (!token) {
    // If there's no token, redirect the user to the login page
    router.push("/login");
  }
});

// Simulating logout functionality
function logout() {
  // Remove the token and redirect to login page
  localStorage.removeItem("access_token");
  router.push("/login");
}

// This method will be called when the user clicks the bell icon
function viewReminders() {
  // Currently does nothing (we will implement the reminders page later)
  router.push("/reminders");
}
</script>

<style scoped>
/* Custom styling for the navbar if needed */
v-btn {
  margin-left: 10px;
}

.v-icon {
  font-size: 24px;
}

.v-badge {
  top: -5px;
  right: -5px;
  position: absolute;
  background-color: red;
  width: 12px;
  height: 12px;
}
</style>
