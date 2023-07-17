<script setup>
import { SanityBlocks } from 'sanity-blocks-vue-component'
const route = useRoute()

const query = groq`*[_type == "story" && slug.current == "${route.params.id}"][0] {
  title,
  subtitle,
  content,
  leftContent,
  rightContent,
  signoff,
  image {asset {
    _ref
    }},
    lastImage {asset {
    _ref
    }},
  modules [ ] {
    imgSizes,
    variant,
    width,
    length,
    image {asset {
    _ref
    }},
    body [] {
      children [] {
    text
      }
    }
  }
}
`
const sanity = useSanity()
/* fetch single post from sanity */
const { data: story } = await useAsyncData('story', () => sanity.fetch(query))

useHead({ title: story.value?.title })
</script>

<template>
  <div v-if="story" class="md:px-4 mx-auto mt-6 ax-w-screen-lg bg-orange">
    <div class="md:container mx-auto md:px-6 lg:px-24 py-20">
      <nuxt-picture :src="$urlFor(story.image.asset._ref).url()" />

      <h1 class=" mt-20 uppercase px-6 md:px-0 md:text-xl text-mobilexl font-judge">
        {{ story.title }}
      </h1>
      <h3 class="px-6 md:px-0">
        {{ story.subtitle }}
      </h3>
      <div class="my-10 md:my-36 px-6 md:px-0 md:flex nowrap space-between gap-10">
        <div class="md:w-1/2 storyBlock">
          <SanityBlocks :blocks="story.leftContent" />
        </div>
        <div class="md:w-1/2 storyBlock">
          <SanityBlocks :blocks="story.rightContent" />
        </div>
      </div>
      <div class="grid-cols-2 md:gap-6  md:grid">
        <div
          v-for="module in story.modules"
          :key="module.id"
          class="pb-2 md:pb-0"
          :class="[module.length, module.width, module.imgSizes, module.variant]"
        >
          <div v-if="module.image">
            <div :class="module.variant">
              <nuxt-picture :src="$urlFor(module.image.asset._ref).url()" />
            </div>
          </div>
        </div>
      </div>
      <div class="md:w-1/2 mt-6 mb-24 px-6 md:px-0">
        <SanityBlocks :blocks="story.signoff" />
      </div>
      <div class="flex md:mt-0 mt-36 justify-center">
        <nuxt-picture :src="$urlFor(story.lastImage.asset._ref).url()" />
      </div>
    </div>
  </div>
</template>

<style>
.full-width {
  @apply col-span-full;
}
.two-col {
  @apply col-auto;
}

.med-width {
  @apply md:w-full;
}

.storyBlock p {
  @apply mb-10;
}
.top-height {
  @apply self-start;
}

.right img, .left img {
  @apply w-full;
}

.bottom-height {
  @apply self-end;
}

.centered {
  @apply self-center;
}

.full-image {
  @apply w-full;
}
</style>
