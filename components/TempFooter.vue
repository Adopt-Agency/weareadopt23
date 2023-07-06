<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    }
  },
  computed: {
    isStudio() {
      return this.$route.path == '/studio' || this.$route.path == '/studio'
    },
    isBlog() {
      return this.$route.path == '/advice' || this.$route.path == '/advice'
    },
    isHome() {
      return this.$route.path == '/' || this.$route.path == '/index'
    },
  },
}
</script>

<template>
  <div

    class="bg-[#FFDCDD] footer absolute bottom-0 w-full px-4 mx-auto md:px-8 "
  >
    <div class=" text-red justify-between block w-full py-10 md:flex">
      <div class="block md:flex">
        <div class="flex-col md:flex md:mr-14">
          <a href="mailto:hello@weareadopt.com" class="block leading-tight md:inline">hello@weareadopt.com</a>
          <a
            class="block leading-tight md:inline"
            href="https://www.instagram.com/adopt/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram</a>
          <a
            class="block leading-tight md:inline"
            href="https://www.linkedin.com/company/weareadopt/"
            target="_blank"
            rel="noopener noreferrer"
          >LinkedIn</a>
        </div>
      </div>

      <div class="flex-col md:flex">
        <p>©Adopt {{ currentYear }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.backgroundStudio {
  @apply bg-black text-white;
}
</style>
