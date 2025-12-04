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
    class="w-full"
  >
    <SwiperSlide v-for="n in 10" :key="n">
      <div class="flex items-center justify-between w-full px-4 py-8">
        <p class="text-2xl font-bold">coffee</p>
        <img src="../assets/imgs/coffee2.png" class="w-7 h-7" />
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
</style>
