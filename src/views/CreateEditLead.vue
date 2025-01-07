<template>
  <AppLayout>
    <v-container>
      <h1>{{ isEditMode ? "Edit Lead" : "Create Lead" }}</h1>
      <v-form ref="leadForm" v-model="formValid" lazy-validation>
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
        <v-select
          v-model="form.status"
          :items="statuses"
          label="Status"
          :rules="[required]"
          required
        ></v-select>
        <v-btn color="primary" @click="submitForm" :disabled="!formValid">
          {{ isEditMode ? "Update" : "Create" }} Lead
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
import { useLeadsStore } from "../store/LeadsStore";
import { useAuthStore } from "../store/authStore";

// Initialize stores and router
const leadsStore = useLeadsStore();
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

// Reactive variables
const isEditMode = ref(false); // Edit or Create mode
const formValid = ref(false); // Form validation state
const statuses = ["New", "In Progress", "Completed"]; // Status options

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
  status: "",
  owner: null,
});

// Fetch user info from auth store
const currentUserId = authStore.current_user; // Assuming user object has 'id'

// Handle form submission for create or edit
async function submitForm() {
  const leadData = { ...form, owner: currentUserId };

  try {
    if (isEditMode.value) {
      await leadsStore.updateLead(route.params.id, leadData);
    } else {
      await leadsStore.createLead(leadData);
    }
    router.push("/leads"); // Redirect after successful operation
  } catch (error) {
    console.error("Failed to save lead:", error);
    // Handle errors (e.g., show a notification)
  }
}

// Cancel button handler
function cancel() {
  router.push("/leads");
}

// Fetch lead if editing
async function fetchLead(id) {
  try {
    const data = await leadsStore.fetchLeadById(id);
    Object.assign(form, data); // Populate form with data
  } catch (error) {
    console.error("Failed to fetch lead:", error);
    router.push("/leads"); // Redirect if error occurs
  }
}

// Initialize the component
onMounted(() => {
  if (route.params.id) {
    isEditMode.value = true;
    fetchLead(route.params.id);
  } else {
    form.owner = currentUserId; // Assign current user as owner when creating
  }
});
</script>

<style scoped>
/* Custom styles for form layout */
</style>
