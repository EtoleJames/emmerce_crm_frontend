import { defineStore } from "pinia";
import axios from "axios";

export const useNoteStore = defineStore("note", {
  state: () => ({
    notes: [],
    note: null,
  }),
  actions: {
    async fetchNotes() {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/notes/`
      );
      this.notes = response.data;
    },

    async fetchNote(id) {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/notes/${id}/`
      );
      this.note = response.data;
    },

    async createNote(data) {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/notes/`, data);
    },

    async updateNote(id, data) {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/notes/${id}/`,
        data
      );
    },

    async deleteNote(id) {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/notes/${id}/`);
    },
  },
});
