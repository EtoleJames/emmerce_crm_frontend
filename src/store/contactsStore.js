import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "./authStore"; // For authentication headers

export const useContactsStore = defineStore("contacts", {
  state: () => ({
    contacts: [],
    contactDetails: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchContacts(page = 1) {
      this.loading = true;
      const authStore = useAuthStore(); // Retrieve auth headers
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/contacts/`,
          {
            params: { page },
            headers: { Authorization: `Bearer ${authStore.accessToken}` },
          }
        );
        this.contacts = response.data.results;
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
        this.error = error.response?.data || "Failed to fetch contacts.";
      } finally {
        this.loading = false;
      }
    },

    async fetchContact(id) {
      this.loading = true;
      const authStore = useAuthStore();
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/contacts/${id}/`,
          {
            headers: { Authorization: `Bearer ${authStore.accessToken}` },
          }
        );
        this.contactDetails = response.data;

        // Check if already in contacts, otherwise add it
        if (!this.contacts.some((c) => c.id === id)) {
          this.contacts.push(response.data);
        }
      } catch (error) {
        console.error(`Failed to fetch contact ${id}:`, error);
        this.error = error.response?.data || "Failed to fetch contact.";
      } finally {
        this.loading = false;
      }
    },

    async createContact(data) {
      const authStore = useAuthStore();
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/contacts/`,
          data,
          {
            headers: { Authorization: `Bearer ${authStore.accessToken}` },
          }
        );
        this.contacts.push(response.data); // Add new contact locally
        return response.data;
      } catch (error) {
        console.error("Failed to create contact:", error);
        throw error.response?.data || "Failed to create contact.";
      }
    },

    async updateContact(id, data) {
      const authStore = useAuthStore();
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/api/contacts/${id}/`,
          data,
          {
            headers: { Authorization: `Bearer ${authStore.accessToken}` },
          }
        );
        const index = this.contacts.findIndex((c) => c.id === id);
        if (index !== -1) this.contacts[index] = response.data; // Update locally
        return response.data;
      } catch (error) {
        console.error("Failed to update contact:", error);
        throw error.response?.data || "Failed to update contact.";
      }
    },

    async deleteContact(id) {
      const authStore = useAuthStore();
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/api/contacts/${id}/`,
          {
            headers: { Authorization: `Bearer ${authStore.accessToken}` },
          }
        );
        this.contacts = this.contacts.filter((c) => c.id !== id); // Remove locally
      } catch (error) {
        console.error("Failed to delete contact:", error);
        throw error.response?.data || "Failed to delete contact.";
      }
    },
  },
});
