import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "../store/authStore"; // For authentication headers

export const useContactsStore = defineStore("contacts", {
  state: () => ({
    contacts: [],
    contactDetails: null,
    loading: false,
    error: null,
    count: 0, // Add count for contact summaries
  }),

  actions: {
    // Fetch contacts with pagination
    async fetchContacts(page = 1) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/contacts/`,
          {
            params: { page },
            headers: { Authorization: `Bearer ${authStore.accessToken}` },
          }
        );
        this.contacts = response.data.results;
        this.count = response.data.count || 0;
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
        this.error = error.response?.data || "Failed to fetch contacts.";
      } finally {
        this.loading = false;
      }
    },

    // Fetch single contact by ID
    async fetchContact(id) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/contacts/${id}/`,
          {
            headers: { Authorization: `Bearer ${authStore.accessToken}` },
          }
        );
        this.contactDetails = response.data;

        // Add the contact to the list if it doesn't exist
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

    // Create a new contact
    async createContact(data) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/contacts/`,
          data,
          {
            headers: { Authorization: `Bearer ${authStore.accessToken}` },
          }
        );
        this.contacts.push(response.data); // Add to the local store
        this.count += 1; // Update the count
        return response.data;
      } catch (error) {
        console.error("Failed to create contact:", error);
        this.error = error.response?.data || "Failed to create contact.";
        throw error; // Rethrow error for handling
      } finally {
        this.loading = false;
      }
    },

    // Update an existing contact
    async updateContact(id, data) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        const response = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/api/contacts/${id}/`,
          data,
          {
            headers: { Authorization: `Bearer ${authStore.accessToken}` },
          }
        );
        const index = this.contacts.findIndex((c) => c.id === id);
        if (index !== -1) {
          this.contacts[index] = response.data; // Update locally
        }
        return response.data;
      } catch (error) {
        console.error("Failed to update contact:", error);
        this.error = error.response?.data || "Failed to update contact.";
        throw error; // Rethrow error for handling
      } finally {
        this.loading = false;
      }
    },

    // Delete a contact
    async deleteContact(id) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/api/contacts/${id}/`,
          {
            headers: { Authorization: `Bearer ${authStore.accessToken}` },
          }
        );
        this.contacts = this.contacts.filter((c) => c.id !== id); // Remove locally
        this.count = Math.max(0, this.count - 1); // Update the count
      } catch (error) {
        console.error("Failed to delete contact:", error);
        this.error = error.response?.data || "Failed to delete contact.";
        throw error; // Rethrow error for handling
      } finally {
        this.loading = false;
      }
    },
  },
});
