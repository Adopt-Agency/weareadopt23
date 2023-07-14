<script setup lang="ts">
import { SanityBlocks } from 'sanity-blocks-vue-component'
import { Pagination } from 'swiper'
import type { Product, ProductVariant } from '@/types/shopify'
import ProductQuery from '@/apollo/queries/product'

interface ProductReturn {
  product: Product
}
const { result, loading, onResult } = useQuery<ProductReturn>(
  ProductQuery,
  {
    handle: useRoute().params.handle,
    country: useLocalization().countryCode.value,
  },
  {},
)
// if there is only one variant, select it
// otherwise, leave it null
const selectedVariant = ref<ProductVariant | null>(null)
const assignInitialVariant = () => {
  selectedVariant.value = result.value?.product.variants.edges[0].node
}

onResult(assignInitialVariant)
onMounted(assignInitialVariant)
const loadingAddToCart = ref(false)
const addToCart = async () => {
  loadingAddToCart.value = true
  if (!selectedVariant.value?.id)
    return
  await useCart()
    .add([
      {
        merchandiseId: selectedVariant.value.id,
      },
    ])
    .finally(() => {
      loadingAddToCart.value = false
    })
}
</script>

<template>
  <div>
    <template v-if="!loading">
      <template v-if="result?.product?.id">
        <Head>
          <Title>
            {{
              result.product.seo.title || result.product.title || undefined
            }}
          </Title>
          <Meta
            name="description"
            :content="
              result.product.seo.description
                || result.product.description
                || useShop().shop.value?.description
                || undefined
            "
          />
          <Meta
            name="og:image"
            :content="result.product.featuredImage || undefined"
          />
        </Head>
        <div class="container px-4 pt-16 mx-auto md:mt-0 md:px-6 lg:px-24 md:py-16">
          <div class="w-full py-2 mx-auto xl:py-6 md:px-0 md:flex">
            <div v-if="result.product.media.edges.length" class="relative w-full lg:w-1/2 top-12">
              <div class="block md:hidden">
                <MobileCarousel>
                  <SwiperSlide
                    v-for="(media, i) in result.product.media.edges.map(
                      (edge) => edge.node,
                    )"
                    :key="i"
                  >
                    <nuxt-picture
                      :src="media.previewImage?.url"
                      :alt="media.alt || media.previewImage?.altText || ''"
                      width="660"
                      height="941"
                      class="w-full product-photo"
                    />
                  </SwiperSlide>
                </MobileCarousel>
              </div>
              <div class="hidden md:block">
                <div
                  v-for="(media, i) in result.product.media.edges.map(
                    (edge) => edge.node,
                  )"
                  :key="i"
                >
                  <div class="mb-6">
                    <nuxt-picture
                      :src="media.previewImage?.url"
                      :alt="media.alt || media.previewImage?.altText || ''"
                      width="660"
                      height="941"
                      class="w-full product-photo"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full py-4 pl-0 bg-white md:h-full md:sticky px:4 md:px-0 md:pl-16 xl:pl-24 lg:w-3/4 xl:w-1/2 max-[1400px]:top-12 lg:top-0 min-[1500px]:top-1/4">
              <h1 class="mt-12 text-lg md:mt-0 font-heading leading-tight	">
                <span class="block"> Adopt</span> {{ result.product.title.replace("Adopt ", "") }}
              </h1>
              <UIPriceRange
                v-if="!selectedVariant?.id"
                as="h4"
                :price-range="result.product.priceRange"
                :compare-at-price-range="result.product.compareAtPriceRange"
              />
              <UIPrice
                v-else
                as="h4"
                class="text-lg font-heading 2xl:mb-0 leading-tight	"
                :price="selectedVariant?.price"
                :compare-at-price="selectedVariant?.compareAtPrice || undefined"
              />

              <div
                class="my-2 text-md 2xl:my-6 md:w-4/5 "
                v-html="result.product.descriptionHtml"
              />

              <div class="flex flex-wrap gap-2 my-6 md:my-10 ">
                <div v-for="option in result.product.options" :key="option.id" class="">
                  <p class="text-md">
                    {{ option.name }}  —  {{ selectedVariant?.title }}
                  </p>

                  <!-- <div v-for="value in option.values" :key="value.id">
                    <input
                      :id="value.id"
                      v-model="selectedVariant"
                      type="radio"
                      :value="value"
                      class="hidden"
                      :class="{ ' opacity-70': value.quantityAvailable === 0 }"
                      :disabled="value.quantityAvailable === 0"
                    >

                    <label
                      class="cursor-pointer text-md "
                      :for="value.id"
                      @click="selectedVariant = !selectedVariant"
                    >
                      {{ value }}
                    </label>
                  </div> -->

                  <div class="flex flex-wrap gap-2 mt-6">
                    <div
                      v-for="variant in result.product.variants.edges.map(
                        (edge) => edge.node,
                      )"
                      :key="variant.id"
                      class="my-2 md:my-0"
                    >
                      <input
                        :id="variant.id"
                        v-model="selectedVariant"
                        type="radio"
                        :value="variant"
                        class="hidden"
                        :class="{ ' opacity-70': variant.quantityAvailable === 0 }"
                        :disabled="variant.quantityAvailable === 0"
                      >
                      <label
                        class="cursor-pointer text-[14px] "
                        :for="variant.id"
                        @click="selectedVariant = !selectedVariant"
                      >
                        {{ variant.title }}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <UIButton
                  :disabled="!selectedVariant?.id"
                  aria-label="Add to Cart"
                  class="block w-64 px-10 py-2 text-white transition duration-300 ease-out bg-black rounded-md md:mt-6 md:mx-auto xl:mt-0 hover:ease-in hover:border md:inline md:w-64 hover:text-black hover:bg-white"
                  :loading="loadingAddToCart"
                  @click="addToCart"
                >
                  Add to Bag
                </UIButton>
              </div>
            </div>
          </div>
          <div v-for="tag in result.product.tags">
            <div v-if="tag === 'Mia Lee'" class="flex flex-column md:flex-row mt-20 gap-10">
              <div class="w-full md:w-1/2">
                <p>
                  Adopt x Mia Lee Collection
                </p>
                <p>
                  In anticipation and celebration of an epic summer of women’s soccer, we’ve partnered with artist and proud Chicago native Mia Lee to create a product collection that captures the look, energy, and spirit of the women’s soccer experience today - raw, striking and passionate.
                </p>
              </div>
              <div class="w-full md:w-1/2">
                <p>
                  All profits will benefit Street Soccer, USA, an organization focused on increasing youth participation in sport by removing financial barriers, with a focus on social impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>
      <NotFound v-else />
    </template>
  </div>
</template>

<style>
.product-photo img {
  @apply w-full;
}

.productImg .swiper-slide {
  padding: 0;
}

label {
 @apply w-[60px] py-2 block bg-lightGray text-[14px] rounded-md text-center;
}

input + label {
  @apply border-2 border-lightGray ;
}

input:disabled + label{
  @apply opacity-30;
}

input:checked + label {
  @apply border-2 border-black decoration-solid  ;
}

:root {
  /* Color */
  --vc-clr-primary: #000;
  --vc-clr-secondary: #090f207f;
  --vc-clr-white: #ffffff;

  /* Icon */
  --vc-icn-width: 1.2em;

  /* Navigation */
  --vc-nav-width: 30px;
  --vc-nav-height: 30px;
  --vc-nav-border-radius: 0;
  --vc-nav-color: var(--vc-clr-primary);
  --vc-nav-color-hover: var(--vc-clr-secondary);
  --vc-nav-background: transparent;

  /* Pagination */
  --vc-pgn-width: 12px;
  --vc-pgn-height: 4px;
  --vc-pgn-margin: 4px;
  --vc-pgn-border-radius: 0;
  --vc-pgn-background-color: var(--vc-clr-secondary);
  --vc-pgn-active-color: var(--vc-clr-primary);
}
.carousel {
  position: relative;
  text-align: center;
  box-sizing: border-box;
}

.carousel * {
  box-sizing: border-box;
}

.carousel__track {
  display: flex;
  margin: 0;
  padding: 0;
  position: relative;
}

.carousel__viewport {
  overflow: hidden;
}

.carousel__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  background: var(--vc-nav-background);
  border-radius: var(--vc-nav-border-radius);
  width: var(--vc-nav-width);
  height: var(--vc-nav-height);
  text-align: center;
  font-size: var(--vc-nav-height);
  padding: 0;
  color: var(--vc-nav-color);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border: 0;
  cursor: pointer;
  margin: 0 10px;
  top: 50%;
  transform: translateY(-50%);
}

.carousel__prev:hover,
.carousel__next:hover {
  color: var(--vc-nav-color-hover);
}

.carousel__next--disabled,
.carousel__prev--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.carousel__prev {
  left: 0;
}

.carousel__next {
  right: 0;
}

.carousel--rtl .carousel__prev {
  left: auto;
  right: 0;
}

.carousel--rtl .carousel__next {
  right: auto;
  left: 0;
}
.carousel__icon {
  width: var(--vc-icn-width);
  height: var(--vc-icn-width);
  fill: currentColor;
}
.carousel__slide {
  scroll-snap-stop: auto;
  flex-shrink: 0;
  margin: 0;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  /* Fix iOS scrolling #22 */
  transform: translateZ(0);
}
.carousel__pagination {
  display: flex;
  justify-content: center;
  list-style: none;
  line-height: 0;
  margin: 10px 0 0;
}

.carousel__pagination-button {
  display: block;
  border: 0;
  margin: 0;
  cursor: pointer;
  padding: var(--vc-pgn-margin);
  background: transparent;
}

.carousel__pagination-button::after {
  display: block;
  content: '';
  width: var(--vc-pgn-width);
  height: var(--vc-pgn-height);
  border-radius: var(--vc-pgn-border-radius);
  background-color: var(--vc-pgn-background-color);
}

.carousel__pagination-button:hover::after,
.carousel__pagination-button--active::after {
  background-color: var(--vc-pgn-active-color);
}
</style>
