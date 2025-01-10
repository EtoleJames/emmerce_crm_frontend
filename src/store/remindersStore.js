import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

export const useReminderStore = defineStore("reminder", {
  state: () => ({
    count: 0,
    reminders: [],
    reminder: null,
    loading: false,
    error: null,
  }),
  actions: {
    // Fetch reminders count
    async fetchRemindersCount() {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/reminders/`,
          {
            headers: {
              Authorization: `Bearer ${authStore.accessToken}`,
            },
          }
        );
        this.count = response.data.count || 0;
      } catch (err) {
        this.error = err.response?.data || "Failed to fetch reminders count";
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // Fetch all reminders
    async fetchReminders() {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/reminders/`,
          {
            headers: {
              Authorization: `Bearer ${authStore.accessToken}`,
            },
          }
        );
        this.reminders = response.data;
      } catch (err) {
        this.error = err.response?.data || "Failed to fetch reminders";
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // Fetch a single reminder by ID
    async fetchReminder(id) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/reminders/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${authStore.accessToken}`,
            },
          }
        );
        this.reminder = response.data;
      } catch (err) {
        this.error = err.response?.data || "Failed to fetch reminder";
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // Create a new reminder
    async createReminder(data) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/reminders/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${authStore.accessToken}`,
            },
          }
        );
        this.reminders.push(response.data);
        return response.data;
      } catch (err) {
        this.error = err.response?.data || "Failed to create reminder";
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // Update an existing reminder
    async updateReminder(id, data) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        const response = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/api/reminders/${id}/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${authStore.accessToken}`,
            },
          }
        );
        this.reminders = this.reminders.map((reminder) =>
          reminder.id === id ? response.data : reminder
        );
        return response.data;
      } catch (err) {
        this.error = err.response?.data || "Failed to update reminder";
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // Delete a reminder
    async deleteReminder(id) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/api/reminders/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${authStore.accessToken}`,
            },
          }
        );
        this.reminders = this.reminders.filter(
          (reminder) => reminder.id !== id
        );
      } catch (err) {
        this.error = err.response?.data || "Failed to delete reminder";
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});
