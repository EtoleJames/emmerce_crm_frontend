<template>
  <AppLayout>
    <v-container>
      <!-- Add New Note Button (aligned to the right) -->
      <v-row>
        <v-col class="text-right">
          <v-btn color="primary" @click="navigateToCreateNote">
            Add New Note
          </v-btn>
        </v-col>
      </v-row>

      <!-- Notes Table -->
      <v-row v-if="notesStore.notes.length">
        <v-col>
          <v-data-table
            :headers="tableHeaders"
            :items="notesStore.notes"
            :items-per-page="notesStore.itemsPerPage"
            v-model:page="notesStore.page"
            :loading="notesStore.loading"
            :server-items-length="notesStore.totalItems"
            @update:page="notesStore.setPage"
            :rows-per-page-items="[5, 10, 15]"
            class="elevation-1"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn color="primary" @click="viewNote(item.id)">View</v-btn>
              <v-btn color="secondary" @click="navigateToEditNote(item.id)">
                Edit
              </v-btn>
              <v-btn color="red" @click="deleteNote(item.id)">Delete</v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <!-- Empty Notes Message -->
      <v-row v-else>
        <v-col>
          <div class="empty-message">
            <h2>No Notes Found</h2>
            <p>No notes have been added yet.</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </AppLayout>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useNoteStore } from "../store/notesStore"; // Import the notes store
import AppLayout from "../layouts/AppLayout.vue"; // Ensure AppLayout is imported

const router = useRouter();

// Access the notes store
const notesStore = useNoteStore();

// Table headers configuration
const tableHeaders = [
  { text: "Title", align: "start", key: "title" },
  { text: "Description", align: "start", key: "description" },
  { text: "Actions", align: "center" },
];

// Fetch notes on component mount
onMounted(() => {
  notesStore.fetchNotes(notesStore.page);
});

// Navigate to the Create Note page
const navigateToCreateNote = () => {
  router.push("/notes/create");
};

// View a specific note
const viewNote = (id) => {
  router.push(`/notes/${id}`);
};

// Navigate to Edit Note page
const navigateToEditNote = (id) => {
  router.push(`/notes/edit/${id}`);
};

// Delete a specific note
const deleteNote = (id) => {
  notesStore.deleteNote(id);
};
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
