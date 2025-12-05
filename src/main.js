import { createPinia } from "pinia";
import { createApp, watch } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import router from "./Router";
import "./style.css";

// Import translation files
import ar from "./locales/ar.json";
import en from "./locales/en.json";

const messages = {
  en,
  ar,
};

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages,
});

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(i18n);

// keep document dir in sync with locale
watch(
  () => i18n.global.locale.value,
  (locale) => {
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  },
  { immediate: true }
);

app.mount("#app");
