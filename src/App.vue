<template>
  <div :dir="currentDir" :lang="currentLocale" class="app-container">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const currentLocale = computed(() => locale.value);
const currentDir = computed(() => (locale.value === "ar" ? "rtl" : "ltr"));

// Watch for locale changes and update document
watch(
  locale,
  (newLocale) => {
    const dir = newLocale === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", newLocale);

    // Store preference
    localStorage.setItem("preferred-language", newLocale);
  },
  { immediate: true }
);

// Load saved preference on mount
const savedLocale = localStorage.getItem("preferred-language");
if (savedLocale && (savedLocale === "en" || savedLocale === "ar")) {
  locale.value = savedLocale;
}
</script>

<style>
.app-container {
  min-height: 100vh;
  transition: direction 0.3s ease;
}

/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

[dir="rtl"] .page-enter-from {
  transform: translateX(-20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

[dir="rtl"] .page-leave-to {
  transform: translateX(20px);
}
</style>
