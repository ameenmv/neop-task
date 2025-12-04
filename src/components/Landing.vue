<template>
  <section
    id="landing-smooth-wrapper"
    class="h-screen relative overflow-hidden"
  >
    <div id="landing-smooth-content">
      <Navbar />
      <div
        class="landing-container h-full w-full pl-36 flex justify-between items-center pb-20"
      >
        <!-- text -->
        <div class="content-left flex flex-col gap-5 w-1/2 mb-10">
          <!-- title -->
          <h1
            class="main-title text-8xl leading-[102%] font-bold text-[var(--blue)] tracking-[8px]"
          >
            <span class="title-line-1">Coffee</span>
            <br />
            <span class="title-line-2">&Shop</span>
          </h1>
          <!-- desc -->
          <p class="description max-w-64 text-[#292625] text-base">
            Get your ordered (better) coffee delivered to you if you want.
          </p>
          <!-- button & icon -->
          <div
            class="cta-container flex justify-center items-center gap-3 w-fit"
          >
            <button
              class="shop-button py-3 px-7 rounded-2xl border border-[#6F4336] text-[#6f4336] text-base font-medium flex justify-center items-center gap-4 relative overflow-hidden group"
            >
              <span class="relative z-10">SHOP 20% OFF</span>
              <svg
                class="arrow-icon w-4 h-4 rotate-45 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                fill="#6f4336"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                />
              </svg>
              <span
                class="button-bg absolute inset-0 bg-[#6F4336] transform -translate-x-full transition-transform duration-300 group-hover:translate-x-0"
              ></span>
            </button>
            <div
              class="cart-icon bg-[var(--blue)] w-12 h-12 rounded-full flex justify-center items-center cursor-pointer"
            >
              <svg
                width="28px"
                height="28px"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <path
                  d="M256 144C256 108.7 284.7 80 320 80C355.3 80 384 108.7 384 144L384 192L256 192L256 144zM208 192L144 192C117.5 192 96 213.5 96 240L96 448C96 501 139 544 192 544L448 544C501 544 544 501 544 448L544 240C544 213.5 522.5 192 496 192L432 192L432 144C432 82.1 381.9 32 320 32C258.1 32 208 82.1 208 144L208 192zM232 240C245.3 240 256 250.7 256 264C256 277.3 245.3 288 232 288C218.7 288 208 277.3 208 264C208 250.7 218.7 240 232 240zM384 264C384 250.7 394.7 240 408 240C421.3 240 432 250.7 432 264C432 277.3 421.3 288 408 288C394.7 288 384 277.3 384 264z"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- swiper -->
        <div class="product-slider-container !w-1/2">
          <Swiper
            @swiper="onSwiperInit"
            @slideChange="onSlideChange"
            :modules="modules"
            centeredSlides="false"
            :slides-per-view="2"
            :space-between="0"
            speed="1000"
            grab-cursor="true"
            :navigation="{
              nextEl: '.custom-next',
              prevEl: '.custom-prev',
            }"
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
            <button class="custom-prev" aria-label="Previous slide">←</button>
            <button class="custom-next" aria-label="Next slide">→</button>
          </div>
        </div>
      </div>

      <!-- mask img -->
      <img
        class="mask-img absolute right-0 top-0 w-[1000px] z-[-1] pointer-events-none"
        :src="mask"
        alt=""
      />
    </div>
  </section>
</template>

<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, onUnmounted, ref } from "vue";
import Navbar from "../components/Navbar.vue";

import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

const modules = [Navigation, Pagination, EffectCoverflow, Autoplay];

import {
  default as bag1,
  default as bag2,
  default as bag3,
} from "../assets/imgs/coffee.png";
import mask from "../assets/imgs/mask.png";

const products = [
  { img: bag1, name: "Coffee 1" },
  { img: bag2, name: "Coffee 2" },
  { img: bag3, name: "Coffee 3" },
  { img: bag1, name: "Coffee 4" },
  { img: bag2, name: "Coffee 5" },
];

const swiperInstance = ref(null);

const onSwiperInit = (swiper) => {
  swiperInstance.value = swiper;
  console.log("Swiper initialized:", swiper);
};

const onSlideChange = () => {
  console.log("Slide changed");
  // Animate slide change - أخف وأسرع
  gsap.from(".swiper-slide-active .coffee-img", {
    scale: 0.8,
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
    clearProps: "all",
  });

  gsap.from(".swiper-slide-active .bg-shape", {
    scale: 0.8,
    duration: 0.5,
    ease: "power2.out",
    clearProps: "all",
  });
};

let masterTimeline;
let animationCleanup = [];

onMounted(() => {
  setTimeout(() => {
    // Master timeline for initial animations
    masterTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Mask image parallax - بس مش للـ swiper
    gsap.to(".mask-img", {
      scrollTrigger: {
        trigger: "#landing-smooth-wrapper",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      y: 200,
      rotation: 5,
      scale: 1.1,
      ease: "none",
    });

    // Title animation - split by lines
    masterTimeline
      .from(".title-line-1", {
        x: -200,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      })
      .from(
        ".title-line-2",
        {
          x: -200,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
        },
        "-=0.8"
      );

    // Title floating animation
    const titleFloat = gsap.to(".main-title", {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
    animationCleanup.push(titleFloat);

    // Description fade in
    masterTimeline.from(
      ".description",
      {
        y: 30,
        opacity: 0,
        duration: 0.8,
      },
      "-=0.6"
    );

    // CTA buttons animation
    masterTimeline.from(
      ".shop-button",
      {
        scale: 0,
        rotation: 360,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      },
      "-=0.4"
    );

    masterTimeline.from(
      ".cart-icon",
      {
        scale: 0,
        rotation: -360,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      },
      "-=0.8"
    );

    // Swiper container entrance - بس بدون scroll trigger
    masterTimeline.from(
      ".product-slider-container",
      {
        x: 200,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      },
      "-=1"
    );

    // Initial swiper slides animation
    gsap.from(".swiper-slide", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      delay: 1,
      clearProps: "all",
    });

    // Navigation buttons animation
    gsap.from([".custom-prev", ".custom-next"], {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: "back.out(1.7)",
      delay: 1.5,
    });

    // Button hover effects
    const shopButton = document.querySelector(".shop-button");
    if (shopButton) {
      shopButton.addEventListener("mouseenter", onShopButtonEnter);
      shopButton.addEventListener("mouseleave", onShopButtonLeave);
    }

   

    // Navigation buttons hover
    document.querySelectorAll(".custom-prev, .custom-next").forEach((btn) => {
      btn.addEventListener("mouseenter", () => onNavButtonEnter(btn));
      btn.addEventListener("mouseleave", () => onNavButtonLeave(btn));
    });

    // Continuous animations for coffee images
    const coffeeFloat = gsap.to(".coffee-img", {
      y: -10,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: 0.3,
        from: "start",
      },
    });
    animationCleanup.push(coffeeFloat);

    // Background shapes rotation
    const shapeRotate = gsap.to(".bg-shape", {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: "none",
    });
    animationCleanup.push(shapeRotate);

    // Parallax effect on mouse move
    const landingContainer = document.querySelector(".landing-container");
    if (landingContainer) {
      landingContainer.addEventListener("mousemove", onMouseMove);
    }

    // Scroll animation للـ content-left بس
    gsap.to(".content-left", {
      scrollTrigger: {
        trigger: "#landing-smooth-wrapper",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
      y: -100,
      opacity: 0.5,
      ease: "none",
    });

    // شلنا الـ scroll animation للـ swiper خالص
  }, 100);
});

const onShopButtonEnter = () => {
  gsap.to(".shop-button", {
    scale: 1.05,
    boxShadow: "0 10px 30px rgba(111, 67, 54, 0.3)",
    duration: 0.3,
    ease: "power2.out",
  });

  gsap.to(".arrow-icon", {
    x: 5,
    duration: 0.3,
    ease: "power2.out",
  });
};

const onShopButtonLeave = () => {
  gsap.to(".shop-button", {
    scale: 1,
    boxShadow: "0 0 0 rgba(111, 67, 54, 0)",
    duration: 0.3,
    ease: "power2.out",
  });

  gsap.to(".arrow-icon", {
    x: 0,
    duration: 0.3,
    ease: "power2.out",
  });
};


const onNavButtonEnter = (btn) => {
  gsap.to(btn, {
    scale: 1.15,
    boxShadow: "0 8px 20px rgba(0, 72, 118, 0.3)",
    duration: 0.3,
    ease: "back.out(1.7)",
  });
};

const onNavButtonLeave = (btn) => {
  gsap.to(btn, {
    scale: 1,
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    duration: 0.3,
    ease: "power2.out",
  });
};

const onMouseMove = (e) => {
  const { clientX, clientY } = e;
  const { innerWidth, innerHeight } = window;

  const xPos = (clientX / innerWidth - 0.5) * 20;
  const yPos = (clientY / innerHeight - 0.5) * 20;

  gsap.to(".main-title", {
    x: xPos,
    y: yPos,
    duration: 1,
    ease: "power2.out",
  });

  gsap.to(".mask-img", {
    x: xPos * 2,
    y: yPos * 2,
    duration: 1.5,
    ease: "power2.out",
  });

  gsap.to(".swiper-slide-active .coffee-img", {
    x: -xPos * 0.5,
    y: -yPos * 0.5,
    duration: 1,
    ease: "power2.out",
  });
};

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  gsap.killTweensOf("*");
  animationCleanup.forEach((anim) => anim.kill());

  const shopButton = document.querySelector(".shop-button");
  if (shopButton) {
    shopButton.removeEventListener("mouseenter", onShopButtonEnter);
    shopButton.removeEventListener("mouseleave", onShopButtonLeave);
  }

  const landingContainer = document.querySelector(".landing-container");
  if (landingContainer) {
    landingContainer.removeEventListener("mousemove", onMouseMove);
  }
});
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

.content-left {
  will-change: transform, opacity;
}

.main-title {
  will-change: transform;
  perspective: 1000px;
}

.title-line-1,
.title-line-2 {
  display: inline-block;
}

.shop-button {
  will-change: transform;

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

.cart-icon {
  will-change: transform;
  box-shadow: 0 4px 15px rgba(0, 72, 118, 0.3);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 72, 118, 0.5);
  }
}

.product-slider-container {
  position: relative;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 3rem 0;
  // شلنا will-change عشان الـ scroll
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
  will-change: transform;
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
  transition: transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 300ms ease, filter 300ms ease,
    width 800ms cubic-bezier(0.34, 1.56, 0.64, 1);
  pointer-events: none;
  will-change: transform;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
}

.swiper-slide:not(.swiper-slide-active) .coffee-img {
  transform: scale(0.9);
  opacity: 0.9;
  filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.1));
}

.swiper-slide-active .coffee-img {
  transform: scale(1) translateY(-6px);
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
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform;
  color: #333;

  &:hover {
    background: linear-gradient(135deg, #004876 0%, #1e71a6 100%);
    color: white;
    border-color: #004876;
  }

  &:active {
    transform: scale(0.9);
  }
}

.mask-img {
  will-change: transform;
  opacity: 0.9;
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
