import { createRouter, createWebHistory } from "vue-router";
import Home from "../Pages/Home.vue";
import ProductDetails from "../Pages/ProductDetails.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/product/:id",
    name: "ProductDetails",
    component: ProductDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
