<template>
  <div class="language-switcher flex items-center gap-2">
    <button
      @click="switchLanguage('en')"
      :class="[
        'px-3 py-1.5 rounded-lg font-medium transition-all duration-300',
        locale === 'en'
          ? 'bg-amber-900 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
      ]"
    >
      EN
    </button>
    <button
      @click="switchLanguage('ar')"
      :class="[
        'px-3 py-1.5 rounded-lg font-medium transition-all duration-300',
        locale === 'ar'
          ? 'bg-amber-900 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
      ]"
    >
      AR
    </button>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

function switchLanguage(lang) {
  locale.value = lang;
}
</script>

<style scoped>
.language-switcher button {
  min-width: 50px;
}
</style>
