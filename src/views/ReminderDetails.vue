<template>
  <AppLayout>
    <v-container>
      <v-row v-if="reminderStore.reminder">
        <v-col>
          <v-card v-if="!reminderStore.loading">
            <v-card-title>{{ reminderStore.reminder.title }}</v-card-title>
            <v-card-subtitle>{{
              reminderStore.reminder.due_date
            }}</v-card-subtitle>
            <v-card-text>
              <p>{{ reminderStore.reminder.description }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col>
          <div v-if="reminderStore.loading" class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
          <div v-else>
            <p>Reminder not found.</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </AppLayout>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useReminderStore } from "../store/remindersStore";

const route = useRoute();

// Access the reminder store
const reminderStore = useReminderStore();

// Fetch reminder data when the component is mounted
onMounted(() => {
  const reminderId = route.params.id;
  reminderStore.fetchReminder(reminderId);
});
</script>

<style scoped>
.v-card {
  margin-top: 20px;
}
</style>
