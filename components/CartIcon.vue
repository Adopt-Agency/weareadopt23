<script>
export default {
  computed: {
    cartVal() {
      return useCart().linesCount.value
    },

  },
}
</script>

<template>
  <div class="md:w-[calc(50%-70px)] md:w-[calc(50%-100px)]  relative right-[1rem] flex justify-end">
    <NuxtLink to="/products" class="hidden link pr-2 md:inline text-inherit">
      Shop
    </NuxtLink><NuxtLink to="/cart" class="no-underline ">
      <span v-if="cartVal > 0">( {{ cartVal }} )</span>
    </NuxtLink>
  </div>
</template>

<style scoped>
.link.router-link-exact-active {
  @apply underline underline-offset-4	;
}
a.router-link-exact-active.no-underline {
  text-decoration: none !important;
}
</style>
