<script setup lang="ts">
const cart = useCart().cart
const cartLines = useCart().lines

useHead({
  title: computed(() => `Cart (${cartLines.value?.edges?.length || 0})`),
})
</script>

<template>
  <div class="container md:w-3/5 items-center justify-center px-6 min-h-screen mx-auto md:px-6  py-36">
    <div
      v-if="cart?.id"
      class="grid-cols-10 gap-10 md:grid items-center"
    >
      <div class="col-span-10 gap-6 md:col-start-1 md:grid md:col-span-10">
        <div
          v-if="cartLines.edges.length"
          class="md:grid"
        >
          <CartLine
            v-for="line in cartLines.edges.map((edge) => edge.node)"
            :key="line.id"
            :line="line"
          />
          <CartSummary />
        </div>

        <div v-else>
          <h1 class="pt-10 flex items-center justify-center text-lg text-center font-body">
            Your cart is empty.
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>
