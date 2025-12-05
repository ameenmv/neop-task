<template>
   <Navbar />
  <section class="py-8 px-6 max-w-5xl mx-auto">
    <div v-if="!product" class="text-center text-gray-500">
      Loading product...
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <!-- Gallery -->
      <div>
        <img
          :src="currentImage"
          :alt="product.title"
          class="w-full h-96 object-contain rounded-lg shadow"
        />
        <div class="flex gap-3 mt-4">
          <img
            v-for="(img, i) in gallery"
            :key="i"
            :src="img"
            @click="currentImage = img"
            class="w-20 h-20 object-contain rounded cursor-pointer border"
            :class="{ 'ring-2 ring-blue-400': currentImage === img }"
          />
        </div>
      </div>

      <!-- Details -->
      <div>
        <h1 class="text-2xl font-bold text-[#3B2F2F]">{{ product.title }}</h1>
        <p class="text-gray-600 mt-3">{{ product.description }}</p>

        <div class="mt-4 flex items-center gap-4">
          <div class="text-2xl font-semibold text-[#3B2F2F]">
            ${{ product.price }}
          </div>
          <div v-if="product.discount" class="text-sm text-red-500">
            {{ product.discount }}% off
          </div>
        </div>

        <!-- Quantity + Add to cart -->
        <div class="mt-6 flex items-center gap-4">
          <div class="flex items-center border rounded">
            <button class="px-3" @click="decrease">-</button>
            <div class="px-4">{{ qty }}</div>
            <button class="px-3" @click="increase">+</button>
          </div>

          <button
            @click="addToCart"
            class="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add to cart
          </button>
        </div>

        <!-- Rating -->
        <div v-if="product.rating" class="mt-6">
          <div class="flex items-center gap-2">
            <div class="flex gap-1">
              <svg
                v-for="n in 5"
                :key="n"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                :class="
                  n <= Math.round(product.rating.rate)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                "
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
            <div class="text-sm text-gray-600">
              {{ product.rating.rate }} ({{ product.rating.count }})
            </div>
          </div>
        </div>

        <!-- Reviews (placeholder) -->
        <div class="mt-8">
          <h3 class="font-semibold">Customer Reviews</h3>
          <div
            v-if="product.reviews && product.reviews.length"
            class="mt-3 space-y-3"
          >
            <div
              v-for="(r, i) in product.reviews"
              :key="i"
              class="border p-3 rounded"
            >
              <div class="text-sm font-medium">{{ r.author }}</div>
              <div class="text-sm text-gray-600">{{ r.comment }}</div>
            </div>
          </div>
          <div v-else class="text-gray-500 mt-2">No reviews yet.</div>
        </div>
      </div>
    </div>
  </section>
   <Footer />
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "../stores/product";

const route = useRoute();
const id = route.params.id;
const store = useProductStore();

const product = ref(null);
const currentImage = ref("");
const gallery = ref([]);
const qty = ref(1);

function increase() {
  qty.value++;
}
function decrease() {
  if (qty.value > 1) qty.value--;
}

function addToCart() {
  // Placeholder - integrate with cart store if available
  console.log("Add to cart", { product: product.value, qty: qty.value });
  alert(`Added ${qty.value} x ${product.value.title} to cart`);
}

onMounted(async () => {
  await store.fetchProducts();
  const p = store.getById(id);
  if (p) {
    product.value = p;
    // gallery: if product has images array use it, otherwise fallback to image
    gallery.value = p.images && p.images.length ? p.images : [p.image];
    currentImage.value = gallery.value[0];
  }
});
</script>

<style scoped>
/* small niceties */
</style>
