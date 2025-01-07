<template>
  <AppLayout>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>{{ contact?.name }}</v-card-title>
            <v-card-subtitle>{{ contact?.email }}</v-card-subtitle>
            <v-card-text>
              <p>Phone: {{ contact?.phone }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </AppLayout>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useContactsStore } from "../store/contactsStore"; // Import Contacts Store

const route = useRoute();
const contactsStore = useContactsStore(); // Initialize store

// Computed property to get contact details
const contact = computed(() =>
  contactsStore.contacts.find((c) => c.id === parseInt(route.params.id))
);

// Fetch contact details on mount
onMounted(() => {
  contactsStore.fetchContact(route.params.id); // Uses store action to fetch contact
});
</script>

<style scoped>
.v-card {
  margin-top: 20px;
}
</style>
