import { createVuetify } from "vuetify";
import "vuetify/styles";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

const vuetify = createVuetify({
  theme: { defaultTheme: "light" },
  icons: { defaultSet: "mdi", aliases, sets: { mdi } },
});

export default vuetify;
