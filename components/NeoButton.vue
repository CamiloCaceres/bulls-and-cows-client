<template>
  <UButton
    :ui="neoBrutalismUI"
    :color="color"
    :label="label"
    :icon="icon"
    :loading="loading"
    :disabled="disabled"
  >
    <slot></slot>
  </UButton>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    default: 'black'
  },
  label: String,
  icon: String,
  loading: Boolean,
  disabled: Boolean
})

const neoBrutalismUI = {
  base: 'transition-transform active:translate-x-1 active:translate-y-1',
  font: 'font-bold uppercase',
  rounded: 'rounded-none',
  shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
  padding: {
    sm: 'px-4 py-2',
    md: 'px-6 py-3',
    lg: 'px-8 py-4'
  },
  variant: {
    solid: 'border-2 border-black bg-{color}-500 hover:bg-{color}-400 text-white',
    outline: 'border-2 border-black bg-white hover:bg-gray-100 text-black'
  }
}
</script>
