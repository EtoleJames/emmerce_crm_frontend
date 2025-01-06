import { createVuetify } from "vuetify";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

const vuetify = createVuetify({
  theme: { defaultTheme: "light" },
  icons: { defaultSet: "mdi", aliases, sets: { mdi } },
  components,
  directives,
});

export default vuetify;
