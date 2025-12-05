<template>
  <section
    id="landing-smooth-wrapper"
    class="h-screen relative overflow-hidden"
  >
    <div id="landing-smooth-content">
      <Navbar />
      <div
        class="landing-container h-full w-full px-4 sm:px-8 lg:px-36 flex flex-col lg:flex-row justify-between items-center pb-20 gap-8"
      >
        <!-- text -->
        <div
          class="content-left flex flex-col gap-5 w-full lg:w-1/2 mb-10 items-center lg:items-start text-center lg:text-start"
        >
          <!-- title -->
          <h1
            class="main-title text-5xl sm:text-6xl lg:text-8xl leading-[102%] font-bold text-[var(--blue)] tracking-[4px] sm:tracking-[8px]"
          >
            <span class="title-line-1">{{ t("hero.title") }}</span>
            <br />
            <span class="title-line-2">{{ t("hero.subtitle") }}</span>
          </h1>
          <!-- desc -->
          <p class="description max-w-64 text-[#292625] text-base">
            {{ t("hero.description") }}
          </p>
          <!-- button & icon -->
          <div
            class="cta-container flex justify-center lg:justify-start items-center gap-3 w-fit"
          >
            <button
              @click="goToShop"
              class="shop-button py-3 px-7 rounded-2xl border border-[#6F4336] text-[#6f4336] text-base font-medium flex justify-center items-center gap-4 relative overflow-hidden group"
            >
              <span class="relative z-10">{{ t("hero.shopButton") }}</span>
              <svg
                class="arrow-icon w-4 h-4 rotate-45 rtl:rotate-[-135deg] relative z-10 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                fill="#6f4336"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                />
              </svg>
              <span
                class="button-bg absolute inset-0 bg-[#6F4336] transform -translate-x-full rtl:translate-x-full transition-transform duration-300 group-hover:translate-x-0"
              ></span>
            </button>
            <div
              class="cart-icon bg-[var(--blue)] w-12 h-12 rounded-full flex justify-center items-center cursor-pointer"
            >
              <svg
                width="20px"
                height="20px"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- swiper -->
        <div class="product-slider-container w-full lg:!w-1/2">
          <Swiper
            @swiper="onSwiperInit"
            :modules="modules"
            :centeredSlides="false"
            :slidesPerView="2"
            :spaceBetween="0"
            :speed="1000"
            :grabCursor="true"
            :navigation="{
              nextEl: '.custom-next',
              prevEl: '.custom-prev',
            }"
            :dir="currentDir"
            class="mySwiper"
          >
            <SwiperSlide
              v-for="(product, index) in products"
              :key="index"
              class="slide"
            >
              <div class="slide-content">
                <div class="design-container">
                  <div class="bg-shape"></div>
                  <img
                    :src="product.img"
                    :alt="product.name"
                    class="coffee-img"
                  />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          <div class="nav-controls">
            <button class="custom-prev" aria-label="Previous slide">
              <span class="ltr:inline rtl:hidden">←</span>
              <span class="rtl:inline ltr:hidden">→</span>
            </button>
            <button class="custom-next" aria-label="Next slide">
              <span class="ltr:inline rtl:hidden">→</span>
              <span class="rtl:inline ltr:hidden">←</span>
            </button>
          </div>
        </div>
      </div>

      <!-- mask img -->
      <img
        class="mask-img absolute right-0 rtl:right-auto rtl:left-0 top-0 w-[600px] lg:w-[1000px] z-[-1] pointer-events-none transform rtl:scale-x-[-1]"
        :src="mask"
        alt=""
      />
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import Navbar from "../components/Navbar.vue";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const router = useRouter();
const { t, locale } = useI18n();
const modules = [Navigation, Pagination];

import bag1 from "../assets/imgs/coffee.png";
import mask from "../assets/imgs/mask.png";

const currentDir = computed(() => (locale.value === "ar" ? "rtl" : "ltr"));

const products = [
  { img: bag1, name: "Coffee 1" },
  { img: bag1, name: "Coffee 2" },
  { img: bag1, name: "Coffee 3" },
  { img: bag1, name: "Coffee 4" },
  { img: bag1, name: "Coffee 5" },
];

const swiperInstance = ref(null);

const onSwiperInit = (swiper) => {
  swiperInstance.value = swiper;
};

const goToShop = () => {
  router.push("/shop");
};
</script>

<style lang="scss" scoped>
#landing-smooth-wrapper {
  position: relative;
}

#landing-smooth-content {
  position: relative;
}

.landing-container {
  position: relative;
}

/* RTL Support */
[dir="rtl"] .landing-container {
  padding-right: 9rem;
  padding-left: 1rem;
}

@media (max-width: 1024px) {
  [dir="rtl"] .landing-container {
    padding-right: 2rem;
    padding-left: 2rem;
  }
}

.shop-button {
  &:hover {
    .arrow-icon {
      fill: white;
    }

    span:not(.button-bg) {
      color: white;
    }
  }
}

.button-bg {
  z-index: 0;
}

[dir="rtl"] .button-bg {
  transform: translateX(100%);
}

[dir="rtl"] .shop-button:hover .button-bg {
  transform: translateX(0);
}

.cart-icon {
  box-shadow: 0 4px 15px rgba(0, 72, 118, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 25px rgba(0, 72, 118, 0.5);
  }

  svg {
    pointer-events: none;
  }
}

.product-slider-container {
  position: relative;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 3rem 0;
}

.mySwiper {
  height: 600px;
  width: 100%;
}

.swiper-slide {
  width: 520px !important;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;
  transition: transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 300ms ease;
}

.swiper-slide:not(.swiper-slide-active) {
  opacity: 0.75;
  transform: scale(0.75);
  z-index: 1;
}

.swiper-slide-active {
  opacity: 1;
  transform: scale(1);
  z-index: 10;
}

.slide-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.design-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: visible;
}

.bg-shape {
  position: absolute;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  z-index: 0;
  transition: all 800ms cubic-bezier(0.34, 1.56, 0.64, 1);
  background: linear-gradient(90deg, #6f4336 0%, #3b2f2f 100%);
  pointer-events: none;
  box-shadow: 0 10px 40px rgba(111, 67, 54, 0.3);
}

.swiper-slide-active .bg-shape {
  width: 500px;
  height: 500px;
  background: linear-gradient(90deg, #004876 0%, #1e71a6 100%);
  box-shadow: 0 20px 60px rgba(0, 72, 118, 0.4);
}

.coffee-img {
  width: 250px;
  max-width: none;
  height: auto;
  object-fit: contain;
  z-index: 2;
  position: relative;
  transition: all 800ms cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
}

.swiper-slide:not(.swiper-slide-active) .coffee-img {
  transform: scale(0.9);
  opacity: 0.9;
  filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.1));
}

.swiper-slide-active .coffee-img {
  transform: scale(1);
  opacity: 1;
  width: 500px;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3));
}

.nav-controls {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  z-index: 30;
  padding: 0 20px;
  pointer-events: none;
}

[dir="rtl"] .nav-controls {
  flex-direction: row-reverse;
}

.custom-prev,
.custom-next {
  pointer-events: auto;
  background: white;
  border: 2px solid #ddd;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  color: #333;

  &:hover {
    background: linear-gradient(135deg, #004876 0%, #1e71a6 100%);
    color: white;
    border-color: #004876;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
}

.mask-img {
  opacity: 0.9;
  transition: transform 0.3s ease;
}

/* Responsive */
@media (max-width: 1024px) {
  .landing-container {
    flex-direction: column;
    padding: 100px 2rem 2rem;
  }

  .content-left,
  .product-slider-container {
    width: 100% !important;
  }

  .main-title {
    font-size: 4rem;
  }

  .mySwiper {
    height: 500px;
  }
}

@media (max-width: 768px) {
  .landing-container {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .main-title {
    font-size: 3rem;
  }

  .swiper-slide {
    width: 280px !important;
  }

  .swiper-slide-active .coffee-img {
    width: 350px;
  }

  .mySwiper {
    height: 450px;
  }

  .nav-controls {
    padding: 0 10px;
  }

  .custom-prev,
  .custom-next {
    width: 45px;
    height: 45px;
    font-size: 1.2rem;
  }
}
</style>
