<template>
  <v-app>
    <!-- Sidebar -->
    <v-navigation-drawer
      app
      v-model="drawer"
      :mini-variant="miniVariant"
      class="grey lighten-4"
    >
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          @click="navigateTo(item.route)"
        >
          <template v-slot:prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Navbar -->
    <v-app-bar app color="grey" dark>
      <!-- Menu button for sidebar -->
      <v-btn icon @click="toggleDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <!-- App title -->
      <v-toolbar-title :class="{ 'small-title': isSmallScreen }">
        {{ isSmallScreen ? "E-CRM" : "Emmerce CRM" }}
      </v-toolbar-title>

      <!-- Dynamic Navbar items -->
      <v-spacer></v-spacer>
      <!-- Notification Bell -->
      <v-btn icon @click="navigateTo('/reminders')">
        <v-icon>{{ remindersCount > 0 ? "mdi-bell-ring" : "mdi-bell" }}</v-icon>
        <v-badge
          v-if="remindersCount > 0"
          color="red"
          :content="remindersCount"
          overlap
        ></v-badge>
      </v-btn>

      <!-- Logout Button -->
      <v-btn text @click="logout">Logout</v-btn>
    </v-app-bar>

    <!-- Main content -->
    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";
import {
  mdiHome,
  mdiLeadPencil,
  mdiAccount,
  mdiNotebook,
  mdiAlarm,
  mdiBell,
  mdiBellRing,
  mdiMenu,
} from "@mdi/js"; // Import Material Design Icons
import axios from "axios";

// Sidebar and Navbar logic
const drawer = ref(false);
const miniVariant = ref(false);
const menuItems = [
  { title: "Dashboard", route: "/dashboard", icon: "mdi-home" },
  { title: "Leads", route: "/leads", icon: "mdi-lead-pencil" },
  { title: "Contacts", route: "/contacts", icon: "mdi-account" },
  { title: "Notes", route: "/notes", icon: "mdi-notebook" },
  { title: "Reminders", route: "/reminders", icon: "mdi-alarm" },
];

// Mock reminders count for now
const remindersCount = ref(3);

const router = useRouter();

// Login session logic
const isAuthenticated = ref(false);
let isNavigating = ref(false);
const accessToken = ref(localStorage.getItem("access_token"));
const refreshToken = ref(localStorage.getItem("refresh_token"));

// Check if the user is authenticated
const checkAuthentication = async () => {
  // If there's no access token, redirect to login
  if (!accessToken.value) {
    router.push("/login");
    return;
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/token/verify/`,
      {
        token: accessToken.value,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      }
    );

    if (response.status === 200) {
      isAuthenticated.value = true;
    }
  } catch (error) {
    // If the access token is invalid or expired, attempt to refresh it
    if (error.response && error.response.status === 401) {
      await refreshAccessToken();
    } else {
      // If the refresh token is also invalid or expired, log the user out
      logout();
    }
  }
};

// Refresh access token using the refresh token
const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/token/refresh/`,
      {
        refresh_token: refreshToken.value,
      }
    );

    if (response.status === 200) {
      accessToken.value = response.data.access_token;
      localStorage.setItem("access_token", accessToken.value);
      checkAuthentication();
    }
  } catch (error) {
    console.error("Error refreshing access token:", error);
    logout();
  }
};

// Logout function
const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  accessToken.value = "";
  refreshToken.value = "";
  // router.push("/dashboard");
  window.location.reload();
};

// Detect screen size
const { xs } = useDisplay();
const isSmallScreen = xs; // `xs` is true for screens less than 600px

// Toggle sidebar visibility
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

// Navigation function
const navigateTo = (path) => {
  if (!isNavigating) {
    isNavigating = true;
    router.push(path).finally(() => {
      isNavigating = false;
    });
  }
};

// Perform authentication check when the component is mounted
onMounted(() => {
  checkAuthentication();
});
</script>

<style scoped>
.v-navigation-drawer {
  width: 250px;
}

.v-app-bar {
  z-index: 2;
}

.small-title {
  font-size: 16px; /* Adjust font size for small screens */
}
</style>
