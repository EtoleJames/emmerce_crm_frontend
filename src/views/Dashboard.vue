<template>
  <AppLayout>
    <v-container fluid>
      <!-- Dashboard Cards -->
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-card class="pa-4" outlined>
            <v-card-title>Leads</v-card-title>
            <v-card-subtitle>{{ leadsCount }}</v-card-subtitle>
            <v-card-actions>
              <v-btn color="primary" @click="navigateTo('/leads')">View</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

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

        <v-col cols="12" sm="6" md="3">
          <v-card class="pa-4" outlined>
            <v-card-title>Notes</v-card-title>
            <v-card-subtitle>{{ notesCount }}</v-card-subtitle>
            <v-card-actions>
              <v-btn color="primary" @click="navigateTo('/notes')">View</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

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

// Dashboard data
const leadsCount = ref(10);
const contactsCount = ref(5);
const notesCount = ref(8);
const remindersCount = ref(3);
let isNavigating = ref(false);

const router = useRouter();

// Navigation function
const navigateTo = (path) => {
  if (!isNavigating) {
    isNavigating = true;
    router.push(path).finally(() => {
      isNavigating = false;
    });
  }
};

onMounted(() => {
  // Fetch or mock API data for now
  leadsCount.value = 10;
  contactsCount.value = 5;
  notesCount.value = 8;
  remindersCount.value = 3; // Can later be dynamic
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
