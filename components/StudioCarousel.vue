<script setup>
import { Autoplay, Grid } from 'swiper'

const modules = reactive([Grid, Autoplay])
const carouselPics = [
  {
    image: 'https://cdn.sanity.io/images/vaa5yjnh/production/f49d73e7fa73c5695ac223bc449196eb62314cb9-1080x1080.png',
    title: '01 Brand Color',
    id: 1,
  },

  {
    image: 'https://cdn.sanity.io/images/vaa5yjnh/production/b9c394ef1d33e986050ec1628c9e841eabd98485-1080x1080.jpg',
    title: '02 Coastal',
    id: 2,
  },

  {
    image: 'https://cdn.sanity.io/images/vaa5yjnh/production/8f295f323107c251ec64d62a9e54af944eb9b9f1-1080x1080.jpg',
    title: '03 Champs',
    id: 3,
  },
  {
    image: 'https://cdn.sanity.io/images/vaa5yjnh/production/b12b723e70515715c314798dc3e3deffec91c94f-1080x1080.jpg',
    title: '04_Studio_Mia_Lee',
    id: 4,
  },
  {
    image: 'https://cdn.sanity.io/images/vaa5yjnh/production/f0b62d12492cd90137f9a7ee9c5edbcc61150ced-1080x1080.jpg',
    title: '05_Community',
    id: 5,
  },
  {
    image: 'https://cdn.sanity.io/images/vaa5yjnh/production/365f0c93486439138c4b943da21ea14c86536f6d-1080x1080.jpg',
    title: '06_OpportunitySQR',
    id: 6,
  },

  {
    image: 'https://cdn.sanity.io/images/vaa5yjnh/production/8a3ac6cd086a37843fd8e4be7c14b6a21f6c04c2-1080x1080.jpg',
    title: '07_Printed_Matters',
    id: 7,
  },

  {
    image: 'https://cdn.sanity.io/images/vaa5yjnh/production/b360e5384a97d16161f479c3a9a581e8b72d0067-1080x1080.jpg',
    title: '08_ScreenTimesSQR',
    id: 8,
  },
  {
    image: 'https://cdn.sanity.io/images/vaa5yjnh/production/5c831ed5c0e9fefab2a2c83b16ea59d4bc43f0df-1080x1080.jpg',
    title: '09_Signage',
    id: 9,
  },
  {
    image: 'https://cdn.sanity.io/images/vaa5yjnh/production/db995af0a760ae6cf0edbbbde7b5753bf58f041b-1080x1080.jpg',
    title: '10_Blur',
    id: 10,
  },
  {
    image: 'https://cdn.sanity.io/images/vaa5yjnh/production/23d73a39e107fe31f56dbf24f7b6978f7489450b-1080x1080.jpg',
    title: '11_Sketch_Early',
    id: 11,
  },

  {
    image: 'https://cdn.sanity.io/images/vaa5yjnh/production/ef3d5a06a49e9a1c09c7ec08ee594c758dc35c6b-1080x1080.jpg',
    title: '12_ChipsQuac',
    id: 12,
  },

  {
    image: 'https://cdn.sanity.io/images/vaa5yjnh/production/3e1208841b1fd58e64e39f3fe5d0c8be3ffa63d9-1080x1080.jpg',
    title: '13_Whiteboard_Reps',
    id: 13,
  },

]
</script>

<template>
  <div class="studioCarousel">
    <Swiper
      :slides-per-view="1.25"
      :pagination="{
        clickable: true,
      }"

      :speed="6000"

      :breakpoints="{

        768: {
          slidesPerView: 1.25,

        },
        1024: {
          slidesPerView: 2.5,
        },

        1200: {
          slidesPerView: 4.5,
        },
      }"
      :autoplay="{
        delay: 1,
        disableOnInteraction: true,
      }"
      :modules="modules"
      class="mySwiper"
    >
      <SwiperSlide v-for="slide in carouselPics" :key="slide" class="relative swipeImg">
        <nuxt-picture
          :src="slide.image"
          :alt="slide.title"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style>
.swiper {
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
}

.studioCarousel .scrollSection {
  min-height: auto;
}

.studioCarousel .swiper-slide {
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 0  0 20px 20px;
  z-index:0;

}

.studioCarousel .swiper-wrapper {
  transition-timing-function: linear;

}

.swiper-grid-column>.swiper-wrapper {
  flex-direction: row ;
}

@media (max-width: 768px) {
  .studioCarousel .swiper-slide {
    padding: 0 0px 10px 10px;
  }
}
</style>
