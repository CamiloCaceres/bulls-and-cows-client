<template>
  <div class="container mx-auto mt-8 p-4">
    <h1 class="text-3xl font-bold mb-6">Create a New Game</h1>
    <div class="flex flex-col space-y-4">
      <button
        @click="handleCreateSinglePlayerGame"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Create Single Player Game
      </button>
      <button
        @click="handleCreateMultiplayerGame"
        class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Create Multiplayer Game
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useGameLogic } from '~/composables/useGameLogic';

const router = useRouter();
const { createSinglePlayerGame, createMultiplayerGame } = useGameLogic();

const handleCreateSinglePlayerGame = async () => {
  const game = await createSinglePlayerGame();
  router.push(`/games/${game.id}`);
};

const handleCreateMultiplayerGame = async () => {
  const game = await createMultiplayerGame();
  router.push(`/games/${game.id}/room`);
};
</script>