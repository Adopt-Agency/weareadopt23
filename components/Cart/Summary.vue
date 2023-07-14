<script setup lang="ts">
const summaryLines = computed(() => ([
  {
    label: 'Tax',
    value: useCart().tax,
  },
  {
    label: 'Subtotal',
    value: useCart().subtotal,
  },
]))
</script>

<template>
  <div class="grid gap-5 pt-6 ">
    <h4 class="font-headline">
      Order Summary
    </h4>

    <div>
      <template
        v-for="line in summaryLines"
        :key="line.label"
      >
        <div
          v-if="line.value.value"
          class="flex justify-between py-2 border-b border-gray-200 text-md"
        >
          <p class="text-gray-500">
            {{ line.label }}
          </p>
          <p>
            <UIPrice :price="line.value.value" />
          </p>
        </div>
      </template>
    </div>

    <div class="flex items-center justify-between">
      <h5>Order Total</h5>
      <h5>
        <UIPrice :price="useCart().total.value" />
      </h5>
    </div>

    <UIButton
      color="primary"
      stretch
      class="justify-center block w-full px-10 py-2 mx-auto mt-6 text-white transition duration-300 ease-out bg-black rounded-full hover:ease-in hover:border md:inline-block hover:text-black hover:bg-white"
      :disabled="!useCart().checkoutUrl?.value"
      :to="useCart().checkoutUrl?.value"
    >
      Checkout
    </UIButton>
  </div>
</template>
