import { createRouter, createWebHistory } from "vue-router";
import Home from "../Pages/Home.vue";

// lazy load product details page
const ProductDetails = () => import("../Pages/ProductDetails.vue");

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
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
