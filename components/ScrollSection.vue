<script setup>
import { onIntersect } from '../composables/onIntersect'

const props = defineProps({
  bgColor: {
    type: String,
    required: true,
  },
})
const observer = ref({})
const scrollRef = ref({})
const onEnter = () => {
  document.body.setAttribute('class', props.bgColor)
  console.log('entered')
  console.log(props.bgColor)
}

const onExit = () => {
  console.log('exited')
}
// When the component is mounted, start observing
onMounted(() => {
  observer.value = onIntersect(scrollRef.value, onEnter, onExit, false, {
    rootMargin: '0px',
    threshold: 0.4,
  })
})

// When the component is removed, disconnect the observer (clean-up step)
onUnmounted(() => {
  observer.value.disconnect()
  document.body.setAttribute('class', '#FFFFFF')
})
</script>

<template>
  <section ref="scrollRef" class="block w-full scrollSection">
    <slot />
  </section>
</template>

<style>
.scrollSection {
  min-height: 500px;
}
</style>
