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
  title: computed(() => 'The Adopt Shop'),
})
</script>

<template>
  <div class="container px-6 mx-auto md:px-6 lg:px-24 md:py-10">
    <div class="md:mb-16 pt-36 2xl:mt-64 w-full md:w-[50%]">
      <h1 class="font-headline">
        The Adopt Shop
      </h1>
      <p class="mb-0">
        Curated products inspired by the world of sport, athletes and culture. 100% of proceeds from the sale of these items are contributed to support access to youth sports for girls in Portland, Oregon.
      </p>
    </div>
    <div v-for="p in data.collection" :key="p.id" class="my-6  md:my-0">
      <div class="relative grid gap-6 mx-auto md:pt-10 md:grid-cols-2">
        <div class="relative collectionTile min-h-[520px] ">
          <div class="absolute w-full h-full">
            <NuxtLink v-if="p.linkCollection" :to="`/stories/${p.linkCollection.slug.current}`">
              <nuxt-picture
                :src="$urlFor(p.vector.asset.url).url()"
                :alt="p.store.title"
              />
              <h2 class="absolute w-3/5 text-white text-collection sm:w-1/2 font-headline bottom-20 sm:top-64 md:top-auto md:bottom-60 left-4 md:left-10">
                {{ p.store.title }} Collection
              </h2>
            </NuxtLink>
            <div v-else>
              <nuxt-picture
                :src="$urlFor(p.vector.asset.url).url()"
                :alt="p.store.title"
              />
              <h2 class="absolute w-3/5 text-white text-collection sm:w-1/2 font-headline bottom-20 sm:top-64 md:top-auto md:bottom-60 left-4 md:left-10">
                {{ p.store.title }} Collection
              </h2>
            </div>
          </div>
        </div>
        <div v-for="module in p.modules" :key="module.id" class="relative post mb-0 md:mb-16 ">
          <NuxtLink
            :key="module.productWithVariant.product.store.title"
            :to="`/products/${module.productWithVariant.product.store.slug.current}`"
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

.post img {
  @apply w-full min-h-[480px] ;
   object-fit: cover;
}

@media (max-width: 850px) {

    .collectionTile h2 {
      top: 50%;
    }

    .collectionTile img {
      width: 100%;
    }

  }

  @media (max-width: 768px) {
    .collectionTile {
      min-height: 800px ;
      margin-bottom: 40px;
    }
    .collectionTile h2 {
      top: 80%;
    }
  }

  @media (max-width: 650px) {
    .collectionTile {
      min-height: 650px ;
      margin-bottom: 00px;
    }
    .collectionTile h2 {
      top: 60%;
    }
  }

  @media (max-width: 480px) {
    .collectionTile {
      min-height: 480px ;
      margin-bottom: 00px;
    }
    .collectionTile h2 {
      top: 60%;
    }
  }
</style>
