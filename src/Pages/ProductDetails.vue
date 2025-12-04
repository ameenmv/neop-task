<template>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <Navbar />
      
      <div v-if="productStore.isLoading" class="loading-container">
        <div class="loading-spinner"></div>
        <p class="text-gray-600 mt-4">Loading...</p>
      </div>
      
      <div v-else-if="!product" class="error-container">
        <p class="text-xl text-gray-600">Product not found</p>
      </div>
      
      <div v-else class="product-container">
        <button
          @click="$router.back()"
          class="back-button"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to products
        </button>

        <div class="product-grid">
          <!-- Image Gallery Section -->
          <div class="gallery-container">
            <!-- Main Image Swiper -->
            <swiper
              :style="{
                '--swiper-navigation-color': '#004876',
                '--swiper-pagination-color': '#004876',
              }"
              :spaceBetween="10"
              :navigation="{
                enabled: true,
                hideOnClick: false,
              }"
              :pagination="{
                clickable: true,
                dynamicBullets: true,
              }"
              :thumbs="{ swiper: thumbsSwiper }"
              :modules="modules"
              :breakpoints="{
                320: {
                  navigation: {
                    enabled: false,
                  },
                  pagination: {
                    enabled: true,
                  },
                },
                768: {
                  navigation: {
                    enabled: true,
                  },
                  pagination: {
                    enabled: false,
                  },
                },
              }"
              class="main-swiper"
            >
              <swiper-slide v-for="(img, index) in productImages" :key="index">
                <div class="image-container">
                  <img
                    :src="img"
                    :alt="product.title"
                    class="product-main-image"
                  />
                </div>
              </swiper-slide>
            </swiper>

            <!-- Thumbs Swiper - Hidden on mobile -->
            <swiper
              @swiper="setThumbsSwiper"
              :spaceBetween="10"
              :slidesPerView="4"
              :freeMode="true"
              :watchSlidesProgress="true"
              :modules="modules"
              :breakpoints="{
                320: {
                  slidesPerView: 3,
                  spaceBetween: 8,
                },
                640: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
              }"
              class="thumbs-swiper"
            >
              <swiper-slide
                v-for="(img, index) in productImages"
                :key="index"
                class="thumb-slide"
              >
                <img
                  :src="img"
                  :alt="product.title"
                  class="thumb-image"
                />
              </swiper-slide>
            </swiper>
          </div>

          <!-- Product Info Section -->
          <div class="product-info">
            <h1 class="product-title">
              {{ product.title }}
            </h1>
            
            <div class="product-price">
              <div v-if="product.discount" class="price-wrapper">
                <p class="price-current">
                  ${{ discountedPrice }}
                </p>
                <p class="price-old">
                  ${{ product.price }}
                </p>
                <span class="discount-badge">
                  -{{ product.discount }}%
                </span>
              </div>
              <p v-else class="price-current">
                ${{ product.price }}
              </p>
            </div>
            
            <div v-if="product.rating" class="product-rating">
              <div class="stars-container">
                <svg
                  v-for="star in 5"
                  :key="star"
                  class="star-icon"
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
              <span class="rating-value">{{ product.rating.rate }}</span>
              <span class="rating-count">({{ product.rating.count }} reviews)</span>
            </div>

            <div class="product-description">
              <h3 class="section-title">Description</h3>
              <p class="description-text">
                {{ product.description }}
              </p>
            </div>

            <!-- Quantity Selector -->
            <div class="quantity-section">
              <h3 class="section-title">Quantity</h3>
              <div class="quantity-selector">
                <button @click="decreaseQuantity" class="quantity-btn">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                  </svg>
                </button>
                <span class="quantity-value">{{ quantity }}</span>
                <button @click="increaseQuantity" class="quantity-btn">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            <button @click="addToCart" class="add-to-cart-btn">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Cart - ${{ (product.price * quantity).toFixed(2) }}
            </button>
          </div>
        </div>

        <!-- Customer Reviews Section -->
        <div class="reviews-section">
          <!-- Reviews Header -->
          <div class="reviews-header">
            <div>
              <h2 class="reviews-title">Customer Reviews</h2>
              <p class="reviews-subtitle">Based on {{ reviews.length }} reviews</p>
            </div>
            <div class="rating-summary">
              <div class="rating-average-container">
                <span class="rating-average">{{ averageRating }}</span>
                <svg class="rating-star" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p class="rating-out-of">out of 5</p>
            </div>
          </div>

          <!-- Rating Distribution -->
          <div class="rating-distribution">
            <h3 class="distribution-title">Rating Distribution</h3>
            <div class="rating-bars-container">
              <div
                v-for="rating in [5, 4, 3, 2, 1]"
                :key="rating"
                class="rating-bar-wrapper"
              >
                <span class="rating-label">{{ rating }} stars</span>
                <div class="rating-bar-bg">
                  <div
                    class="rating-bar-fill"
                    :style="{ width: getRatingPercentage(rating) + '%' }"
                  ></div>
                </div>
                <span class="rating-count">{{ getRatingCount(rating) }}</span>
              </div>
            </div>
          </div>

          <!-- Reviews List -->
          <div class="reviews-list">
            <div
              v-for="(review, index) in reviews"
              :key="review.id"
              class="review-card"
              :data-index="index"
            >
              <div class="review-content">
                <div class="reviewer-avatar">
                  {{ getInitials(review.name) }}
                </div>
                <div class="review-body">
                  <div class="review-header-info">
                    <h4 class="reviewer-name">{{ review.name }}</h4>
                    <div class="review-meta">
                      <div class="review-stars">
                        <svg
                          v-for="star in 5"
                          :key="star"
                          class="review-star-icon"
                          :class="
                            star <= review.rating
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          "
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <span class="review-date">{{ review.date }}</span>
                      <span v-if="review.verified" class="verified-badge">
                        ✓ Verified
                      </span>
                    </div>
                  </div>
                  <h5 class="review-title">{{ review.title }}</h5>
                  <p class="review-comment">{{ review.comment }}</p>
                  <button class="helpful-btn">
                    👍 Helpful ({{ review.helpful }})
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Write Review Button -->
          <div class="write-review-container">
            <button class="write-review-btn">
              ✍️ Write a Review
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

import Footer from "../components/Footer.vue";
import Navbar from "../components/Navbar.vue";
import { useProductStore } from "../stores/product";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const route = useRoute();
const productStore = useProductStore();
const thumbsSwiper = ref(null);
const quantity = ref(1);

const modules = [FreeMode, Navigation, Thumbs, Pagination];

const product = computed(() => {
  return productStore.getProductById(route.params.id);
});

const productImages = computed(() => {
  if (!product.value) return [];
  return Array(4).fill(product.value.image);
});

const discountedPrice = computed(() => {
  if (!product.value || !product.value.discount) return 0;
  return (product.value.price * (1 - product.value.discount / 100)).toFixed(2);
});

const reviews = ref([
  {
    id: 1,
    name: "Ahmed Mohamed",
    rating: 5,
    date: "2 weeks ago",
    title: "Outstanding Quality!",
    comment: "This product exceeded all my expectations. The quality is top-notch and delivery was super fast. Highly recommended for anyone looking for premium quality!",
    verified: true,
    helpful: 24,
    images: [],
  },
  {
    id: 2,
    name: "Sarah Ali",
    rating: 4,
    date: "1 month ago",
    title: "Great Value for Money",
    comment: "Really good product for the price. Fast shipping and excellent customer service. Would definitely buy again!",
    verified: true,
    helpful: 18,
    images: [],
  },
  {
    id: 3,
    name: "Omar Hassan",
    rating: 5,
    date: "2 months ago",
    title: "Perfect!",
    comment: "Amazing product! Exactly as described in the listing. The packaging was also very secure. 5 stars!",
    verified: false,
    helpful: 32,
    images: [],
  },
  {
    id: 4,
    name: "Layla Ibrahim",
    rating: 5,
    date: "3 months ago",
    title: "Best Purchase Ever",
    comment: "I've been using this for months now and it's still like new. The quality is incredible and it looks even better in person!",
    verified: true,
    helpful: 45,
    images: [],
  },
]);

const averageRating = computed(() => {
  const total = reviews.value.reduce((sum, review) => sum + review.rating, 0);
  return (total / reviews.value.length).toFixed(1);
});

const getRatingCount = (rating) => {
  return reviews.value.filter((review) => review.rating === rating).length;
};

const getRatingPercentage = (rating) => {
  const count = getRatingCount(rating);
  return (count / reviews.value.length) * 100;
};

const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

const increaseQuantity = () => {
  quantity.value++;
  gsap.fromTo(".quantity-value", 
    { scale: 1.3, color: '#004876' },
    { scale: 1, color: '#1F2937', duration: 0.3, ease: "back.out(1.7)" }
  );
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
    gsap.fromTo(".quantity-value",
      { scale: 1.3, color: '#004876' },
      { scale: 1, color: '#1F2937', duration: 0.3, ease: "back.out(1.7)" }
    );
  }
};

const addToCart = () => {
  gsap.to(".add-to-cart-btn", {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: "power2.inOut",
    onComplete: () => {
      // Show success feedback
      gsap.fromTo(".add-to-cart-btn",
        { backgroundColor: '#059669' },
        { backgroundColor: '#004876', duration: 0.5 }
      );
    }
  });
};

onMounted(async () => {
  await productStore.fetchProducts();

  // Smooth Scroll with mobile support
  const isMobile = window.innerWidth < 768;
  
  ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: isMobile ? 1 : 1.5,
    effects: !isMobile,
    smoothTouch: isMobile ? 0.1 : 0,
    normalizeScroll: true,
  });

  // Back Button Animation
  gsap.from(".back-button", {
    x: -50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    delay: 0.2
  });

  // Gallery Animation
  gsap.from(".gallery-container", {
    scrollTrigger: {
      trigger: ".gallery-container",
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    x: -80,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  // Product Info Stagger Animation
  gsap.from(".product-info > *", {
    scrollTrigger: {
      trigger: ".product-info",
      start: "top 75%",
      toggleActions: "play none none reverse"
    },
    x: 80,
    opacity: 0,
    duration: 0.8,
    stagger: 0.12,
    ease: "power3.out"
  });

  // Reviews Header Animation
  gsap.from(".reviews-header", {
    scrollTrigger: {
      trigger: ".reviews-header",
      start: "top 85%",
    },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  // Rating Distribution Animation
  gsap.from(".rating-distribution", {
    scrollTrigger: {
      trigger: ".rating-distribution",
      start: "top 80%",
    },
    scale: 0.9,
    opacity: 0,
    duration: 0.8,
    ease: "back.out(1.2)",
  });

  // Rating Bars Animation with delay
  gsap.from(".rating-bar-wrapper", {
    scrollTrigger: {
      trigger: ".rating-distribution",
      start: "top 75%",
    },
    x: -60,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: "power2.out",
  });

  // Animate bar fills separately
  gsap.to(".rating-bar-fill", {
    scrollTrigger: {
      trigger: ".rating-distribution",
      start: "top 70%",
    },
    scaleX: 1,
    transformOrigin: "left center",
    duration: 1.2,
    stagger: 0.15,
    ease: "power2.out",
  });

  // Reviews Cards with enhanced animation
  document.querySelectorAll('.review-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
        toggleActions: "play none none reverse"
      },
      y: 60,
      opacity: 0,
      rotationX: -10,
      duration: 0.8,
      delay: index * 0.1,
      ease: "power3.out",
    });
    
    // Hover animation for each card
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -8,
        boxShadow: "0 20px 40px rgba(0, 72, 118, 0.15)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });

  // Write Review Button
  gsap.from(".write-review-btn", {
    scrollTrigger: {
      trigger: ".write-review-container",
      start: "top 90%",
    },
    scale: 0,
    rotation: 180,
    opacity: 0,
    duration: 0.8,
    ease: "back.out(1.7)",
  });

  // Continuous pulse for Add to Cart (removed for better UX)
  // gsap.to(".add-to-cart-btn", {
  //   boxShadow: "0 8px 20px rgba(0, 72, 118, 0.3)",
  //   duration: 1.5,
  //   repeat: -1,
  //   yoyo: true,
  //   ease: "power1.inOut",
  // });
});
</script>

<style scoped>
/* Base Styles */
#smooth-wrapper {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  overflow: hidden;
}

#smooth-content {
  overflow: visible;
  will-change: transform;
}

/* Containers */
.loading-container,
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
}

.product-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 1rem 3rem;
}

/* Back Button */
.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #004876;
  font-weight: 600;
  margin-bottom: 2rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  background: white;
  border: 2px solid #E5E7EB;
}

.back-button:hover {
  background: #F0F9FF;
  border-color: #004876;
  transform: translateX(-5px);
}

/* Product Grid */
.product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

/* Gallery Styles */
.gallery-container {
  position: relative;
}

.main-swiper {
  height: 400px;
  margin-bottom: 1rem;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 2rem;
}

.product-main-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.thumbs-swiper {
  height: 100px;
  padding: 0.5rem 0;
}

.thumb-slide {
  opacity: 0.6;
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.thumbs-swiper .swiper-slide-thumb-active {
  opacity: 1;
}

.thumb-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: white;
  border-radius: 0.5rem;
  border: 2px solid #E5E7EB;
  transition: all 0.3s ease;
  padding: 0.5rem;
}

.thumb-slide:hover .thumb-image {
  border-color: #004876;
  transform: scale(1.05);
}

/* Swiper Navigation */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  background: white;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

:deep(.swiper-button-next):hover,
:deep(.swiper-button-prev):hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

:deep(.swiper-button-next:after),
:deep(.swiper-button-prev:after) {
  font-size: 20px;
  font-weight: bold;
  color: #004876;
}

/* Swiper Pagination for mobile */
:deep(.swiper-pagination) {
  bottom: 10px !important;
}

:deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background: #004876;
  opacity: 0.5;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  width: 24px;
  border-radius: 5px;
}

/* Product Info */
.product-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-title {
  font-size: 2rem;
  font-weight: 800;
  color: #3B2F2F;
  line-height: 1.2;
}

.product-price {
  margin-bottom: 0.5rem;
}

.price-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.price-current {
  font-size: 2.5rem;
  font-weight: 800;
  color: #004876;
}

.price-old {
  font-size: 1.5rem;
  color: #9CA3AF;
  text-decoration: line-through;
}

.discount-badge {
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

/* Rating */
.product-rating {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.stars-container {
  display: flex;
  gap: 0.25rem;
}

.star-icon {
  width: 1.5rem;
  height: 1.5rem;
}

.rating-value {
  font-weight: 700;
  font-size: 1.25rem;
  color: #1F2937;
}

.rating-count {
  color: #6B7280;
  font-size: 0.875rem;
}

/* Description */
.product-description {
  background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%);
  padding: 1.5rem;
  border-radius: 1rem;
  border-left: 4px solid #004876;
}

.section-title {
  font-weight: 700;
  font-size: 1.125rem;
  margin-bottom: 0.75rem;
  color: #1F2937;
}

.description-text {
  color: #4B5563;
  line-height: 1.75;
}

/* Quantity */
.quantity-section {
  margin: 0;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 0.75rem;
}

.quantity-btn {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F3F4F6;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.quantity-btn:hover {
  background: #E5E7EB;
  border-color: #004876;
}

.quantity-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1F2937;
  width: 3rem;
  text-align: center;
}

/* Add to Cart Button */
.add-to-cart-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: #004876;
  color: white;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  border: 2px solid transparent;
}

.add-to-cart-btn:hover {
  background: #003558;
  box-shadow: 0 4px 12px rgba(0, 72, 118, 0.3);
}

/* Reviews Section */
.reviews-section {
  margin-top: 4rem;
  padding: 2rem;
  background: #F9FAFB;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.reviews-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.reviews-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #3B2F2F;
}

.reviews-subtitle {
  color: #6B7280;
  font-size: 0.875rem;
}

.rating-summary {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.rating-average-container {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.rating-average {
  font-size: 2rem;
  font-weight: 700;
  color: #004876;
}

.rating-star {
  width: 1.25rem;
  height: 1.25rem;
  color: #FFD700;
}

.rating-out-of {
  color: #6B7280;
  font-size: 0.875rem;
}

/* Rating Distribution */
.rating-distribution {
  background: #FFFFFF;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.distribution-title {
  font-weight: 700;
  font-size: 1.125rem;
  margin-bottom: 1rem;
  color: #3B2F2F;
}

.rating-bars-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Review Card */
.review-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.review-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.reviewer-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #004876, #1E71A6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 10;
}

.review-body {
  margin-left: 4rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.review-header-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.reviewer-name {
  font-weight: 600;
  color: #3B2F2F;
}

.review-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.review-stars {
  display: flex;
  gap: 0.125rem;
}

.review-star-icon {
  width: 1rem;
  height: 1rem;
}

.review-date {
  color: #6B7280;
  font-size: 0.875rem;
}

.verified-badge {
  background: #D1FAE5;
  color: #065F46;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Buttons */
.helpful-btn {
  background: transparent;
  color: #004876;
  font-weight: 500;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.helpful-btn:hover {
  color: #003558;
}

/* Write Review Button */
.write-review-container {
  text-align: center;
  margin-top: 2rem;
}

.write-review-btn {
  background: linear-gradient(135deg, #004876, #1E71A6);
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 2px solid transparent;
}

.write-review-btn:hover {
  background: #003558;
  box-shadow: 0 4px 12px rgba(0, 72, 118, 0.3);
}

/* Loading Spinner */
.loading-spinner {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #004876;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Review animations */
.review-enter-active {
  animation: slideIn 0.5s ease-out;
}

.review-leave-active {
  animation: slideOut 0.5s ease-in;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-30px);
  }
}

/* Hover Effects */
.review-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.review-card:hover {
  transform: translateY(-5px);
}

.quantity-selector button:active {
  transform: scale(0.95);
}
</style>
