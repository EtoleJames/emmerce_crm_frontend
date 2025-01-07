import { defineStore } from "pinia";
import axios from "../plugins/axios";

export const useReminderStore = defineStore("reminder", {
  state: () => ({
    count: 0,
    reminders: [],
    reminder: null,
  }),
  actions: {
    async fetchRemindersCount() {
      try {
        const response = await axios.get("/reminders/");
        this.count = response.data.count || 0;
      } catch (error) {
        console.error("Failed to fetch reminders count:", error);
      }
    },

    async fetchReminders() {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/reminders/`
      );
      this.reminders = response.data;
    },

    async fetchReminder(id) {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/reminders/${id}/`
      );
      this.reminder = response.data;
    },

    async createReminder(data) {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/reminders/`, data);
    },

    async updateReminder(id, data) {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/reminders/${id}/`,
        data
      );
    },

    async deleteReminder(id) {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/reminders/${id}/`
      );
    },
  },
});
