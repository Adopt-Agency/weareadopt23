import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return {
        savedPosition,
        behavior: 'smooth',
      }
    }
    if (to.hash) {
      console.log('Go to hash', to.hash)

      return {
        el: '#studio',
        top: 30,
        behavior: 'smooth',
      }
    }
  },
}
