<template>
  <AppLayout>
    <v-container>
      <v-row>
        <v-col class="text-right">
          <v-btn color="primary" @click="navigateToCreateReminder"
            >Add New Reminder</v-btn
          >
        </v-col>
      </v-row>

      <v-row v-if="reminders.length">
        <v-col>
          <v-data-table
            :headers="tableHeaders"
            :items="reminders"
            :items-per-page="itemsPerPage"
            v-model:page="page"
            :loading="loading"
            :server-items-length="totalItems"
            @update:page="fetchReminders"
            :rows-per-page-items="[5, 10, 15]"
            class="elevation-1"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn color="primary" @click="viewReminder(item.id)">View</v-btn>
              <v-btn color="secondary" @click="navigateToEditReminder(item.id)"
                >Edit</v-btn
              >
              <v-btn color="red" @click="deleteReminder(item.id)">Delete</v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col>
          <div class="empty-message">
            <h2>No Reminders Found</h2>
            <p>No reminders have been added yet.</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AppLayout from "../layouts/AppLayout.vue";
import { api } from "../api/api";

const reminders = ref([]);
const page = ref(1);
const itemsPerPage = ref(5);
const totalItems = ref(0);
const loading = ref(false);
const router = useRouter();

const tableHeaders = [
  { text: "Title", align: "start", key: "title" },
  { text: "Due Date", align: "start", key: "due_date" },
  { text: "Actions", align: "center" },
];

async function fetchReminders() {
  loading.value = true;
  const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/`;
  const offset = (page.value - 1) * itemsPerPage.value;
  try {
    const response = await api(
      `${BASE_URL}reminders/?limit=${itemsPerPage.value}&offset=${offset}`,
      {
        method: "GET",
      }
    );
    reminders.value = response.results;
    totalItems.value = response.count;
    loading.value = false;
  } catch (error) {
    console.error("Failed to fetch reminders:", error);
    loading.value = false;
  }
}

const viewReminder = (id) => {
  router.push(`/reminders/${id}`);
};

const navigateToCreateReminder = () => {
  router.push("/reminders/create");
};

const navigateToEditReminder = (id) => {
  router.push(`/reminders/edit/${id}`);
};

const deleteReminder = async (id) => {
  const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/`;
  try {
    await api(`${BASE_URL}api/reminders/${id}/`, {
      method: "DELETE",
    });
    fetchReminders();
  } catch (error) {
    console.error("Failed to delete reminder:", error);
  }
};

onMounted(() => {
  fetchReminders();
});
</script>

<style scoped>
.empty-message {
  text-align: center;
  margin-top: 50px;
}
.empty-message h2 {
  font-size: 24px;
  margin-bottom: 10px;
}
</style>
