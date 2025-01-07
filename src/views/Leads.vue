<template>
  <AppLayout>
    <v-container>
      <!-- Add New Lead Button (aligned to the right) -->
      <v-row>
        <v-col class="text-right">
          <v-btn color="primary" @click="navigateToCreateLead"
            >Add New Lead</v-btn
          >
        </v-col>
      </v-row>

      <!-- Leads Table -->
      <v-row v-if="leadStore.leads.length">
        <v-col>
          <v-data-table
            :headers="tableHeaders"
            :items="leadStore.leads"
            :items-per-page="itemsPerPage"
            v-model:page="page"
            :loading="leadStore.loading"
            :server-items-length="leadStore.totalItems"
            @update:page="fetchLeads"
            :rows-per-page-items="[5, 10, 15]"
            class="elevation-1"
          >
            <!-- Slot for displaying lead status -->
            <template v-slot:[`item.status`]="{ item }">
              <v-chip :color="getStatusColor(item.status)" dark>{{
                item.status
              }}</v-chip>
            </template>

            <!-- Slot for actions like View, Edit, Delete buttons -->
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn color="primary" @click="viewLead(item.id)">View</v-btn>
              <v-btn color="secondary" @click="navigateToEditLead(item.id)"
                >Edit</v-btn
              >
              <v-btn color="red" @click="deleteLead(item.id)">Delete</v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <!-- Empty Leads Message -->
      <v-row v-else>
        <v-col>
          <div class="empty-leads">
            <h2>No Leads Found</h2>
            <p>
              Looks like you don't have any leads yet.
              <router-link to="/dashboard">Go back to the dashboard</router-link
              >.
            </p>
          </div>
        </v-col>
      </v-row>

      <!-- Lead Details Dialog -->
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>{{ selectedLead.name }}</v-card-title>
          <v-card-text>
            <p>Email: {{ selectedLead.email }}</p>
            <p>Phone: {{ selectedLead.phone }}</p>
            <p>Status: {{ selectedLead.status }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="dialog = false" color="primary">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AppLayout from "../layouts/AppLayout.vue";
import { useLeadsStore } from "../store/LeadsStore";
import { useAuthStore } from "../store/authStore"; // Import the lead store

const router = useRouter();
const leadStore = useLeadsStore();

const page = ref(1);
const itemsPerPage = ref(5);
const dialog = ref(false);
const selectedLead = ref({});

const tableHeaders = [
  { text: "Name", align: "start", key: "name" },
  { text: "Email", align: "start", key: "email" },
  { text: "Phone", align: "start", key: "phone" },
  { text: "Status", align: "start", key: "status" },
  { text: "Actions", align: "center" },
];

// Fetch leads when the page changes
const fetchLeads = () => {
  leadStore.fetchLeads(page.value, itemsPerPage.value);
};

// View lead details in the dialog
const viewLead = (id) => {
  const lead = leadStore.leads.find((lead) => lead.id === id);
  selectedLead.value = lead;
  dialog.value = true;
};

// Navigate to the Create Lead page
const navigateToCreateLead = () => {
  router.push("/leads/create");
};

// Navigate to the Edit Lead page
const navigateToEditLead = (id) => {
  router.push(`/leads/edit/${id}`);
};

// Get chip color based on lead status
const getStatusColor = (status) => {
  switch (status) {
    case "New":
      return "blue";
    case "In Progress":
      return "orange";
    case "Completed":
      return "green";
    default:
      return "grey";
  }
};

// Delete a lead
const deleteLead = async (id) => {
  const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/`;
  try {
    await api(`${BASE_URL}leads/${id}/`, { method: "DELETE" });
    fetchLeads(); // Refresh the list after deletion
  } catch (error) {
    console.error("Failed to delete lead:", error);
  }
};

// Fetch leads on component mount
onMounted(() => {
  fetchLeads();
});
</script>

<style scoped>
.empty-leads {
  text-align: center;
  margin-top: 50px;
}

.empty-leads h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.empty-leads p {
  font-size: 18px;
}
</style>
