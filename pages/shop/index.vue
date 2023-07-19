<script setup>
const props = defineProps(['collection'])
/* sanity groq query */
const query = groq`{ "collection": *[_type == "collection"] {
  store {
    title,
  },
  abbreviated,
  linkCollection -> {
    slug {
     current
    }
  },
  vector {
    asset-> {
        url,
        altText
      }
  },

  modules [] {
    productWithVariant {
     product -> {
       images [] {
      asset-> {
        url,
        altText
      }
      },
       store {
       slug {
         current
       },
       title,
      priceRange {
        minVariantPrice
      }
       
       }
     }
    }
  }
}
}`
const sanity = useSanity()
/* pagination */
const results = ref({})
const count = ref('')
const perPage = ref(6)
const page = ref(1)
const loadingNext = ref(false)
const loadingPrev = ref(false)
/* sanity fetch */
const { data } = await useAsyncData('collection', () => sanity.fetch(query))
results.value = data.value.results
count.value = data.value.count

useHead({
  title: computed(() => 'Shop | Adopt | Sport, Athletes, Culture'),
})
</script>

<template>
  <div class="container px-6 mx-auto md:px-6 lg:px-24 md:py-10">
    <div class="md:mb-16 pt-36 2xl:mt-64 w-full md:w-[50%]">
      <h1 class="font-headline">
        The Adopt Shop
      </h1>
      <p class="mb-0">
        Curated products inspired by the world of sport, athletes and culture. 100% of proceeds from the sale of these items are contributed to support access to youth sports for girls.
      </p>
    </div>
    <div v-for="p in data.collection" :key="p.id" class="my-6  md:my-0">
      <div class="relative grid gap-6 mx-auto md:pt-10 md:grid-cols-2">
        <div class="relative collectionTile min-h-[520px] ">
          <div>
            <div v-if="p.linkCollection" class="collection">
              <NuxtLink :to="`/stories/${p.linkCollection.slug.current}`">
                <nuxt-picture
                  v-if="p.vector"
                  :src="$urlFor(p.vector.asset.url).url()"
                  :alt="p.store.title"
                />
                <h2 class="md:w-3/5 w-4/5 mt-6 md:mt-3 uppercase md:px-0 text-headline md:text-mobilexl font-judge">
                  {{ p.store.title }} Collection
                </h2>
              </NuxtLink>
              <NuxtLink class="text-md pt-10" :to="`/stories/${p.linkCollection.slug.current}`">
                Learn More
              </NuxtLink>
            </div>
          </div>
        </div>
        <div v-for="module in p.modules" :key="module.id" class="relative post mb-0 md:mb-16 ">
          <NuxtLink
            :key="module.productWithVariant.product.store.title"
            :to="`/shop/${module.productWithVariant.product.store.slug.current}`"
            class="block "
          >
            <nuxt-picture
              :src="$urlFor(module.productWithVariant.product.images[0].asset.url).url()"
              :alt="p.store.title"
              width="660"
              height="941"
              class="productPhoto"
            />
            <span class="block mt-4 leading-none text-md font-heading "> {{ p.abbreviated }} </span>
            <span v-if="p.store.title === 'Adopt' " class="leading-none text-md font-heading ">{{ module.productWithVariant.product.store.title.replace("Adopt ", "") }} </span>
            <span v-if="p.store.title === 'Adopt x Mia Lee' " class="leading-none text-md font-heading ">{{ module.productWithVariant.product.store.title.replace("Adopt x Mia Lee ", "") }} </span>
            <p class="leading-none text-md font-heading ">
              ${{ module.productWithVariant.product.store.priceRange.minVariantPrice }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.posts {
  margin: 2rem 0;
}

.collection img {
  @apply w-full;
   object-fit: cover;
}
</style>
