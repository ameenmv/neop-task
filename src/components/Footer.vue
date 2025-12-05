<template>
  <footer
    class="py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8 flex justify-center items-center relative overflow-hidden"
  >
    <div class="flex w-full flex-col justify-center items-center max-w-[650px]">
      <!-- Footer Links -->
      <div
        class="flex flex-col sm:flex-row justify-between w-full gap-8 sm:gap-4"
      >
        <!-- Menu -->
        <div
          class="flex flex-col gap-3 md:gap-4 text-center sm:text-start rtl:sm:text-right"
        >
          <h2 class="text-base md:text-lg mb-1 text-white font-bold">
            {{ t("footer.menu") }}
          </h2>
          <p
            class="font-medium text-xs md:text-sm text-[#FFFFFF95] hover:text-white cursor-pointer transition-colors"
          >
            {{ t("footer.getInspired") }}
          </p>
          <p
            class="font-medium text-xs md:text-sm text-[#FFFFFF95] hover:text-white cursor-pointer transition-colors"
          >
            {{ t("footer.ourProducts") }}
          </p>
          <p
            class="font-medium text-xs md:text-sm text-[#FFFFFF95] hover:text-white cursor-pointer transition-colors"
          >
            {{ t("footer.betterWorld") }}
          </p>
          <p
            class="font-medium text-xs md:text-sm text-[#FFFFFF95] hover:text-white cursor-pointer transition-colors"
          >
            {{ t("footer.contact") }}
          </p>
          <p
            class="font-medium text-xs md:text-sm text-[#FFFFFF95] hover:text-white cursor-pointer transition-colors"
          >
            {{ t("footer.blog") }}
          </p>
        </div>

        <!-- Location -->
        <div
          class="flex flex-col gap-3 md:gap-4 text-center sm:text-start rtl:sm:text-right"
        >
          <h2 class="text-base md:text-lg mb-1 text-white font-bold">
            {{ t("footer.location") }}
          </h2>
          <p class="font-medium text-xs md:text-sm text-[#FFFFFF95]">
            lorem ipsum
          </p>
        </div>

        <!-- Contact -->
        <div
          class="flex flex-col gap-3 md:gap-4 text-center sm:text-start rtl:sm:text-right"
        >
          <h2 class="text-base md:text-lg mb-1 text-white font-bold">
            {{ t("footer.contactUs") }}
          </h2>
          <p
            class="font-medium text-xs md:text-sm text-[#FFFFFF95] max-w-[200px] sm:max-w-32 mx-auto sm:mx-0"
          >
            {{ t("footer.contactDescription") }}
          </p>
          <p class="font-medium text-xs md:text-sm text-[#FFFFFF95]">0000000</p>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div
        class="flex flex-col sm:flex-row w-full justify-between items-center gap-4 sm:gap-0 mt-8 md:mt-12 lg:mt-16 pt-4 md:pt-6 border-t border-[#FFFFFF95]"
      >
        <p
          class="font-medium text-xs md:text-sm uppercase tracking-[2px] md:tracking-[2.42px] text-[#FFFFFF95] text-center sm:text-start rtl:sm:text-right"
        >
          {{ t("footer.privacyPolicy") }}
        </p>

        <!-- Social Icons -->
        <div class="flex justify-center items-center gap-2 md:gap-3">
          <div
            class="w-8 h-8 md:w-10 md:h-10 border border-[#FFFFFF95] rounded-full flex justify-center items-center cursor-pointer hover:bg-white hover:border-white group transition-all duration-300"
          >
            <svg
              class="w-3 h-3 md:w-4 md:h-4 fill-white group-hover:fill-[#004876] transition-colors"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                d="M80 299.3l0 212.7 116 0 0-212.7 86.5 0 18-97.8-104.5 0 0-34.6c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4 .4 37 1.2l0-88.7C291.4 4 256.4 0 236.2 0 129.3 0 80 50.5 80 159.4l0 42.1-66 0 0 97.8 66 0z"
              />
            </svg>
          </div>

          <div
            class="w-8 h-8 md:w-10 md:h-10 border border-[#FFFFFF95] rounded-full flex justify-center items-center cursor-pointer hover:bg-white hover:border-white group transition-all duration-300"
          >
            <svg
              class="w-3 h-3 md:w-4 md:h-4 fill-white group-hover:fill-[#004876] transition-colors"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                d="M224.3 141a115 115 0 1 0 -.6 230 115 115 0 1 0 .6-230zm-.6 40.4a74.6 74.6 0 1 1 .6 149.2 74.6 74.6 0 1 1 -.6-149.2zm93.4-45.1a26.8 26.8 0 1 1 53.6 0 26.8 26.8 0 1 1 -53.6 0zm129.7 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM399 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
              />
            </svg>
          </div>

          <div
            class="w-8 h-8 md:w-10 md:h-10 border border-[#FFFFFF95] rounded-full flex justify-center items-center cursor-pointer hover:bg-white hover:border-white group transition-all duration-300"
          >
            <svg
              class="w-3 h-3 md:w-4 md:h-4 fill-white group-hover:fill-[#004876] transition-colors"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                d="M100.3 448l-92.9 0 0-299.1 92.9 0 0 299.1zM53.8 108.1C24.1 108.1 0 83.5 0 53.8 0 39.5 5.7 25.9 15.8 15.8s23.8-15.8 38-15.8 27.9 5.7 38 15.8 15.8 23.8 15.8 38c0 29.7-24.1 54.3-53.8 54.3zM447.9 448l-92.7 0 0-145.6c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7l0 148.1-92.8 0 0-299.1 89.1 0 0 40.8 1.3 0c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3l0 164.3-.1 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Coffee Image -->
    <img
      class="absolute top-[-30%] sm:top-[-40%] md:top-[-50%] lg:top-[-60%] right-2 rtl:right-auto rtl:left-2 sm:right-4 rtl:sm:left-4 md:right-6 rtl:md:left-6 w-24 sm:w-32 md:w-40 lg:w-auto opacity-50 md:opacity-100 transform rtl:scale-x-[-1]"
      src="../assets/imgs/coffee3.png"
      alt=""
    />
  </footer>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style lang="scss" scoped>
footer {
  background: linear-gradient(90deg, #004876 0%, #1e71a6 100%);
}

/* RTL adjustments for flex items */
[dir="rtl"] {
  .flex-col.sm\:flex-row {
    > * {
      text-align: right;
    }
  }
}
</style>
