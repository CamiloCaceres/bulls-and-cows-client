<template>
    <UInput
      variant="neobrutalist"
      type="number"
      :model-value="displayValue"
      @update:model-value="updateValue"
      @input="handleInput"
    />
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const internalValue = ref('')
  
  const displayValue = computed(() => internalValue.value === '' ? '' : parseInt(internalValue.value))
  
  const updateValue = (newValue) => {
    if (newValue === '') {
      internalValue.value = ''
    } else {
      const numValue = parseInt(newValue)
      if (!isNaN(numValue) && numValue >= 0 && numValue <= 9999) {
        internalValue.value = numValue.toString().padStart(4, '0')
      }
    }
  }
  
  const handleInput = (event) => {
    const inputValue = event.target.value
    if (inputValue.length > 4) {
      event.target.value = inputValue.slice(0, 4)
    }
  }
  </script>