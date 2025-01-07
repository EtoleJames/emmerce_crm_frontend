import { createApp } from "vue";
import App from "./App.vue";
import "vuetify/styles"; // Import Vuetify styles
import "@mdi/font/css/materialdesignicons.css";
import router from "./router";
import { createPinia } from "pinia";
import vuetify from "./plugins/vuetify";

const app = createApp(App);

app.use(vuetify).use(createPinia()).use(router).mount("#app");
