<template>
  <div class="max-w-lg m-4 mx-auto flex flex-col items-center justify-center p-6">
    <h1 class="text-4xl font-bold mb-8 text-center text-indigo-800 ">Bulls and Cows</h1>

    <div class=" flex flex-col gap-4 w-full">
      <UButton
        icon="lucide:plus"
        variant="neobrutalist"
        to="/games/create"
        block 
        size="xl"
      >
        New Game
      </UButton>

      <UButton
        icon="lucide:book"
        variant="neobrutalistOutline"
        to="/tutorial"
        block 
      >
        Tutorial
      </UButton>

      <UButton
        icon="lucide:trophy"
        variant="neobrutalistOutline"
        to="/leaderboard"
        block 
      >
        Leaderboard
      </UButton>
    </div>

    <div class="mt-12 text-center text-gray-600">
      <p class="mb-2">Can you crack the code?</p>
      <div class="flex justify-center space-x-2">
        <span class="w-8 h-8 bg-red-500 rounded-full"></span>
        <span class="w-8 h-8 bg-blue-500 rounded-full"></span>
        <span class="w-8 h-8 bg-green-500 rounded-full"></span>
        <span class="w-8 h-8 bg-yellow-500 rounded-full"></span>
      </div>
    </div>
  </div>
</template>
