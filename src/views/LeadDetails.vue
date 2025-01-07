<template>
  <AppLayout>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-btn color="primary" @click="goToEditLead">Edit Lead</v-btn>
          <v-btn color="red" @click="deleteLead" class="ml-2"
            >Delete Lead</v-btn
          >
        </v-col>
      </v-row>

      <v-row v-if="leadStore.loading">
        <v-col cols="12" class="d-flex justify-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col cols="12">
          <v-card>
            <v-card-title>{{ leadStore.lead.name }}</v-card-title>
            <v-card-subtitle>{{ leadStore.lead.email }}</v-card-subtitle>
            <v-card-text>
              <div><strong>Phone:</strong> {{ leadStore.lead.phone }}</div>
              <div><strong>Status:</strong> {{ leadStore.lead.status }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </AppLayout>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useLeadsStore } from "../store/LeadsStore"; // Import the Pinia lead store

const route = useRoute();
const router = useRouter();

// Access the lead store
const leadStore = useLeadsStore();

// Fetch lead data based on the route parameter (id)
const loadLead = async () => {
  const id = route.params.id;
  await leadStore.fetchLead(id);
};

// Navigate to the edit page for the lead
const goToEditLead = () => {
  router.push(`/leads/edit/${route.params.id}`);
};

// Delete the lead
const deleteLead = async () => {
  try {
    await leadStore.deleteLead(route.params.id);
    router.push("/leads"); // Redirect back to the leads page
  } catch (error) {
    console.error("Failed to delete lead:", error);
  }
};

// Load the lead when the component is mounted
onMounted(() => {
  loadLead();
});
</script>

<style scoped>
/* Custom styles for layout */
</style>
