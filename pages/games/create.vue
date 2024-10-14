<template>
  <UContainer>
    <h1 class="text-3xl font-bold mb-6">Create a New Game</h1>
    <div class="flex flex-col space-y-4">
      <UButton variant="neobrutalist" :loading="isCreatingGame" @click="handleCreateSinglePlayerGame">
        Start Single Player Game
      </UButton>
<!--       <UButton disabled class="cursor-not-allowed hover:bg-bg hover:text-text" variant="neobrutalist" @click="handleCreateMultiplayerGame">
        Create Multiplayer Game
      </UButton>
 -->
    </div>
  </UContainer>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useGameLogic } from '~/composables/useGameLogic';

const router = useRouter();
const { createSinglePlayerGame, createMultiplayerGame, currentGame } = useGameLogic();
const isCreatingGame = ref(false);

const handleCreateSinglePlayerGame = async () => {
  isCreatingGame.value = true;
  const game = await createSinglePlayerGame();
  router.push(`/games/${game.id}/play`);
};

const handleCreateMultiplayerGame = async () => {
  await createMultiplayerGame();
  router.push(`/games/${currentGame.id}/`);
};
</script>