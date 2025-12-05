<template>
  <div>
    <Landing />
    <Scroll_coffee />
    <Categories />
    <About />
    <Footer />
    <!-- fixed image -->
    <img
      class="fixed left-0 bottom-0 z-[-1]"
      src="../assets/imgs/fixed.png"
      alt=""
    />
  </div>
</template>

<script setup>
import About from "../components/About.vue";
import Categories from "../components/Categories.vue";
import Footer from "../components/Footer.vue";
import Landing from "../components/Landing.vue";
import Scroll_coffee from "../components/Scroll_coffee.vue";
</script>

<style lang="scss" scoped></style>
