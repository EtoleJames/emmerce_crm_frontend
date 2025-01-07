<template>
  <AppLayout>
    <v-container>
      <!-- Add New Contact Button (aligned to the right) -->
      <v-row>
        <v-col class="text-right">
          <v-btn color="primary" @click="navigateToCreateContact">
            Add New Contact
          </v-btn>
        </v-col>
      </v-row>

      <!-- Contacts Table -->
      <v-row v-if="contactsStore.contacts.length">
        <v-col>
          <v-data-table
            :headers="tableHeaders"
            :items="contactsStore.contacts"
            :items-per-page="contactsStore.itemsPerPage"
            v-model:page="contactsStore.page"
            :loading="contactsStore.loading"
            :server-items-length="contactsStore.totalItems"
            @update:page="contactsStore.setPage"
            :rows-per-page-items="[5, 10, 15]"
            class="elevation-1"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn color="primary" @click="viewContact(item.id)">View</v-btn>
              <v-btn color="secondary" @click="navigateToEditContact(item.id)">
                Edit
              </v-btn>
              <v-btn color="red" @click="deleteContact(item.id)">Delete</v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

      <!-- Empty Contacts Message -->
      <v-row v-else>
        <v-col>
          <div class="empty-message">
            <h2>No Contacts Found</h2>
            <p>No contacts have been added yet.</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useContactsStore } from "../store/contactsStore"; // Import store
import AppLayout from "../layouts/AppLayout.vue"; // Ensure AppLayout is imported

const router = useRouter();
const contactsStore = useContactsStore(); // Initialize store

// Reactive state bindings
const page = ref(1);
const itemsPerPage = ref(5);

// Computed properties
const contacts = computed(() => contactsStore.contacts);
const totalItems = computed(() => contactsStore.totalItems);
const loading = computed(() => contactsStore.loading);

// Table headers
const tableHeaders = [
  { text: "Name", align: "start", key: "name" },
  { text: "Email", align: "start", key: "email" },
  { text: "Phone", align: "start", key: "phone" },
  { text: "Actions", align: "center" },
];

// Fetch contacts
const fetchContacts = async () => {
  await contactsStore.fetchContacts(page.value, itemsPerPage.value);
};

// Navigation functions
const viewContact = (id) => {
  router.push(`/contacts/${id}`);
};

const navigateToCreateContact = () => {
  router.push("/contacts/create");
};

const navigateToEditContact = (id) => {
  router.push(`/contacts/edit/${id}`);
};

// Delete contact
const deleteContact = async (id) => {
  await contactsStore.deleteContact(id);
  fetchContacts(); // Refresh contacts
};

// Watch for page changes and fetch data
watch(page, () => fetchContacts());

// Initial fetch on mount
onMounted(() => {
  fetchContacts();
});
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
