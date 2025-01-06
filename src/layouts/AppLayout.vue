<template>
  <v-app>
    <v-navigation-drawer
      app
      v-model="drawer"
      :mini-variant="miniVariant"
      class="grey lighten-4"
    >
      <!-- Sidebar content -->
      <v-list>
        <v-list-item v-for="item in menuItems" :key="item.title">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="grey" dark>
      <!-- App bar content -->
      <v-btn icon @click="toggleDrawer">
        <div class="container-menu">
          <div class="bar1"></div>
          <div class="bar2"></div>
          <div class="bar3"></div>
        </div>
      </v-btn>
      <v-toolbar-title>Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="logout">Logout</v-btn>
    </v-app-bar>

    <v-main>
      <slot></slot>
      <!-- The main content of the page will be injected here -->
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const drawer = ref(false); // Controls drawer state
const change = ref(""); // Controls drawer state
const miniVariant = ref(false); // Mini variant of the drawer
const menuItems = [
  { title: "Dashboard" },
  { title: "Leads" },
  { title: "Contacts" },
  { title: "Notes" },
  { title: "Reminders" },
];

const router = useRouter();

// Toggle the drawer visibility
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

// Logout function
const logout = () => {
  // Handle logout logic here, like clearing the session
  router.push("/login");
};
</script>

<style scoped>
.v-navigation-drawer {
  width: 250px;
}

.v-app-bar {
  z-index: 2;
}

.container-menu {
  display: inline-block;
  cursor: pointer;
}

.bar1,
.bar2,
.bar3 {
  width: 30px;
  height: 4px;
  background-color: #333;
  margin: 6px 0;
  transition: 0.4s;
}

.change .bar1 {
  transform: translate(0, 11px) rotate(-45deg);
}

.change .bar2 {
  opacity: 0;
}

.change .bar3 {
  transform: translate(0, -11px) rotate(45deg);
}
</style>
