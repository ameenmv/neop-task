<template>
  <nav
    class="px-4 sm:px-8 lg:px-17 py-6 bg-transparent z-50 fixed top-0 left-0 right-0 backdrop-blur-sm"
  >
    <div class="flex justify-between items-center max-w-[1400px] mx-auto">
      <!-- logo -->
      <img
        @click="goToHome"
        src="../assets/imgs/logo.png"
        alt="logo"
        class="w-10 sm:w-12 cursor-pointer hover:scale-110 transition-transform duration-300"
      />

      <div class="flex justify-center items-center gap-2.5">
        <!-- Language Switcher -->
        <LanguageSwitcher />

        <!-- shopping bag -->
        <div
          class="bg-[var(--blue)] w-8 h-8 sm:w-10 sm:h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-all duration-300 hover:shadow-lg"
        >
          <svg
            width="18px"
            height="18px"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
          >
            <path
              d="M256 144C256 108.7 284.7 80 320 80C355.3 80 384 108.7 384 144L384 192L256 192L256 144zM208 192L144 192C117.5 192 96 213.5 96 240L96 448C96 501 139 544 192 544L448 544C501 544 544 501 544 448L544 240C544 213.5 522.5 192 496 192L432 192L432 144C432 82.1 381.9 32 320 32C258.1 32 208 82.1 208 144L208 192zM232 240C245.3 240 256 250.7 256 264C256 277.3 245.3 288 232 288C218.7 288 208 277.3 208 264C208 250.7 218.7 240 232 240zM384 264C384 250.7 394.7 240 408 240C421.3 240 432 250.7 432 264C432 277.3 421.3 288 408 288C394.7 288 384 277.3 384 264z"
            />
          </svg>
        </div>

        <!-- menu icon -->
        <svg
          @click="toggleMenu"
          class="cursor-pointer hover:opacity-70 transition-opacity duration-300"
          width="24px"
          height="24px"
          fill="black"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
          />
        </svg>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide-fade">
      <div
        v-if="isMenuOpen"
        class="mobile-menu fixed top-[72px] left-0 right-0 bg-white shadow-lg z-40 overflow-hidden"
      >
        <ul class="flex flex-col p-6 gap-4">
          <li
            @click="handleMenuClick('/')"
            class="menu-item text-lg font-semibold text-gray-800 cursor-pointer hover:text-[var(--blue)] transition-colors duration-300 py-2 border-b border-gray-100"
          >
            {{ t("nav.home") }}
          </li>
          <li
            @click="handleMenuClick('/shop')"
            class="menu-item text-lg font-semibold text-gray-800 cursor-pointer hover:text-[var(--blue)] transition-colors duration-300 py-2 border-b border-gray-100"
          >
            {{ t("nav.shop") }}
          </li>
          <li
            class="menu-item text-lg font-semibold text-gray-800 cursor-pointer hover:text-[var(--blue)] transition-colors duration-300 py-2 border-b border-gray-100"
          >
            {{ t("nav.about") }}
          </li>
          <li
            class="menu-item text-lg font-semibold text-gray-800 cursor-pointer hover:text-[var(--blue)] transition-colors duration-300 py-2"
          >
            {{ t("nav.contact") }}
          </li>
        </ul>
      </div>
    </transition>

    <!-- Overlay -->
    <transition name="fade">
      <div
        v-if="isMenuOpen"
        @click="toggleMenu"
        class="fixed inset-0 bg-black bg-opacity-30 z-30 top-[72px]"
      ></div>
    </transition>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import LanguageSwitcher from "./LanguageSwitcher.vue";

const router = useRouter();
const { t } = useI18n();
const isMenuOpen = ref(false);

const goToHome = () => {
  router.push("/");
  isMenuOpen.value = false;
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleMenuClick = (path) => {
  router.push(path);
  isMenuOpen.value = false;
};
</script>

<style scoped>
/* Mobile Menu Animations */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

/* Overlay Fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* RTL Support */
[dir="rtl"] .mobile-menu {
  text-align: right;
}

[dir="rtl"] .menu-item {
  border-right: none;
  border-left: 3px solid transparent;
}

[dir="rtl"] .menu-item:hover {
  border-left-color: var(--blue);
}

/* Backdrop blur for navbar */
nav {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* Mobile menu styling */
.mobile-menu {
  max-height: calc(100vh - 72px);
  overflow-y: auto;
}

/* Scrollbar styling */
.mobile-menu::-webkit-scrollbar {
  width: 4px;
}

.mobile-menu::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.mobile-menu::-webkit-scrollbar-thumb {
  background: var(--blue);
  border-radius: 4px;
}

.mobile-menu::-webkit-scrollbar-thumb:hover {
  background: #003558;
}

/* Menu item hover effect */
.menu-item {
  position: relative;
}

.menu-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 3px;
  background: var(--blue);
  transition: width 0.3s ease;
}

[dir="rtl"] .menu-item::before {
  left: auto;
  right: 0;
}

.menu-item:hover::before {
  width: 30px;
}

[dir="rtl"] .menu-item:hover::before {
  width: 30px;
}
</style>
