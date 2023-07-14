<script setup lang="ts">
import type { CartLine } from '@/types/shopify'

const props = defineProps<{
  line: CartLine
}>()

const loading = ref(false)
const image = props.line.merchandise.image || props.line.merchandise.product.featuredImage

const stagedQuantity = ref(props.line.quantity)
const changeQuantity = async (quantity: number) => {
  loading.value = true
  await useCart().update([{
    id: props.line.id,
    quantity,
  }]).finally(() => {
    loading.value = false
  })
}
watch(stagedQuantity, (changedQuantity, oldQuantity) => {
  if (changedQuantity !== oldQuantity)
    changeQuantity(changedQuantity)
})

const loadingRemove = ref(false)
const removeLine = async () => {
  loadingRemove.value = true
  await useCart().remove([props.line.id]).finally(() => {
    loadingRemove.value = false
  })
}
</script>

<template>
  <div class="gap-4 py-6 md:flex border-t border-gray">
    <!-- Line Image -->
    <div
      v-if="image?.id"
      class="md:w-[300px] "
    >
      <img
        :src="image.url"
        :alt="image.altText || ''"
        class="object-cover w-full h-full"
      >
    </div>

    <!-- Line Details -->
    <div class="flex-col justify-between flex-1 md:flex">
      <div class="items-start my-10 md:my-0 justify-between md:flex">
        <div class="flex flex-col md:gap-2">
          <NuxtLink class="leading-tight" :to="`/products/${line.merchandise.product.handle}`">
            <span class="block leading-tight"> Adopt</span> {{ line.merchandise.product.title.replace("Adopt ", "") }}
          </NuxtLink>
          <div class="flex md:gap-2">
            <p
              v-for="option in line.merchandise.selectedOptions"
              :key="option.name"
              class="text-gray-500 leading-tight text-md"
            >
              {{ option.name }} — {{ option.value }}
            </p>
          </div>
        </div>
        <div>
          <UIPrice class="block" :price="line.cost.subtotalAmount" />
        </div>
      </div>
      <div class="items-center justify-between ">
        <!-- Line Actions -->
        <div class="flex items-center gap-2 w-full pb-6 justify-between	">
          <Icon
            v-if="loading"
            name="ion:load-c"
            class="w-5 h-5 text-gray-500 animate-spin"
          />
          <select
            v-if="line.merchandise.quantityAvailable > 1"
            v-model="stagedQuantity"
          >
            <option
              v-for="quantity in Array.from({ length: Math.min(line.merchandise.quantityAvailable, 10) }, (_, i) => i + 1)"
              :key="quantity"
              :value="quantity"
            >
              {{ quantity }}
            </option>
          </select>
          <button
            color="gray"
            outline
            icon="ion:trash"
            size="sm"
            :loading="loadingRemove"
            :disabled="loading"
            @click="removeLine"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
