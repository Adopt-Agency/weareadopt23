<script setup lang="ts">
const props = withDefaults(defineProps<{
  outline?: boolean
  color?: 'primary' | 'secondary' | 'dark' | 'gray' | 'light' | 'green' | 'red' | 'yellow'
  size?: 'sm' | 'base' | 'lg'
  fromGroup?: boolean
  stretch?: boolean
  pill?: boolean
  to?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
  loading?: boolean
}>(), {
  color: 'primary',
  size: 'base',
  type: 'button',
  fromGroup: false,
  stretch: false,
  pill: false,
  disabled: false,
  iconPosition: 'left',
  loading: false,
  outline: false,
})

const slots = useSlots()

// if 'to' prop is not an absolute URL, use NuxtLink
const is = ['http', 'https', 'www'].some(str => props.to?.includes(str)) ? 'a' : resolveComponent('NuxtLink')

const isIconOnly = computed(() => (slots.default && !slots.default().length) && props.icon)
</script>

<template>
  <component
    :is="to ? is : 'button'"
    :to="is === 'NuxtLink' ? to : undefined"
    :href="is === 'a' ? to : undefined"
    :disabled="disabled"
    :type="type || 'button'"
    class="relative items-center justify-center font-medium text-center text-white bg-black border rounded-full outline-none focus:outline-none"
  >
    <span
      v-if="!isIconOnly"
      :class="[
        size === 'sm' && 'px-2',
        size === 'base' && 'px-3',
        size === 'lg' && 'px-5',
      ]"
    >
      <slot />
    </span>

    <Icon
      v-if="iconPosition === 'right' && icon"
      :name="loading ? 'mdi:loading' : icon"
      :class="[
        size === 'sm' && 'w-5 h-5',
        size === 'base' && 'w-6 h-6',
        size === 'lg' && 'w-7 h-7',
        loading && 'animate-spin',
      ]"
    />
  </component>
</template>
