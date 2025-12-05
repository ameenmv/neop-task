<template>
  <div>
    <Landing />
    <Scroll_coffee />
    <Categories />
    <About />
    <Footer />
    <!-- fixed image -->
    <img class="fixed left-0 bottom-0 z-[-1]" src="../assets/imgs/fixed.png" alt="">
  </div>
</template>

<script setup>
import Landing from '../components/Landing.vue';
import Scroll_coffee from '../components/Scroll_coffee.vue';
import Categories from '../components/Categories.vue';
import About from '../components/About.vue';
import Footer from '../components/Footer.vue';
</script>

<style lang="scss" scoped></style>
