import { defineStore } from "pinia";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

export const useLeadsStore = defineStore("leads", {
  state: () => ({
    leads: [],
    lead: null,
    loading: false,
    error: null,
    pagination: {
      count: 0,
      next: null,
      previous: null,
    },
  }),

  actions: {
    // Fetch all leads without pagination
    async fetchAllLeads() {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/leads/`,
          {
            headers: {
              Authorization: `Bearer ${authStore.accessToken}`,
            },
          }
        );

        this.leads = response.data.results; // Store all leads
      } catch (err) {
        this.error = err.response?.data || "Failed to fetch leads";
      } finally {
        this.loading = false;
      }
    },

    // Fetch leads with pagination
    async fetchLeads(page = 1) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/leads/?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${authStore.accessToken}`,
            },
          }
        );
        this.leads = response.data.results;
        this.pagination.count = response.data.count;
        this.pagination.next = response.data.next;
        this.pagination.previous = response.data.previous;
      } catch (err) {
        this.error = err.response?.data || "Failed to fetch leads";
      } finally {
        this.loading = false;
      }
    },

    // Fetch single lead by ID
    async fetchLead(id) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/leads/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${authStore.accessToken}`,
            },
          }
        );
        this.lead = response.data;
      } catch (err) {
        this.error = err.response?.data || "Failed to fetch lead";
      } finally {
        this.loading = false;
      }
    },

    // Create a new lead
    async createLead(data) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/leads/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${authStore.accessToken}`,
            },
          }
        );
        this.leads.push(response.data);
        return response.data;
      } catch (err) {
        this.error = err.response?.data || "Failed to create lead";
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // Update an existing lead
    async updateLead(id, data) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        const response = await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/api/leads/${id}/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${authStore.accessToken}`,
            },
          }
        );
        this.leads = this.leads.map((lead) =>
          lead.id === id ? response.data : lead
        );
        return response.data;
      } catch (err) {
        this.error = err.response?.data || "Failed to update lead";
        throw err;
      } finally {
        this.loading = false;
      }
    },

    // Delete a lead
    async deleteLead(id) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/api/leads/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${authStore.accessToken}`,
            },
          }
        );
        this.leads = this.leads.filter((lead) => lead.id !== id);
      } catch (err) {
        this.error = err.response?.data || "Failed to delete lead";
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});
