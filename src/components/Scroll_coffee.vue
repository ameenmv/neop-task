<template>
  <div :dir="isRTL ? 'rtl' : 'ltr'">
    <Swiper
      :key="locale"
      :modules="[Autoplay]"
      :slides-per-view="2"
      :space-between="10"
      :loop="true"
      :autoplay="{
        delay: 100,
        reverseDirection: isRTL,
      }"
      :speed="3000"
      :breakpoints="{
        640: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 25,
        },
        1280: {
          slidesPerView: 7,
          spaceBetween: 30,
        },
      }"
      class="w-full"
    >
      <SwiperSlide v-for="n in 10" :key="n">
        <div
          class="flex items-center justify-between w-full px-2 py-4 sm:px-4 sm:py-8"
        >
          <p class="text-lg sm:text-xl md:text-2xl font-bold">coffee</p>
          <img
            src="../assets/imgs/coffee2.png"
            class="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import "swiper/css";

const { locale } = useI18n();
const isRTL = computed(() => locale.value === "ar");
</script>

<style scoped>
.swiper-wrapper {
  transition-timing-function: linear !important;
}
</style>
