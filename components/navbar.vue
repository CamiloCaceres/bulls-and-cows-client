<template>
  <nav class="bg-bg p-8 font-custom border-b-4 border-black">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center">
        <NuxtLink to="/" class="text-4xl font-bold text-white bg-yellow-400 px-4 py-2 border-4 border-black shadow-[4px_4px_0_0_#000]">
          B&C
        </NuxtLink>
        
        <div class="hidden md:flex space-x-4">

        </div>
        
        <User />
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden bg-green-500 text-white p-2 border-4 border-black shadow-[4px_4px_0_0_#000] hover:bg-green-600 transition-colors active:shadow-none active:translate-x-1 active:translate-y-1"
        >
          <Icon name="lucide:menu" class="w-8 h-8" />
        </button>
      </div>
      
      <div v-if="isMenuOpen" class="mt-4 md:hidden">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.href"
          :to="item.href"
          class="flex items-center bg-pink-400 text-white px-4 py-2 text-xl border-4 border-black shadow-[4px_4px_0_0_#000] hover:bg-pink-500 transition-colors active:shadow-none active:translate-x-1 active:translate-y-1 mb-2 w-full"
        >
          <Icon :name="item.icon" class="w-6 h-6 mr-2" />
          {{ item.label }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)


</script>