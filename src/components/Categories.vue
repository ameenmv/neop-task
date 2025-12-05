<template>
  <section class="py-8 px-4">
    <div class="flex justify-center items-center flex-col gap-2">
      <p class="text-base md:text-lg text-[#3B2F2F]">
        {{ t("products.ourProducts") }}
      </p>
      <h2 class="text-2xl md:text-[32px] font-bold text-[#3B2F2F]">
        {{ t("products.specialToTry") }}
      </h2>
      <div
        class="flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-12 mt-4"
      >
        <p
          v-for="(category, index) in translatedCategories"
          :key="index"
          @click="activeIndex = index"
          :class="{ active: activeIndex === index }"
          class="font-medium text-sm md:text-lg lg:text-xl cursor-pointer text"
        >
          {{ category }}
        </p>
      </div>
      <div class="mt-8 md:mt-12 overflow-hidden relative w-full">
        <div v-if="productStore.isLoading" class="text-center py-8">
          {{ t("products.loading") }}
        </div>
        <div
          v-else-if="productStore.error"
          class="text-center py-8 text-red-500"
        >
          {{ t("products.error") }}: {{ productStore.error }}
        </div>
        <TransitionGroup
          v-else
          name="product"
          tag="div"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-7 justify-items-center px-4"
        >
          <div
            v-for="product in displayedProducts"
            :key="product.id"
            @click="goToProductDetails(product.id)"
            class="w-full max-w-[280px] p-4 border rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <div
              class="w-full h-40 sm:h-48 flex items-center justify-center bg-gray-50 rounded-lg"
            >
              <img
                :src="product.image"
                :alt="product.title"
                class="w-full h-full object-contain p-4"
              />
            </div>
            <h3 class="mt-4 font-semibold text-base md:text-lg truncate">
              {{ product.title }}
            </h3>
            <div v-if="product.rating" class="flex items-center gap-2 mt-2">
              <div class="flex gap-1">
                <svg
                  v-for="star in 5"
                  :key="star"
                  class="w-4 h-4 md:w-5 md:h-5"
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
              <span class="text-xs md:text-sm text-gray-600">
                {{ product.rating.rate }} ({{ product.rating.count }})
              </span>
            </div>
            <p class="text-gray-600 mt-2 font-bold text-lg md:text-xl">
              ${{ product.price }}
            </p>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useProductStore } from "../stores/product";

const router = useRouter();
const productStore = useProductStore();
const { t } = useI18n();

const categories = ref([
  "products.categories.all",
  "products.categories.offers",
  "products.categories.bestSeller",
  "products.categories.coffee",
  "products.categories.equipment",
]);

const translatedCategories = computed(() => {
  return categories.value.map((cat) => t(cat));
});

const activeIndex = ref(0);

const displayedProducts = computed(() => {
  if (activeIndex.value === 0) {
    return productStore.products.slice(0, 4);
  } else {
    const start = activeIndex.value * 4;
    const end = start + 4;
    return productStore.products.slice(start, end);
  }
});

const goToProductDetails = (id) => {
  router.push({ name: "ProductDetails", params: { id } });
};

onMounted(() => {
  productStore.fetchProducts();
});
</script>

<style lang="scss" scoped>
.text {
  color: #7c6a6a;
  transition: all 0.3s ease;
  padding: 0.5rem;
  white-space: nowrap;
}

.active {
  color: #004876;
  transition: all 0.3s ease;
  position: relative;
}

.active::after {
  content: "";
  position: absolute;
  bottom: 2px;
  left: 0.5rem;
  right: 0.5rem;
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

[dir="rtl"] .product-enter-from {
  transform: translateX(-50px);
}

.product-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

[dir="rtl"] .product-leave-to {
  transform: translateX(50px);
}

.product-move {
  transition: transform 0.4s ease;
}

@media (max-width: 640px) {
  .text {
    font-size: 0.875rem;
    padding: 0.375rem;
  }

  .active::after {
    left: 0.375rem;
    right: 0.375rem;
  }
}

@media (max-width: 480px) {
  .text {
    font-size: 0.75rem;
  }
}
</style>
