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

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(
      (entry) => {
        entry.target.classList.add('show')
      },
    )
  })
  document.querySelectorAll('.adopt').forEach((card) => {
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

.adopt .footer {
  opacity: 0;

}

.adopt.show .footer {
  opacity: 1;
  transition: opacity 0.5s;

  transition-delay: 1.6s;

}
</style>
