import { createApp } from "vue";
import App from "./App.vue";
import "vuetify/styles"; // Import Vuetify styles
import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import router from "./router";
import { createPinia } from "pinia";

const vuetify = createVuetify();
const app = createApp(App);

app.use(vuetify).use(createPinia()).use(router).mount("#app");
