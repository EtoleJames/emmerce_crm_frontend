<template>
  <AppLayout>
    <v-container>
      <h1>{{ isEditMode ? "Edit Contact" : "Create Contact" }}</h1>
      <v-form ref="contactForm" v-model="formValid" lazy-validation>
        <v-text-field
          v-model="form.name"
          label="Name"
          :rules="[required]"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.email"
          label="Email"
          :rules="[required, emailRule]"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.phone"
          label="Phone"
          :rules="[required, phoneRule]"
          required
        ></v-text-field>

        <!-- Lead Dropdown (v-select) -->
        <v-select
          v-model="form.lead"
          :items="leadsData.value"
          item-text="name"
          item-value="id"
          label="Select Lead"
          :rules="[required]"
          required
          :loading="leadsStore.loading"
          :items-loaded="leadsData.value.length > 0"
          :no-data-text="
            leadsStore.error ? 'Failed to load leads' : 'No leads available'
          "
        ></v-select>

        <v-btn color="primary" @click="submitForm" :disabled="!formValid">
          {{ isEditMode ? "Update" : "Create" }} Contact
        </v-btn>
        <v-btn color="secondary" @click="cancel">Cancel</v-btn>
      </v-form>
    </v-container>
  </AppLayout>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import AppLayout from "../layouts/AppLayout.vue";
import { useContactsStore } from "../store/contactsStore";
import { useLeadsStore } from "../store/LeadsStore";
import { useAuthStore } from "../store/authStore";

// Initialize stores and router
const contactsStore = useContactsStore();
const leadsStore = useLeadsStore();
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

// Reactive variables
const isEditMode = ref(false); // Edit or Create mode
const formValid = ref(false); // Form validation state

// Initialize leadsData as an empty array
const leadsData = ref([]); // Start with an empty array

// Validation rules
const required = (value) => !!value || "This field is required.";
const emailRule = (value) =>
  /^\S+@\S+\.\S+$/.test(value) || "Enter a valid email.";
const phoneRule = (value) =>
  /^\d+$/.test(value) || "Phone number must be numeric.";

// Reactive form data
const form = reactive({
  name: "",
  email: "",
  phone: "",
  lead: null, // Store the selected lead ID
});

// Fetch user info from auth store
const currentUserId = authStore.current_user; // Assuming user object has 'id'

// Handle form submission for create or edit
async function submitForm() {
  const contactData = { ...form, owner: currentUserId };

  try {
    if (isEditMode.value) {
      await contactsStore.updateContact(route.params.id, contactData);
    } else {
      await contactsStore.createContact(contactData);
    }
    router.push("/contacts"); // Redirect after successful operation
  } catch (error) {
    console.error("Failed to save contact:", error);
    // Handle errors (e.g., show a notification)
  }
}

// Cancel button handler
function cancel() {
  router.push("/contacts");
}

// Fetch contact if editing
async function fetchContact(id) {
  try {
    const data = await contactsStore.fetchContactById(id);
    Object.assign(form, data); // Populate form with data
  } catch (error) {
    console.error("Failed to fetch contact:", error);
    router.push("/contacts"); // Redirect if error occurs
  }
}

// Initialize the component
onMounted(async () => {
  // Fetch all leads from the store
  await leadsStore.fetchAllLeads();

  // Assign fetched leads to leadsData
  leadsData.value = leadsStore.leads; // Ensure leadsData is populated

  if (route.params.id) {
    isEditMode.value = true;
    fetchContact(route.params.id);
  } else {
    form.owner = currentUserId; // Assign current user as owner when creating
  }
});
</script>

<style scoped>
/* Custom styles for form layout */
</style>
