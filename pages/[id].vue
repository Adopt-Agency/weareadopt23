<script setup>
import { SanityBlocks } from 'sanity-blocks-vue-component'
const route = useRoute()
const query = groq`*[_type == "legal" && slug.current == "${route.params.id}"][0]`
const sanity = useSanity()
/* fetch single post from sanity */
const { data: legal } = await useAsyncData('legal', () => sanity.fetch(query))
useHead({
  title: computed(() => 'Legal | Adopt | Sport, Athletes, Culture'),
})
</script>

<template>
  <div v-if="legal" class="px-4 mx-auto pt-36 container overflow-x-hidden ">
    <div class="flex md:flex-row flex-col  gap-10">
      <h1 class="md:pb-24 pb-2 md:w-1/4 w-full  ">
        {{ legal.title }}
      </h1>
      <div
        class="md:w-3/4 w-full"
      >
        <SanityBlocks :blocks="legal.body" />
      </div>
    </div>
  </div>
</template>
