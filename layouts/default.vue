<script setup lang="ts">
// Initialize store
await Promise.all([
  await useShop().init(),
  await useLocalization().localize(),
  await useCart().retrieveCart(),
])
const route = useRoute()
const isHome = computed(() => {
  return route.path === '/' || route.path === '/index'
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

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(
      (entry) => {
        entry.target.classList.add('show')
      },
    )
  })
  document.querySelectorAll('.footer').forEach((card) => {
    observer.observe(card)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div class="adopt">
    <SiteHeader />
    <slot />
      <Footer />
  </div>
</template>

<style scoped>
.studio {
  display: block;
}

.footer {
  opacity: 0;

}

.footer.show {
  opacity: 1;
  transition: opacity 0.5s;

  transition-delay: 1.6s;

}
</style>