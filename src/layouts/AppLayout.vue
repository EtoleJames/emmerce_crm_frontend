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
import { useReminderStore } from "../store/remindersStore";

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

// Use Reminder Store
const reminderStore = useReminderStore();
const { count: remindersCount, fetchRemindersCount } = reminderStore;

const router = useRouter();

// Authentication logic
const accessToken = ref(localStorage.getItem("access_token"));

// Logout function
const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
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
  router.push(path);
};

// Fetch reminders count when the component is mounted
onMounted(() => {
  if (accessToken.value) {
    fetchRemindersCount();
  }
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
  font-size: 16px;
}
</style>
