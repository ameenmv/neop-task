<template>
  <section class="lg:h-screen relative overflow-hidden">
    <Navbar />
    <div
      class="h-full w-full lg:ps-36 flex lg:flex-row flex-col justify-between items-center pb-20"
    >
      <!-- text -->
      <div class="flex flex-col gap-5 lg:w-1/2 lg:mt-0 mt-10 lg:mb-10">
        <!-- title -->
        <p
          class="landing-title lg:text-8xl lg:max-w-[400px] max-w-[300px] text-5xl leading-[102%] font-bold text-[var(--blue)] tracking-[8px]"
        >
          {{ $t("landing.title") }}
        </p>
        <!-- desc -->
        <p class="landing-desc max-w-64 text-[#292625] lg:text-base text-sm">
          {{ $t("landing.description") }}
        </p>
        <!-- button & icon -->
        <div
          class="landing-buttons flex justify-center items-center gap-3 w-fit"
        >
          <button
            class="lg:py-3 py-2 lg:px-7 px-5 rounded-2xl border border-[var(--secondary)] text-[var(--secondary)] lg:text-base text-sm font-medium flex justify-center items-center gap-4"
          >
            {{ $t("landing.shopButton") }}
            <svg
              class="lg:w-4 w-3 lg:h-4 h-3 rotate-45 rtl:scale-x-[-1]"
              fill="var(--secondary)"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
              />
            </svg>
          </button>
          <div
            class="bg-[var(--blue)] lg:w-12 w-10 lg:h-12 h-10 rounded-full flex justify-center items-center cursor-pointer"
          >
            <svg
              class="lg:w-7 lg:h-7 w-5 h=5"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
            >
              <path
                d="M256 144C256 108.7 284.7 80 320 80C355.3 80 384 108.7 384 144L384 192L256 192L256 144zM208 192L144 192C117.5 192 96 213.5 96 240L96 448C96 501 139 544 192 544L448 544C501 544 544 501 544 448L544 240C544 213.5 522.5 192 496 192L432 192L432 144C432 82.1 381.9 32 320 32C258.1 32 208 82.1 208 144L208 192zM232 240C245.3 240 256 250.7 256 264C256 277.3 245.3 288 232 288C218.7 288 208 277.3 208 264C208 250.7 218.7 240 232 240zM384 264C384 250.7 394.7 240 408 240C421.3 240 432 250.7 432 264C432 277.3 421.3 288 408 288C394.7 288 384 277.3 384 264z"
              />
            </svg>
          </div>
        </div>
      </div>
      <!-- swiper -->
      <div
        class="product-slider-container lg:!w-1/2"
        :dir="isRTL ? 'rtl' : 'ltr'"
      >
        <Swiper
          :key="locale"
          :modules="modules"
          centeredSlides="false"
          :slides-per-view="2"
          :space-between="0"
          speed="1000"
          grab-cursor="true"
          :navigation="{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }"
          class="mySwiper"
        >
          <SwiperSlide
            v-for="product in products"
            :key="product.id"
            class="slide"
          >
            <div class="slide-content">
              <div class="design-container">
                <div class="bg-shape"></div>
                <img
                  :src="product.img"
                  :alt="product.name"
                  class="coffee-img"
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div class="nav-controls">
          <button class="custom-prev" aria-label="Previous slide">←</button>
          <button class="custom-next" aria-label="Next slide">→</button>
        </div>
      </div>
    </div>

    <!-- mask img -->
    <img
      class="mask-img absolute top-0 w-[50%] z-[-1] pointer-events-none lg:block hidden origin-center"
      :class="isRTL ? '!scale-x-[-1] left-0' : 'right-0'"
      :src="mask"
    />
  </section>
</template>

<script setup>
import gsap from "gsap";
import { computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import Navbar from "../components/Navbar.vue";

import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

const modules = [Navigation, Pagination, EffectCoverflow, Autoplay];
const { locale } = useI18n();

// Compute RTL direction based on locale
const isRTL = computed(() => locale.value === "ar");

import {
  default as bag1,
  default as bag2,
  default as bag3,
} from "../assets/imgs/coffee.png";
import mask from "../assets/imgs/mask.png";

const products = [{ img: bag1 }, { img: bag2 }, { img: bag3 }];

// GSAP Animations
onMounted(() => {
  // Animate title
  gsap.from(".landing-title", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
    delay: 0.2,
  });

  // Animate description
  gsap.from(".landing-desc", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out",
    delay: 0.5,
  });

  // Animate buttons
  gsap.from(".landing-buttons", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power2.out",
    delay: 0.8,
  });

  // Animate slider with stagger effect
  gsap.from(".product-slider-container", {
    opacity: 0,
    x: 100,
    duration: 1,
    ease: "power3.out",
    delay: 0.6,
  });

  // Animate mask image
  gsap.from(".mask-img", {
    opacity: 0,
    scaleY: 1.1,
    duration: 1.2,
    ease: "power2.out",
    delay: 0.3,
  });
});
</script>

<style lang="scss" scoped>
.product-slider-container {
  position: relative;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
}

.swiper-slide {
  width: 520px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  transition: transform 1000ms ease, opacity 300ms ease;
}

.swiper-slide:not(.swiper-slide-active) {
  opacity: 0.75;
  transform: scale(0.7);
  z-index: 1;
}

.swiper-slide-active {
  opacity: 1;
  transform: scale(1);
  z-index: 10;
}

.slide-content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.design-container {
  width: 100%;
  height: 560px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: visible;
}

.bg-shape {
  position: absolute;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  z-index: 0;
  transition: all 1000ms cubic-bezier(0.2, 0.8, 0.2, 1);
  background: linear-gradient(90deg, var(--secondary) 0%, var(--primary) 100%);
  transform: translateY(0);
  pointer-events: none;
}
@media (max-width: 1024px) {
  .bg-shape {
    width: 150px;
    height: 150px;
  }
}

.swiper-slide-active .bg-shape {
  width: 500px;
  height: 500px;
  background: linear-gradient(90deg, var(--blue) 0%, #1e71a6 100%);
  transform: translateY(-8px);
  z-index: 1;
}
@media (max-width: 1024px) {
  .swiper-slide-active .bg-shape {
    width: 300px;
    height: 300px;
  }
}

.coffee-img {
  width: 250px;
  max-width: none;
  height: auto;
  object-fit: contain;
  z-index: 2;
  transition: transform 1000ms cubic-bezier(0.2, 0.8, 0.2, 1),
    opacity 300ms ease;
  transform: translateY(0);
  pointer-events: none;
}
.swiper-slide-active .coffee-img {
  width: 250px;
}

.swiper-slide:not(.swiper-slide-active) .coffee-img {
  transform: scale(0.9);
  opacity: 0.9;
}

.swiper-slide-active .coffee-img {
  transform: scale(1.03) translateY(-6px);
  opacity: 1;
  width: 600px;
}
@media (max-width: 1024px) {
  .swiper-slide-active .coffee-img {
    width: 350px;
  }
}

.nav-controls {
  position: absolute;
  top: 10%;
  right: -35px;
  width: 230px;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  z-index: 30;
  padding: 0 50px;
  pointer-events: none;
}
html:dir(rtl) .nav-controls {
  right: auto;
  left: -35px;
}
@media (max-width: 1280px) {
  html:dir(rtl) .nav-controls {
    right: auto;
    left: 0;
  }
}
@media (max-width: 1024px) {
  .nav-controls {
    top: 12%;
    width: 100%;
    right: 0;
  }
}

.custom-prev,
.custom-next {
  pointer-events: auto;
  background: var(--blue);
  color: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.custom-prev:hover,
.custom-next:hover {
  background: var(--primary);
  transform: scale(1.1);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.custom-prev.swiper-button-disabled,
.custom-next.swiper-button-disabled {
  opacity: 0.8;
  color: #3b2f2f;
  background: transparent !important;
  border: 1px solid #3b2f2f;
}

.landing-buttons button {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.landing-buttons button:hover {
  background: var(--secondary);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.landing-buttons button:hover svg {
  fill: white;
}

.landing-buttons button:hover svg {
  transform: rotate(45deg) translate(3px, -3px);
  transition: transform 0.3s ease;
}

.landing-buttons button svg {
  transition: transform 0.3s ease;
}

.landing-buttons > div {
  transition: all 0.3s ease;
}

.landing-buttons > div:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 6px 16px rgba(0, 70, 118, 0.3);
}

.landing-buttons > div:hover svg {
  animation: swing 0.6s ease;
}

@keyframes swing {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(10deg);
  }
}
</style>
