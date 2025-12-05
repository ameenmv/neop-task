import { defineStore } from "pinia";
import { ref } from "vue";

const API_BASE = "https://fakestoreapi.com";

export const useProductStore = defineStore("product", () => {
  const products = ref([]);
  const loading = ref(false);

  // Fetch all products from fakestoreapi
  async function fetchProducts(force = false) {
    if (products.value.length && !force) return; // avoid re-fetch unless forced
    loading.value = true;
    try {
      const res = await fetch(`${API_BASE}/products`);
      if (!res.ok) throw new Error("Failed to load products from API");
      products.value = await res.json();
    } catch (err) {
      console.error("Error fetching products:", err);
      products.value = [];
    } finally {
      loading.value = false;
    }
  }

  // Fetch single product by id from API and cache it
  async function fetchProduct(id) {
    const existing = getById(id);
    if (existing) return existing;
    loading.value = true;
    try {
      const res = await fetch(`${API_BASE}/products/${id}`);
      if (!res.ok) throw new Error(`Failed to load product ${id}`);
      const p = await res.json();
      // push to cache
      products.value.push(p);
      return p;
    } catch (err) {
      console.error("Error fetching product:", err);
      return null;
    } finally {
      loading.value = false;
    }
  }

  function getById(id) {
    return products.value.find((p) => Number(p.id) === Number(id));
  }

  return {
    products,
    loading,
    fetchProducts,
    fetchProduct,
    getById,
  };
});
