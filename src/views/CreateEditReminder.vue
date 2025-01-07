<template>
  <AppLayout>
    <v-container>
      <v-form @submit.prevent="submitReminder">
        <v-text-field
          v-model="reminder.title"
          label="Title"
          required
        ></v-text-field>
        <v-textarea
          v-model="reminder.description"
          label="Description"
          required
        ></v-textarea>
        <v-date-picker
          v-model="reminder.due_date"
          label="Due Date"
          required
        ></v-date-picker>
        <v-btn type="submit" color="primary"
          >{{ isEditing ? "Update" : "Create" }} Reminder</v-btn
        >
      </v-form>
    </v-container>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useReminderStore } from "../store/remindersStore"; // Import the reminder store

const router = useRouter();
const route = useRoute();
const isEditing = route.params.id ? true : false;
const reminder = ref({
  title: "",
  description: "",
  due_date: "",
});

const reminderStore = useReminderStore(); // Accessing the reminder store

// Fetch reminder details for editing
const fetchReminder = async () => {
  try {
    await reminderStore.fetchReminder(route.params.id); // Use store to fetch reminder
    reminder.value = reminderStore.reminder; // Sync store's reminder data with local reminder ref
  } catch (error) {
    console.error("Failed to fetch reminder details:", error);
  }
};

// Submit function for creating or updating a reminder
const submitReminder = async () => {
  try {
    if (isEditing) {
      await reminderStore.updateReminder(route.params.id, reminder.value); // Update reminder using store
    } else {
      await reminderStore.createReminder(reminder.value); // Create new reminder using store
    }
    router.push("/reminders"); // Navigate to the reminders list after submission
  } catch (error) {
    console.error("Failed to submit reminder:", error);
  }
};

// Fetch reminder data on mount if editing an existing reminder
onMounted(() => {
  if (isEditing) {
    fetchReminder(); // Fetch reminder details if editing
  }
});
</script>

<style scoped>
.v-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
