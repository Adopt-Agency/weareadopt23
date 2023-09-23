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
    image,
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
       variants [] -> {
        store {
          inventory {
            isAvailable
          }
        }
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
        <div v-if="p.linkCollection" class="relative collectionTile min-h-[520px] ">
          <div>
            <div class="collection">
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
          <div v-if="module.image">
            test
          </div>
          <div v-else>
            <NuxtLink
              :key="module.productWithVariant.product.store.title"
              :to="`/shop/${module.productWithVariant.product.store.slug.current}`"
              class="block "
            >
              <div v-if="module.productWithVariant.product.store.variants[0].store.inventory.isAvailable === false" class="flex items-center gap-2">
                <nuxt-picture
                  :src="$urlFor(module.productWithVariant.product.images[0].asset.url).url()"
                  :alt="p.store.title"
                  width="660"
                  style="opacity:0.5;"
                  height="941"
                  class="productPhoto"
                />
              </div>

              <div v-else>
                <nuxt-picture
                  :src="$urlFor(module.productWithVariant.product.images[0].asset.url).url()"
                  :alt="p.store.title"
                  width="660"
                  height="941"
                  class="productPhoto"
                />
              </div>

              <span v-if=" module.productWithVariant.product.store.title.includes('Adopt x Mia Lee') " class="leading-none text-md font-heading"><span class="block mt-4 leading-none text-md font-heading"> Adopt x Mia Lee</span> {{ module.productWithVariant.product.store.title.replace("Adopt x Mia Lee ", "") }} </span>
              <span v-else class="leading-none text-md font-heading  "><span class="block mt-4 leading-none text-md font-heading"> Adopt</span> {{ module.productWithVariant.product.store.title.replace("Adopt ", "") }} </span>
              <div v-if="module.productWithVariant.product.store.variants[0].store.inventory.isAvailable === false" class="flex items-center gap-2">
                <p class="leading-none text-md font-heading ">
                  SOLD OUT
                </p>
              </div>

              <div v-else class="flex gap-2">
                <p class="leading-none text-md font-heading ">
                  ${{ module.productWithVariant.product.store.priceRange.minVariantPrice }}
                </p>
              </div>
            </NuxtLink>
          </div>
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
