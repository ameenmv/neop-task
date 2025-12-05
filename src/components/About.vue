<template>
  <section class="py-50 mb-50">
    <div class="flex lg:flex-row flex-col justify-center items-center gap-8">
      <!-- image -->
      <div class="lg:w-2/5 w-full relative">
        <img
          class="lg:w-full h-auto"
          src="../assets/imgs/about-main.png"
          alt=""
        />
        <!-- mask img -->
        <img
          class="absolute left-0 top-0 lg:w-[400px] w-[200px] z-[-1] pointer-events-none"
          src="../assets/imgs/aboutbg.png"
          alt=""
        />
      </div>
      <!-- text -->
      <div class="lg:w-3/5 w-full lg:text-left lg:items-start items-center flex flex-col text-center">
        <h1 class="lg:text-[32px] text-[26px] font-bold text-[#3B2F2F]">
          Wecome to Our shop
        </h1>
        <h3 class="lg:text-2xl text-lg text-[#3B2F2F] mt-2">
          The coffee you want, when you want it
        </h3>
        <!-- grid -->
        <div class="flex flex-col gap-6 items-start mt-9 ">
          <div class="flex md:flex-row flex-col justify-center items-center gap-7 w-full">
            <div class="flex gap-3 justify-center items-center">
              <!-- img -->
              <div
                class="w-[80px] h-[80px] bg-[#6F4336] rounded-full flex justify-center items-center"
              >
                <img src="../assets/imgs/about1.png" alt="" class="w-13 h-12" />
              </div>
              <!-- text -->
              <div class="flex flex-col gap-2 text-start">
                <h2 class="text-base font-bold text-[#004876]">quality</h2>
                <p class="max-w-60 text-sm text-[#292625]">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
            </div>
            <div class="flex gap-3 justify-center items-center">
              <!-- img -->
              <div
                class="w-[80px] h-[80px] bg-[#6F4336] rounded-full flex justify-center items-center"
              >
                <img src="../assets/imgs/about2.png" alt="" class="w-13 h-12" />
              </div>
              <!-- text -->
              <div class="flex flex-col gap-2 text-start">
                <h2 class="text-base font-bold text-[#004876]">quality</h2>
                <p class="max-w-60 text-sm text-[#292625]">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
            </div>
          </div>
          <div class="flex md:flex-row flex-col justify-center items-center gap-7 w-full">
            <div class="flex gap-3 justify-center items-center">
              <!-- img -->
              <div
                class="w-[80px] h-[80px] bg-[#6F4336] rounded-full flex justify-center items-center"
              >
                <img src="../assets/imgs/about3.png" alt="" class="w-13 h-12" />
              </div>
              <!-- text -->
              <div class="flex flex-col gap-2 text-start">
                <h2 class="text-base font-bold text-[#004876]">quality</h2>
                <p class="max-w-60 text-sm text-[#292625]">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
            </div>
            <div class="flex gap-3 justify-center items-center">
              <!-- img -->
              <div
                class="w-[80px] h-[80px] bg-[#6F4336] rounded-full flex justify-center items-center"
              >
                <img src="../assets/imgs/about4.png" alt="" class="w-13 h-12" />
              </div>
              <!-- text -->
              <div class="flex flex-col gap-2 text-start">
                <h2 class="text-base font-bold text-[#004876]">quality</h2>
                <p class="max-w-60 text-sm text-[#292625]">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped></style>
