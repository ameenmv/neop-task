<template>
  <section class="py-8">
    <div class="flex justify-center items-center flex-col gap-2">
      <p class="text-lg text-[#3B2F2F]">Our products</p>
      <h2 class="text-[32px] font-bold text-[#3B2F2F]">Special to Try</h2>
      <div class="flex justify-center items-center gap-12">
        <p
          v-for="(category, index) in categories"
          :key="index"
          @click="activeIndex = index"
          :class="{ active: activeIndex === index }"
          class="font-medium text-xl cursor-pointer text"
        >
          {{ category }}
        </p>
      </div>
      <div class="mt-12 overflow-hidden relative w-full">
        <TransitionGroup
          name="product"
          tag="div"
          class="flex gap-7 justify-center"
        >
          <div
            v-for="product in displayedProducts"
            :key="product.id"
            class="w-64 p-4 border rounded-lg"
          >
            <img
              :src="product.image"
              :alt="product.title"
              class="w-full h-48 object-contain"
            />
            <h3 class="mt-4 font-semibold text-lg truncate">
              {{ product.title }}
            </h3>
            <div v-if="product.rating" class="flex items-center gap-2 mt-2">
              <div class="flex gap-1">
                <svg
                  v-for="star in 5"
                  :key="star"
                  class="w-5 h-5"
                  :class="
                    star <= Math.round(product.rating.rate)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
              <span class="text-sm text-gray-600">
                {{ product.rating.rate }} ({{ product.rating.count }})
              </span>
            </div>
            <p class="text-gray-600 mt-2">${{ product.price }}</p>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const categories = ref([
  "All categories",
  "Special offers",
  "Best seller",
  "Coffee",
  "Coffee equipment",
]);
const activeIndex = ref(0);
const products = ref([]);

const displayedProducts = computed(() => {
  if (activeIndex.value === 0) {
    // Show first 4 products for "All categories"
    return products.value.slice(0, 4);
  } else {
    // Show 4 products based on the category index
    const start = activeIndex.value * 4;
    const end = start + 4;
    return products.value.slice(start, end);
  }
});

onMounted(() => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      products.value = data;
    });
});
</script>

<style lang="scss" scoped>
.text {
  color: #7c6a6a;
  transition: all 0.3s ease;
}
.active {
  color: #004876;
  transition: all 0.3s ease;
  position: relative;
}
.active::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #004876;
  border-radius: 2px;
}

.product-enter-active {
  transition: all 0.4s ease-out;
}

.product-leave-active {
  transition: all 0.4s ease-in;
  position: absolute;
}

.product-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.product-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.product-move {
  transition: transform 0.4s ease;
}
</style>
