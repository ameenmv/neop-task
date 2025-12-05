<template>
  <Navbar />
  <section class="py-8 mb-50 px-6 max-w-7xl mx-auto">
    <div v-if="!product" class="text-center text-gray-500">
      {{ $t("product.loading") }}
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
      <!-- Gallery -->
      <div class="product-gallery" :dir="isRTL ? 'rtl' : 'ltr'">
        <Swiper
          :key="locale"
          :modules="[Autoplay]"
          :slides-per-view="1"
          :loop="true"
          :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
          }"
          :speed="800"
          class="w-full h-96 rounded-lg shadow"
        >
          <SwiperSlide v-for="(img, i) in gallery" :key="i">
            <div class="flex items-center justify-center h-96">
              <img
                :src="img"
                :alt="product.title"
                class="w-full h-full object-contain"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- Details -->
      <div class="product-details">
        <h1 class="text-2xl font-bold text-[var(--primary)]">
          {{ product.title }}
        </h1>
        <p class="text-gray-600 mt-3">{{ product.description }}</p>

        <div class="mt-4 flex items-center gap-4">
          <div class="text-2xl font-semibold text-[var(--primary)]">
            ${{ product.price }}
          </div>
          <div v-if="product.discount" class="text-sm text-red-500">
            {{ product.discount }}% {{ $t("product.discount") }}
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
            {{ $t("product.addToCart") }}
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
      </div>
    </div>

    <!-- Customer Reviews Section -->
    <div v-if="product" class="mt-16">
      <div class="reviews-heading text-center mb-8">
        <h2 class="text-3xl font-bold text-[var(--primary)]">
          {{ $t("reviews.heading") }}
        </h2>
        <p class="text-[#7c6a6a] mt-2">
          {{ $t("reviews.subheading") }}
        </p>
      </div>

      <div
        v-if="reviews.length"
        class="reviews-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="(review, i) in reviews"
          :key="i"
          class="review-card bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border-t-4 border-[var(--blue)]"
        >
          <!-- Reviewer Info -->
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-12 h-12 rounded-full bg-[var(--secondary)] flex items-center justify-center text-white font-bold text-lg"
            >
              {{ review.author.charAt(0).toUpperCase() }}
            </div>
            <div>
              <h4 class="font-semibold text-[var(--primary)]">
                {{ review.author }}
              </h4>
              <div class="flex gap-1 mt-1">
                <svg
                  v-for="star in 5"
                  :key="star"
                  class="w-4 h-4"
                  :class="
                    star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
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

          <!-- Review Comment -->
          <p class="text-gray-700 leading-relaxed">{{ review.comment }}</p>

          <!-- Review Date -->
          <div class="mt-4 text-xs text-gray-500">{{ review.date }}</div>
        </div>
      </div>

      <!-- No Reviews State -->
      <div v-else class="text-center py-12 bg-gray-50 rounded-lg">
        <svg
          class="w-16 h-16 mx-auto text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
        <h3 class="text-xl font-semibold text-gray-600">
          {{ $t("reviews.noReviews") }}
        </h3>
        <p class="text-gray-500 mt-2">{{ $t("reviews.beFirst") }}</p>
      </div>
    </div>
  </section>
  <Footer />
</template>

<script setup>
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import Footer from "../components/Footer.vue";
import Navbar from "../components/Navbar.vue";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { computed, nextTick, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { useProductStore } from "../stores/product";

gsap.registerPlugin(ScrollTrigger);

const { locale } = useI18n();
const isRTL = computed(() => locale.value === "ar");

const route = useRoute();
const id = route.params.id;
const store = useProductStore();

const product = ref(null);
const gallery = ref([]);
const qty = ref(1);
const reviews = ref([]);

function increase() {
  qty.value++;
}
function decrease() {
  if (qty.value > 1) qty.value--;
}

function addToCart() {
  console.log("Add to cart", { product: product.value, qty: qty.value });
}

onMounted(async () => {
  await store.fetchProducts();
  const p = store.getById(id);
  if (p) {
    product.value = p;
    // gallery: if product has images array use it, other create 4 slides from the single image
    if (p.images && p.images.length > 1) {
      gallery.value = p.images;
    } else {
      const mainImage = p.image;
      gallery.value = [mainImage, mainImage, mainImage, mainImage];
    }

    // Set up sample reviews (in real app, these would come from API)
    reviews.value =
      p.reviews && p.reviews.length
        ? p.reviews
        : [
            {
              author: "Sarah Johnson",
              rating: 5,
              comment:
                "Absolutely love this product! The quality exceeded my expectations and it arrived quickly. Highly recommend!",
              date: "December 3, 2025",
            },
            {
              author: "Michael Chen",
              rating: 4,
              comment:
                "Great value for money. Good quality and exactly as described. Would buy again.",
              date: "November 28, 2025",
            },
            {
              author: "Emma Davis",
              rating: 5,
              comment:
                "Perfect! This is exactly what I was looking for. The product is amazing and the service was excellent.",
              date: "November 25, 2025",
            },
          ];
  }

  // Wait for DOM to update
  await nextTick();

  // GSAP Animations
  setTimeout(() => {
    // Animate gallery
    gsap.from(".product-gallery", {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".product-gallery",
        start: "top 80%",
        once: true,
        toggleActions: "play none none none",
      },
    });

    // Animate product details
    gsap.from(".product-details", {
      opacity: 0,
      x: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".product-details",
        start: "top 80%",
        once: true,
        toggleActions: "play none none none",
      },
    });

    // Animate reviews heading
    gsap.from(".reviews-heading", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".reviews-heading",
        start: "top 80%",
        once: true,
        toggleActions: "play none none none",
      },
    });

    // Animate review cards
    const reviewCards = document.querySelectorAll(".review-card");
    if (reviewCards.length > 0) {
      gsap.from(reviewCards, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".reviews-grid",
          start: "top 80%",
          once: true,
          toggleActions: "play none none none",
        },
      });
    }

    // Refresh ScrollTrigger
    ScrollTrigger.refresh();
  }, 100);
});
</script>

<style scoped></style>
