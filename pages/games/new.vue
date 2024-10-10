<template>
    <div class="">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-6xl font-bold mb-8 text-blue-600 bg-white p-4 border-4 border-black shadow-[8px_8px_0_0_#000]">
          Bulls and Cows
        </h1>
        
        <div class="bg-pink-400 p-6 mb-8 border-4 border-black shadow-[8px_8px_0_0_#000]">
          <input
            type="text"
            maxlength="4"
            v-model="guess"
            class="w-full text-4xl p-4 mb-4 bg-white border-4 border-black focus:outline-none focus:ring-4 focus:ring-blue-600"
            placeholder="Enter 4-digit guess"
          />
          <button
            @click="handleGuess"
            class="w-full bg-main text-white text-2xl p-4 border-4 border-black hover:bg-green-600 transition-colors shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-x-1 active:translate-y-1"
          >
            Submit Guess
          </button>
        </div>
        
        <div class="bg-blue-500 p-6 border-4 border-black shadow-[8px_8px_0_0_#000]">
          <h2 class="text-4xl font-bold mb-4 text-white">Attempts</h2>
          <div v-for="(attempt, index) in attempts" :key="index" class="flex justify-between items-center mb-4 bg-white p-4 border-4 border-black">
            <span class="text-3xl">{{ attempt }}</span>
            <div class="flex space-x-4">
              <span class="flex items-center text-2xl">
                <Icon name="lucide:check" class="w-8 h-8 text-green-500 mr-2" /> {{ feedback[index].bulls }}
              </span>
              <span class="flex items-center text-2xl">
                <Icon name="lucide:x" class="w-8 h-8 text-red-500 mr-2" /> {{ feedback[index].cows }}
              </span>
            </div>
          </div>
        </div>
        
        <button
          class="mt-8 bg-purple-500 text-white text-2xl p-4 border-4 border-black hover:bg-purple-600 transition-colors shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-x-1 active:translate-y-1 flex items-center justify-center w-full"
        >
          <Icon name="lucide:refresh-cw" class="w-8 h-8 mr-2" /> New Game
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const guess = ref('')
  const attempts = ref([])
  const feedback = ref([])
  
  const handleGuess = () => {
    // This is where you'd implement the game logic
    // For now, we'll just add the guess to the attempts
    attempts.value.push(guess.value)
    feedback.value.push({ bulls: Math.floor(Math.random() * 5), cows: Math.floor(Math.random() * 5) })
    guess.value = ''
  }
  </script>