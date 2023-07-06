// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'We Are Adopt',
      meta: [
        // <meta name="description" content="My amazing site">
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'We are a minority-owned company that believes in the power of sport, the potential of the athlete and the future of holistic wellness.',
        },
        {
          name: 'og:description',
          content:
            'We are a minority-owned company that believes in the power of sport, the potential of the athlete and the future of holistic wellness.',
        },
        {
          name: 'og:title',
          content: 'We Are Adopt',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'og:image',
          content:
            'https://cdn.sanity.io/images/vaa5yjnh/production/b6481403a829cfbef418b734d6b0533ecf513d35-1040x1040.jpg',
        },
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/icons/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/icons/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/icons/favicon-16x16.png',
        },
        {
          rel: 'manifest',
          href: '/icons/site.webmanifest',
        },
        {
          rel: 'mask-icon',
          href: '/icons/safari-pinned-tab.svg',
          color: '#91FC53',
        },
        {
          rel: 'shortcut icon',
          href: '/favicons/favicon.ico',
        },
      ],
    },
  },

  runtimeConfig: {
    storefrontAccessToken: 'e98b99bf7f5051614563f4d0ee904c70',
    storefrontEndpoint:
      'https://adopt-agency.myshopify.com/api/2023-01/graphql.json',
  },

  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/apollo',
    'nuxt-icon',
    'nuxt-swiper',
    '@nuxtjs/robots',
    '@pinia/nuxt',
    '@nuxtjs/sanity',
    '@nuxt/image-edge',
    '@nuxtjs/tailwindcss',
  ],

  plugins: ['~/plugins/urlResolver', '~/plugins/scroll-behavior.client.ts'],

  apollo: {
    clients: {
      default: './apollo/config.ts',
    },
  },

  vite: {
    build: {
      sourcemap: 'inline',
    },
  },

  imports: {
    dirs: ['stores'],
  },

  sanity: {
    projectId: 'vaa5yjnh',
    dataset: 'production',
    apiVersion: '2022-04-26',
    useCdn: true,
    additionalClients: {
      preview: {
        useCdn: false,
        withCredentials: true,
      },
    },
  },
})
