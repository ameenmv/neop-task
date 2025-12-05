<template>
  <button
    @click="toggleLanguage"
    class="language-btn flex items-center justify-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white border-2 border-gray-200 hover:border-[var(--blue)] transition-all duration-300 hover:shadow-md"
  >
    <svg
      class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
      />
    </svg>
    <span class="font-bold text-sm sm:text-base text-gray-700">
      {{ currentLocale === "en" ? "ع" : "EN" }}
    </span>
  </button>
</template>

<script setup>
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const currentLocale = computed(() => locale.value);

const toggleLanguage = () => {
  const newLocale = locale.value === "en" ? "ar" : "en";
  locale.value = newLocale;

  // Save to localStorage
  localStorage.setItem("preferred-language", newLocale);
};

// Watch for locale changes
watch(
  locale,
  (newLocale) => {
    const dir = newLocale === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", newLocale);
  },
  { immediate: true }
);
</script>

<style scoped>
.language-btn {
  transition: all 0.3s ease;
}

.language-btn:hover {
  transform: translateY(-2px);
}

.language-btn:active {
  transform: translateY(0);
}

/* RTL adjustments */
[dir="rtl"] .language-btn {
  flex-direction: row-reverse;
}
</style>
