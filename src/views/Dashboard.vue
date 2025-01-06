<template>
  <AppLayout>
    <v-container fluid>
      <!-- Dashboard Content -->
      <v-row>
        <!-- Leads Card -->
        <v-col cols="12" sm="6" md="3">
          <v-card class="pa-4" outlined>
            <v-card-title>Leads</v-card-title>
            <v-card-subtitle>{{ leadsCount }}</v-card-subtitle>
            <v-card-actions>
              <v-btn color="primary" @click="navigateTo('/leads')">View</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- Contacts Card -->
        <v-col cols="12" sm="6" md="3">
          <v-card class="pa-4" outlined>
            <v-card-title>Contacts</v-card-title>
            <v-card-subtitle>{{ contactsCount }}</v-card-subtitle>
            <v-card-actions>
              <v-btn color="primary" @click="navigateTo('/contacts')"
                >View</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- Notes Card -->
        <v-col cols="12" sm="6" md="3">
          <v-card class="pa-4" outlined>
            <v-card-title>Notes</v-card-title>
            <v-card-subtitle>{{ notesCount }}</v-card-subtitle>
            <v-card-actions>
              <v-btn color="primary" @click="navigateTo('/notes')">View</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- Reminders Card -->
        <v-col cols="12" sm="6" md="3">
          <v-card class="pa-4" outlined>
            <v-card-title>Reminders</v-card-title>
            <v-card-subtitle>{{ remindersCount }}</v-card-subtitle>
            <v-card-actions>
              <v-btn color="primary" @click="navigateTo('/reminders')"
                >View</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AppLayout from "../layouts/AppLayout.vue";

// Metrics for dashboard
const leadsCount = ref(0);
const contactsCount = ref(0);
const notesCount = ref(0);
const remindersCount = ref(0);

// Use Vue Router
const router = useRouter();

// Function to navigate to different pages
const navigateTo = (path) => {
  router.push(path);
};

onMounted(() => {
  // For now, we are using dummy data, this will be replaced with API calls
  leadsCount.value = 10;
  contactsCount.value = 5;
  notesCount.value = 8;
  remindersCount.value = 3;
});
</script>

<style scoped>
.v-container {
  padding-top: 20px;
}

.v-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.v-card-title {
  font-weight: bold;
}

.v-card-actions {
  margin-top: auto;
}
</style>
