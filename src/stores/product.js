import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useProductStore = defineStore("product", () => {
  const products = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  // Fetch all products
  const fetchProducts = async () => {
    if (products.value.length > 0) return; // Avoid refetching if already loaded

    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      products.value = await response.json();
    } catch (err) {
      error.value = err.message;
      console.error("Error fetching products:", err);
    } finally {
      isLoading.value = false;
    }
  };

  // Get product by ID
  const getProductById = computed(() => {
    return (id) => products.value.find((product) => product.id === Number(id));
  });

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    getProductById,
  };
});
