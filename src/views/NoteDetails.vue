<template>
  <AppLayout>
    <v-container>
      <v-row v-if="notesStore.loading">
        <v-col cols="12" class="d-flex justify-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col>
          <v-card>
            <v-card-title>{{ notesStore.note.title }}</v-card-title>
            <v-card-subtitle>{{ notesStore.note.created }}</v-card-subtitle>
            <v-card-text>{{ notesStore.note.description }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </AppLayout>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useNoteStore } from "../store/notesStore"; // Import the notes store

const route = useRoute();

// Access the notes store
const notesStore = useNoteStore();

// Fetch the note details on component mount
onMounted(() => {
  const noteId = route.params.id;
  notesStore.fetchNote(noteId);
});
</script>

<style scoped>
.v-card {
  margin-top: 20px;
}
</style>
