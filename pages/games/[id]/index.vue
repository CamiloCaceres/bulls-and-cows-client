<template>
  <div>
    <UCard v-if="game">
      <template #header>
        <h2 class="text-2xl font-heading text-center text-text">
          Game Details
        </h2>
      </template>
      <p>Game Status: {{ game.status }}</p>
      <div v-if="game.status === 'finished'">
        Game Over
        <p v-if="game.winner">
          {{ game.winner === currentUser?.id ? "You won!" : "Opponent won!" }}
        </p>
        <UButton to="/games/create" variant="neobrutalist">Start New Game</UButton>
      </div>
      <div v-else-if="game.status === 'active'">
        Waiting for
        {{
          game.game_type === "single" ? "your next move" : "opponent's move"
        }}...
        <UButton to="play" variant="neobrutalist">Continue Game</UButton>
      </div>
    </UCard>
    <div v-else>Loading game...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { usePocketBase } from "@/composables/usePocketBase";

const route = useRoute();
const gameId = route.params.id as string;

const { currentUser, pb } = usePocketBase();

const game = ref();

onMounted(async () => {
  game.value = await pb.collection("games").getOne(gameId);
});
</script>
