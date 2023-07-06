<script setup>
import { SanityBlocks } from 'sanity-blocks-vue-component'
const route = useRoute()
const query = groq`*[_type == "legal" && slug.current == "${route.params.id}"][0]`
const sanity = useSanity()
/* fetch single post from sanity */
const { data: legal } = await useAsyncData('legal', () => sanity.fetch(query))
</script>

<template>
  <div v-if="legal" class="px-4 mx-auto mt-6 overflow-x-hidden md:max-w-screen-lg">
    <div>
      <h1 class="pb-24 text-2xl">
        {{ legal.title }}
      </h1>
      <SanityBlocks :blocks="legal.body" />
    </div>
  </div>
</template>
