import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import Leads from "../views/Leads.vue";
import LeadDetails from "../views/LeadDetails.vue";
import CreateEditLead from "../views/CreateEditLead.vue";
import Contacts from "../views/Contacts.vue";
import ContactDetails from "../views/ContactDetails.vue";
import CreateEditContact from "../views/CreateEditContact.vue";
import Notes from "../views/Notes.vue";
import NoteDetails from "../views/NoteDetails.vue";
import CreateEditNote from "../views/CreateEditNote.vue";
import Reminders from "../views/Reminders.vue";
import ReminderDetails from "../views/ReminderDetails.vue";
import CreateEditReminder from "../views/CreateEditReminder.vue";
import { useAuthStore } from "../store/authStore";

const routes = [
  { path: "/", component: Login, meta: { requiresAuth: false } },
  { path: "/login", component: Login, meta: { requiresAuth: false } },
  { path: "/register", component: Register, meta: { requiresAuth: false } },
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/leads", component: Leads, meta: { requiresAuth: true } },
  { path: "/leads/:id", component: LeadDetails, meta: { requiresAuth: true } },
  {
    path: "/leads/create",
    component: CreateEditLead,
    meta: { requiresAuth: true },
  },
  {
    path: "/leads/edit/:id",
    component: CreateEditLead,
    meta: { requiresAuth: true },
    props: true,
  },
  { path: "/contacts", component: Contacts, meta: { requiresAuth: true } },
  {
    path: "/contacts/:id",
    component: ContactDetails,
    meta: { requiresAuth: true },
  },
  {
    path: "/contacts/create",
    component: CreateEditContact,
    meta: { requiresAuth: true },
  },
  {
    path: "/contacts/edit/:id",
    component: CreateEditContact,
    meta: { requiresAuth: true },
    props: true,
  },
  { path: "/notes", component: Notes, meta: { requiresAuth: true } },
  { path: "/notes/:id", component: NoteDetails, meta: { requiresAuth: true } },
  {
    path: "/notes/create",
    component: CreateEditNote,
    meta: { requiresAuth: true },
  },
  {
    path: "/notes/edit/:id",
    component: CreateEditNote,
    meta: { requiresAuth: true },
    props: true,
  },
  { path: "/reminders", component: Reminders, meta: { requiresAuth: true } },
  {
    path: "/reminders/:id",
    component: ReminderDetails,
    meta: { requiresAuth: true },
  },
  {
    path: "/reminders/create",
    component: CreateEditReminder,
    meta: { requiresAuth: true },
  },
  {
    path: "/reminders/edit/:id",
    component: CreateEditReminder,
    meta: { requiresAuth: true },
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
