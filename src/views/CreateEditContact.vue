<template>
  <AppLayout>
    <v-container>
      <v-form @submit.prevent="submitContact">
        <v-text-field
          v-model="contact.name"
          label="Name"
          required
        ></v-text-field>
        <v-text-field
          v-model="contact.email"
          label="Email"
          required
        ></v-text-field>
        <v-text-field
          v-model="contact.phone"
          label="Phone"
          required
        ></v-text-field>
        <v-btn type="submit" color="primary"
          >{{ isEditing ? "Update" : "Create" }} Contact</v-btn
        >
      </v-form>
    </v-container>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useContactsStore } from "../store/contactsStore"; // Import contacts store

// Initialize store and router
const contactsStore = useContactsStore();
const route = useRoute();
const router = useRouter();

// Reactive states
const contact = ref({
  name: "",
  email: "",
  phone: "",
});
const isEditing = ref(false);

// Submit contact function
const submitContact = async () => {
  if (isEditing.value) {
    try {
      await contactsStore.updateContact(route.params.id, contact.value);
      router.push("/contacts");
    } catch (error) {
      console.error("Failed to update contact:", error);
    }
  } else {
    try {
      await contactsStore.createContact(contact.value);
      router.push("/contacts");
    } catch (error) {
      console.error("Failed to create contact:", error);
    }
  }
};

// Load contact if editing
onMounted(async () => {
  if (route.params.id) {
    isEditing.value = true;
    try {
      const data = await contactsStore.fetchContactById(route.params.id);
      contact.value = data;
    } catch (error) {
      console.error("Error fetching contact:", error);
    }
  }
});
</script>

<style scoped>
.v-form {
  max-width: 600px;
  margin: auto;
}
</style>
