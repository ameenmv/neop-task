<template>
  <Swiper
    :modules="[Autoplay]"
    :slides-per-view="8"
    :space-between="30"
    :loop="true"
    :autoplay="{
      delay: 0,
      disableOnInteraction: false,
      reverseDirection: true,
    }"
    :speed="3000"
    :breakpoints="{
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 5,
        spaceBetween: 25,
      },
      1024: {
        slidesPerView: 6,
        spaceBetween: 30,
      },
      1280: {
        slidesPerView: 7,
        spaceBetween: 30,
      },
      1536: {
        slidesPerView: 8,
        spaceBetween: 30,
      },
    }"
    class="w-full"
  >
    <SwiperSlide v-for="n in 10" :key="n">
      <div class="flex items-center justify-between w-full px-4 py-8">
        <p class="text-xl md:text-2xl font-bold">coffee</p>
        <img src="../assets/imgs/coffee2.png" class="w-5 h-5 md:w-7 md:h-7" />
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
</script>

<style scoped>
.swiper-wrapper {
  transition-timing-function: linear !important;
}

/* Extra responsive adjustments */
@media (max-width: 480px) {
  .swiper-slide {
    font-size: 0.875rem;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .swiper-slide {
    font-size: 1rem;
  }
}

@media (min-width: 769px) {
  .swiper-slide {
    font-size: 1.125rem;
  }
}
</style>
