<template>
  <AppLayout>
    <v-container>
      <h1>{{ isEditing ? "Edit Reminder" : "Create Reminder" }}</h1>
      <v-form
        ref="reminderForm"
        v-model="formValid"
        lazy-validation
        @submit.prevent="submitReminder"
      >
        <v-text-field
          v-model="reminder.title"
          label="Title"
          :rules="[required]"
          required
        ></v-text-field>

        <v-textarea
          v-model="reminder.description"
          label="Description"
          :rules="[required]"
          required
        ></v-textarea>

        <!-- Lead Dropdown -->
        <v-select
          v-model="reminder.lead"
          :items="leadsData"
          item-text="name"
          item-value="id"
          label="Select Lead"
          :rules="[required]"
          required
        ></v-select>

        <!-- Date Picker -->
        <v-date-picker
          v-model="reminder.due_date"
          label="Due Date"
          :rules="[required]"
          required
          color="primary"
          outlined
        ></v-date-picker>

        <v-btn type="submit" color="primary" :disabled="!formValid">
          {{ isEditing ? "Update" : "Create" }} Reminder
        </v-btn>
        <v-btn color="secondary" @click="cancel">Cancel</v-btn>
      </v-form>
    </v-container>
  </AppLayout>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useReminderStore } from "../store/remindersStore"; // Import the reminder store
import { useLeadsStore } from "../store/LeadsStore"; // Import the leads store
import AppLayout from "../layouts/AppLayout.vue"; // Import AppLayout component

// Initialize stores and router
const router = useRouter();
const route = useRoute();
const isEditing = route.params.id ? true : false;

// Reactive variables
const formValid = ref(false); // Form validation state

// Initialize reminder object as reactive, including the lead
const reminder = reactive({
  title: "",
  description: "",
  due_date: new Date(),
  lead: null, // New field to hold the selected lead
});

// Validation rules
const required = (value) => !!value || "This field is required.";

// Accessing the reminder and leads store
const reminderStore = useReminderStore();
const leadsStore = useLeadsStore();
const leadsData = ref([]); // Store the list of leads

// Fetch reminder details for editing
const fetchReminder = async () => {
  try {
    await reminderStore.fetchReminder(route.params.id); // Use store to fetch reminder
    Object.assign(reminder, reminderStore.reminder); // Sync store's reminder data with local reminder object
  } catch (error) {
    console.error("Failed to fetch reminder details:", error);
  }
};

// Fetch all leads and populate leadsData for the dropdown
const fetchLeads = async () => {
  try {
    await leadsStore.fetchAllLeads();
    leadsData.value = leadsStore.leads; // Populate the leadsData with fetched leads
  } catch (error) {
    console.error("Failed to fetch leads:", error);
  }
};

// Submit function for creating or updating a reminder
const submitReminder = async () => {
  try {
    if (isEditing) {
      await reminderStore.updateReminder(route.params.id, reminder); // Update reminder using store
    } else {
      await reminderStore.createReminder(reminder); // Create new reminder using store
    }
    router.push("/reminders"); // Navigate to the reminders list after submission
  } catch (error) {
    console.error("Failed to submit reminder:", error);
  }
};

// Cancel button handler
function cancel() {
  router.push("/reminders");
}

// Fetch reminder data on mount if editing an existing reminder
onMounted(() => {
  // Fetch leads data for the lead dropdown
  fetchLeads();

  if (isEditing) {
    fetchReminder(); // Fetch reminder details if editing
    // Ensure that due_date is a Date object if it's a string
    if (reminder.due_date && typeof reminder.due_date === "string") {
      reminder.due_date = new Date(reminder.due_date);
    }
  }
});
</script>

<style scoped>
.v-form {
  max-width: 600px;
  margin: 0 auto;
}

.v-select {
  margin-bottom: 1em;
}
</style>
