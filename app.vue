<script setup lang="ts">
// Initialize store
await Promise.all([
  await useShop().init(),
  await useLocalization().localize(),
  await useCart().retrieveCart(),
])
const route = useRoute()
const isShop = computed(() => {
  return route.path === '/' || route.path === '/'
})

// Log Apollo errors to console
useNuxtApp().hook('apollo:error', (error) => {
  console.error(error)
})

const isShopValid = computed(() => !!useShop().shop.value?.id || false)

const { shop } = useShop()
useHead({
  titleTemplate: (titleChunk?: string) =>
    titleChunk
      ? `${titleChunk} | ${shop.value?.name}`
      : shop.value?.name || 'Shopify Nuxt',
})
</script>

<template>
  <div :class=" isShop ? '	' : 'bgW ' ">
    <NuxtLayout>
      <NuxtPage>
        <slot />
      </NuxtPage>
    </NuxtLayout>
  </div>
</template>

<style>
@font-face {
  font-family: "PP-Neue-Montreal";
  src: url("./assets/PPNeueMontreal-Regular.woff") format("woff"),
    url("./assets/PPNeueMontreal-Regular.woff2") format("woff2");
  font-display: swap;
}

@font-face {
  font-family: "PP-Neue-Montreal-Medium";
  src: url("./assets/PPNeueMontreal-Medium.woff") format("woff"),
    url("./assets/PPNeueMontreal-Medium.woff2") format("woff2");
  font-display: swap;
}

@font-face {
  font-family: "PP-Neue-Montreal-Semibold";
  src: url("./assets/PPNeueMontreal-SemiBold.woff") format("woff"),
    url("./assets/PPNeueMontreal-SemiBold.woff2") format("woff2");
  font-display: swap;
}

@font-face {
  font-family: "PP-Neue-Montreal-Bold";
  src: url("./assets/PPNeueMontreal-Bold.woff") format("woff"),
    url("./assets/PPNeueMontreal-Bold.woff2") format("woff2");
  font-display: swap;
}

@font-face {
  font-family: "Judge";
  src: url("./assets/Judge-Bold.woff") format("woff");
  font-display: swap;
}
/*
@font-face {
  font-family: "Judge";
  src: url("Judge-Bold.ttf") format("truetype");
} */

/* transitions */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active .site-header, .fade-leave-active .site-header {
  transition: opacity 0.5s;
  transition-delay: .6s;
}

html {
  @apply font-body  text-md xl:text-desktopFont min-[1900px]:text-lg tracking-wide;
}

html  {
  scroll-behavior: smooth;
}

body {
  transition: color 0.5s, background-color 0.5s;
}
h1 {
  @apply font-judge;
}

.bgW {
  background: white !important;
}

.bgW header {
  color:black !important;
}
</style>
