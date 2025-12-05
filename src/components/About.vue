<template>
  <section class="py-50 mb-50">
    <div class="flex lg:flex-row flex-col justify-center items-center gap-8">
      <!-- image -->
      <div class="about-image lg:w-2/5 w-full relative">
        <img
          class="lg:w-full h-auto"
          src="../assets/imgs/about-main.png"
          alt=""
        />
        <!-- mask img -->
        <img
          class="mask-img absolute ltr:left-0 rtl:right-0 top-0 lg:w-[400px] w-[200px] z-[-1] pointer-events-none origin-center rtl:!scale-x-[-1]"
          src="../assets/imgs/aboutbg.png"
          alt=""
        />
      </div>
      <!-- text -->
      <div
        class="lg:w-3/5 w-full lg:text-left lg:items-start items-center flex flex-col text-center"
      >
        <h1
          class="about-heading lg:text-[32px] text-[26px] font-bold text-[var(--primary)]"
        >
          {{ $t("about.heading") }}
        </h1>
        <h3
          class="about-subtitle lg:text-2xl text-lg text-[var(--primary)] mt-2"
        >
          {{ $t("about.subheading") }}
        </h3>
        <!-- grid -->
        <div class="features-grid flex flex-col gap-6 items-start mt-9">
          <div
            class="flex md:flex-row flex-col justify-center items-center gap-7 w-full"
          >
            <div class="feature-card flex gap-3 justify-center items-center">
              <!-- img -->
              <div
                class="w-[80px] h-[80px] bg-[var(--secondary)] rounded-full flex justify-center items-center"
              >
                <img src="../assets/imgs/about1.png" alt="" class="w-13 h-12" />
              </div>
              <!-- text -->
              <div class="flex flex-col gap-2 text-start">
                <h2 class="text-base font-bold text-[var(--blue)]">
                  {{ $t("about.quality") }}
                </h2>
                <p class="max-w-60 text-sm text-[#292625]">
                  {{ $t("about.qualityDesc") }}
                </p>
              </div>
            </div>
            <div class="feature-card flex gap-3 justify-center items-center">
              <!-- img -->
              <div
                class="w-[80px] h-[80px] bg-[var(--secondary)] rounded-full flex justify-center items-center"
              >
                <img src="../assets/imgs/about2.png" alt="" class="w-13 h-12" />
              </div>
              <!-- text -->
              <div class="flex flex-col gap-2 text-start">
                <h2 class="text-base font-bold text-[var(--blue)]">
                  {{ $t("about.quality") }}
                </h2>
                <p class="max-w-60 text-sm text-[#292625]">
                  {{ $t("about.qualityDesc") }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="flex md:flex-row flex-col justify-center items-center gap-7 w-full"
          >
            <div class="feature-card flex gap-3 justify-center items-center">
              <!-- img -->
              <div
                class="w-[80px] h-[80px] bg-[var(--secondary)] rounded-full flex justify-center items-center"
              >
                <img src="../assets/imgs/about3.png" alt="" class="w-13 h-12" />
              </div>
              <!-- text -->
              <div class="flex flex-col gap-2 text-start">
                <h2 class="text-base font-bold text-[var(--blue)]">
                  {{ $t("about.quality") }}
                </h2>
                <p class="max-w-60 text-sm text-[#292625]">
                  {{ $t("about.qualityDesc") }}
                </p>
              </div>
            </div>
            <div class="feature-card flex gap-3 justify-center items-center">
              <!-- img -->
              <div
                class="w-[80px] h-[80px] bg-[var(--secondary)] rounded-full flex justify-center items-center"
              >
                <img src="../assets/imgs/about4.png" alt="" class="w-13 h-12" />
              </div>
              <!-- text -->
              <div class="flex flex-col gap-2 text-start">
                <h2 class="text-base font-bold text-[var(--blue)]">
                  {{ $t("about.quality") }}
                </h2>
                <p class="max-w-60 text-sm text-[#292625]">
                  {{ $t("about.qualityDesc") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { nextTick, onMounted } from "vue";

gsap.registerPlugin(ScrollTrigger);

onMounted(async () => {
  await nextTick();

  setTimeout(() => {
    // Animate the image
    gsap.from(".about-image", {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-image",
        start: "top 80%",
        once: true,
        toggleActions: "play none none none",
      },
    });

    // Animate heading
    gsap.from(".about-heading", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about-heading",
        start: "top 80%",
        once: true,
        toggleActions: "play none none none",
      },
    });

    // Animate subtitle
    gsap.from(".about-subtitle", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about-subtitle",
        start: "top 80%",
        once: true,
        toggleActions: "play none none none",
      },
    });

    // Animate feature cards 
    gsap.from(".feature-card", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".features-grid",
        start: "top 80%",
        once: true,
        toggleActions: "play none none none",
      },
    });
  }, 100);
});
</script>

