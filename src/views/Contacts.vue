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
      <v-row v-if="contactStore.contacts.length">
        <v-col>
          <v-data-table
            :headers="tableHeaders"
            :items="contactStore.contacts"
            :items-per-page="itemsPerPage"
            v-model:page="page"
            :loading="contactStore.loading"
            :server-items-length="contactStore.totalItems"
            @update:page="fetchContacts"
            :rows-per-page-items="[5, 10, 15]"
            class="elevation-1"
          >
            <!-- Slot for displaying actions -->
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
          <div class="empty-contacts">
            <h2>No Contacts Found</h2>
            <p>
              Looks like you don't have any contacts yet.
              <router-link to="/dashboard">Go back to the dashboard</router-link
              >.
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AppLayout from "../layouts/AppLayout.vue";
import { useContactsStore } from "../store/contactsStore";

const router = useRouter();
const contactStore = useContactsStore();

const page = ref(1);
const itemsPerPage = ref(5);

const tableHeaders = [
  { text: "Name", align: "start", key: "name" },
  { text: "Email", align: "start", key: "email" },
  { text: "Phone", align: "start", key: "phone" },
  { text: "Actions", align: "center" },
];

// Fetch contacts when the page changes
const fetchContacts = () => {
  contactStore.fetchContacts(page.value, itemsPerPage.value);
};

// View contact details
const viewContact = (id) => {
  router.push(`/contacts/${id}`);
};

// Navigate to the Create Contact page
const navigateToCreateContact = () => {
  router.push("/contacts/create");
};

// Navigate to the Edit Contact page
const navigateToEditContact = (id) => {
  router.push(`/contacts/edit/${id}`);
};

// Delete a contact
const deleteContact = async (id) => {
  await contactStore.deleteContact(id);
  fetchContacts(); // Refresh the list after deletion
};

// Fetch contacts on component mount
onMounted(() => {
  fetchContacts();
});
</script>

<style scoped>
.empty-contacts {
  text-align: center;
  margin-top: 50px;
}

.empty-contacts h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.empty-contacts p {
  font-size: 18px;
}
</style>
