<script setup>
const props = defineProps(['story'])
/* sanity groq query */
const query = groq`{ "stories": *[_type == "story"] {
    title,
  image ,
  slug {
    current
  },

  } }`
const sanity = useSanity()
/* pagination */
const results = ref({})
const count = ref('')
const perPage = ref(6)
const page = ref(1)
const loadingNext = ref(false)
const loadingPrev = ref(false)
/* sanity fetch */
const { data } = await useAsyncData('stories', () => sanity.fetch(query))
results.value = data.value.results
count.value = data.value.count
</script>

<template>
  <div class="container max-w-screen-lg px-4 py-10 mx-auto ">
    <div class="grid gap-10 mx-auto md:grid-cols-2">
      <div v-for="p in data.stories" :key="p.title">
        <nuxt-picture
          v-if="p.image"
          :src="$urlFor(p.image.asset._ref).url()"
        />
        <NuxtLink :key="p.title" :to="`/stories/${p.slug.current}`">
          {{ p.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style>
.posts {
  margin: 2rem 0;
}
</style>
