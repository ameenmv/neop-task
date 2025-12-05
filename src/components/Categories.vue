<template>
  <section class="py-8">
    <div class="flex justify-center items-center flex-col gap-1">
      <p class="lg:text-lg text-base text-[#3B2F2F]">Our products</p>
      <h2 class="lg:text-[32px] text-[26px] font-bold text-[#3B2F2F]">
        Special to Try
      </h2>
      <div class="flex justify-center items-center lg:gap-12 gap-6 flex-wrap">
        <p
          v-for="(category, index) in categories"
          :key="index"
          @click="activeIndex = index"
          :class="{ active: activeIndex === index }"
          class="font-medium lg:text-xl text-base cursor-pointer text mt-2"
        >
          {{ category }}
        </p>
      </div>
      <div class="mt-12 overflow-hidden relative w-full">
        <TransitionGroup
          name="product"
          tag="div"
          class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-7 justify-items-center text-center"
        >
          <div
            v-for="product in displayedProducts"
            :key="product.id"
            class="w-64 p-4 rounded-lg cursor-pointer"
            @click="openProduct(product)"
          >
            <div class="relative w-full flex justify-center items-center h-48">
              <img
                :src="product.image"
                :alt="product.title"
                class="rounded-[50px] w-[92%] h-[95%] object-contain bg-white"
              />
              <div
                class="absolute left-0 top-0 w-full h-full rounded-4xl z-[-2] bg-[#004876]"
              ></div>
              <div
                class="absolute left-0 top-0 rounded-[50px] w-[95%] h-[94%] z-[-1] bg-[#6F4336]"
              ></div>
            </div>
            <h3 class="mt-4 font-medium  lg:text-[22px] text-[20px] line-clamp-1">
              {{ product.title }}
            </h3>
            <p v-if="product.category" class="text-[#8B8BA5] lg:text-lg text-sm">{{ product.category }}</p>
             <div v-if="product.rating" class="flex justify-center items-center gap-2 mt-2">
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
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "../stores/product";

const router = useRouter();
const store = useProductStore();

const categories = ref([
  "All categories",
  "Special offers",
  "Best seller",
  "Coffee",
  "Coffee equipment",
]);
const activeIndex = ref(0);

const displayedProducts = computed(() => {
  const products = store.products;
  if (!products || !products.length) return [];
  if (activeIndex.value === 0) {
    return products.slice(0, 4);
  } else {
    const start = activeIndex.value * 4;
    const end = start + 4;
    return products.slice(start, end);
  }
});

onMounted(async () => {
  await store.fetchProducts();
  console.log("Products fetched:", store.products);
});

function openProduct(product) {
  router.push({ name: "ProductDetails", params: { id: product.id } });
}
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
