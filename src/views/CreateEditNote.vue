<template>
  <AppLayout>
    <v-container>
      <v-form @submit.prevent="submitNote">
        <v-text-field
          v-model="note.title"
          label="Title"
          required
        ></v-text-field>
        <v-textarea
          v-model="note.description"
          label="Description"
          required
        ></v-textarea>
        <v-btn type="submit" color="primary"
          >{{ isEditing ? "Update" : "Create" }} Note</v-btn
        >
      </v-form>
    </v-container>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNoteStore } from "../store/notesStore"; // Importing the store

const note = ref({
  title: "",
  description: "",
});

const isEditing = ref(false);
const route = useRoute();
const router = useRouter();

const noteStore = useNoteStore(); // Accessing the note store

// Submit function for creating or updating a note
const submitNote = async () => {
  if (isEditing.value) {
    // Update the note using the store's action
    try {
      await noteStore.updateNote(route.params.id, note.value);
      router.push("/notes");
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  } else {
    // Create the note using the store's action
    try {
      await noteStore.createNote(note.value);
      router.push("/notes");
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  }
};

// Fetch note data when editing an existing note
onMounted(() => {
  if (route.params.id) {
    isEditing.value = true;
    noteStore
      .fetchNote(route.params.id) // Using the store to fetch the note
      .then(() => {
        note.value = noteStore.note; // Sync the store's note data with the component's note ref
      })
      .catch((error) => console.error("Error fetching note:", error));
  }
});
</script>

<style scoped>
.v-form {
  max-width: 600px;
  margin: auto;
}
</style>
