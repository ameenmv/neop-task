<template>
  <div>
    <Navbar />

    <div v-if="productStore.isLoading" class="loading">
      <div class="spinner"></div>
    </div>

    <div v-else-if="!product" class="error">
      <p>{{ t("productDetails.notFound") }}</p>
    </div>

    <div v-else class="container">
      <button @click="$router.back()" class="back-btn">
        <span class="ltr:inline rtl:hidden"
          >← {{ t("productDetails.backButton") }}</span
        >
        <span class="rtl:inline ltr:hidden"
          >{{ t("productDetails.backButton") }} ←</span
        >
      </button>

      <div class="product">
        <!-- Image -->
        <div class="image-box">
          <img :src="product.image" :alt="product.title" />
        </div>

        <!-- Info -->
        <div class="info">
          <h1>{{ product.title }}</h1>
          <p class="price">${{ product.price }}</p>

          <div class="description-section">
            <h3>{{ t("productDetails.description") }}</h3>
            <p class="description">{{ product.description }}</p>
          </div>

          <div class="quantity-section">
            <label>{{ t("productDetails.quantity") }}</label>
            <div class="quantity">
              <button @click="decreaseQuantity">-</button>
              <span>{{ quantity }}</span>
              <button @click="increaseQuantity">+</button>
            </div>
          </div>

          <button @click="addToCart" class="add-btn">
            {{ t("productDetails.addToCart") }}
          </button>
        </div>
      </div>

      <!-- Reviews -->
      <div class="reviews">
        <h2>{{ t("productDetails.reviews") }}</h2>
        <div v-for="review in reviews" :key="review.id" class="review">
          <h4>{{ review.name }}</h4>
          <p>{{ review.comment }}</p>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import Footer from "../components/Footer.vue";
import Navbar from "../components/Navbar.vue";
import { useProductStore } from "../stores/product";

const route = useRoute();
const productStore = useProductStore();
const quantity = ref(1);
const { t } = useI18n();

const product = computed(() => productStore.getProductById(route.params.id));

const reviews = ref([
  { id: 1, name: "Ahmed", comment: "Great product!" },
  { id: 2, name: "Sarah", comment: "Good quality." },
  { id: 3, name: "Omar", comment: "Excellent!" },
]);

const increaseQuantity = () => quantity.value++;
const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--;
};
const addToCart = () => console.log("Added to cart");

onMounted(async () => {
  await productStore.fetchProducts();
});
</script>

<style scoped>
.loading,
.error {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #004876;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 20px 50px;
}

.back-btn {
  padding: 10px 20px;
  background: white;
  border: 2px solid #ddd;
  border-radius: 8px;
  color: #004876;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 30px;
  transition: all 0.3s ease;
}

[dir="rtl"] .back-btn {
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: 0;
}

.back-btn:hover {
  background: #f0f9ff;
}

.product {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 40px;
}

.image-box {
  background: #f9fafb;
  padding: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-box img {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

[dir="rtl"] .info {
  text-align: right;
}

.info h1 {
  font-size: 28px;
  color: #1f2937;
}

.price {
  font-size: 32px;
  font-weight: 800;
  color: #004876;
}

.description-section h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 10px;
}

.description {
  color: #6b7280;
  line-height: 1.6;
}

.quantity-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quantity-section label {
  font-weight: 600;
  color: #1f2937;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 15px;
}

[dir="rtl"] .quantity {
  flex-direction: row-reverse;
}

.quantity button {
  width: 40px;
  height: 40px;
  background: #f3f4f6;
  border: none;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quantity button:hover {
  background: #e5e7eb;
}

.quantity span {
  font-size: 20px;
  font-weight: 600;
  min-width: 30px;
  text-align: center;
}

.add-btn {
  padding: 15px 30px;
  background: #004876;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-btn:hover {
  background: #003558;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 72, 118, 0.3);
}

.reviews {
  background: white;
  padding: 30px;
  border-radius: 12px;
}

[dir="rtl"] .reviews {
  text-align: right;
}

.reviews h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #1f2937;
}

.review {
  padding: 15px;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 15px;
}

.review h4 {
  color: #1f2937;
  margin-bottom: 8px;
}

.review p {
  color: #6b7280;
}

@media (max-width: 768px) {
  .container {
    padding: 80px 15px 30px;
  }

  .product {
    grid-template-columns: 1fr;
    padding: 20px;
  }

  .image-box {
    padding: 20px;
  }

  .image-box img {
    max-height: 250px;
  }

  .info h1 {
    font-size: 22px;
  }

  .price {
    font-size: 26px;
  }
}
</style>
