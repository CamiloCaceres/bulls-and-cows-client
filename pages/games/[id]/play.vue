<template>
  <h1 class="text-2xl font-heading text-center text-text">Bulls and Cows Game</h1>
  <div v-if="game">
    <UCard class="mt-4">
        <p v-if="game.status === 'finished'">
            Game Over!
        </p>
        
        <div v-else-if="game.status === 'active'">
          Guess the number!
        <div class="flex flex-col gap-2">
            <UInput variant="neobrutalist" type="number" v-model="currentGuess" />
            <UButton
            :loading="isMakingGuess"
            @click="submitGuess"
            variant="neobrutalist"
            block
            >
            Submit Guess
        </UButton>
        <p class="text-end text-sm text-gray-500 mt-6">Game Status: {{ game.status }}</p>
    </div>
</div>
    </UCard>
    <UCard class="mt-4">
      <ul>
        <li class="flex justify-between" v-for="guess in guesses" :key="guess.id">
          <p>Guess: {{ guess.number }} </p>
          <div class="flex gap-2">
            <p> 🎯: {{ guess.bulls }}</p>
            <p> 🐄: {{ guess.cows }}</p>
          </div>
        </li>
      </ul>
    </UCard>
  </div>
  <div v-else>Loading game...</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useGameLogic } from "../../../composables/useGameLogic";
import { usePocketBase } from "../../../composables/usePocketBase";

const route = useRoute();
const gameId = route.params.id as string;

const { currentUser, pb } = usePocketBase();
const { makeGuess, endGame } = useGameLogic();

const game = ref();
const guesses = ref();
const currentGuess = ref("");
const isMakingGuess = ref(false);

const getGuesses = async () => {
  const guesses = await pb.collection("guesses").getFullList({
    filter: `game = "${gameId}"`,
  });
  return guesses;
};
const submitGuess = async () => {
  if (currentGuess.value.toString().length === game.value.number_length) {
    isMakingGuess.value = true;
    await makeGuess(currentGuess.value.toString(), game);
    guesses.value = await getGuesses();
    currentGuess.value = "";
    isMakingGuess.value = false;
    if (game.value.max_attempts === guesses.value.length) {
      await endGame(game.value.winner, game.value.id);
    }
  }
};

onMounted(async () => {
  game.value = await pb.collection("games").getOne(gameId);
  guesses.value = await getGuesses();
/*   pb.collection("games").subscribe(gameId, (game) => {
    console.log("Game updated", game);
  }); */
});
</script>
