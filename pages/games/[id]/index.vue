<template>
  <div>
    <h1>Bulls and Cows Game</h1>
    <div v-if="currentGame">
      <p>Game ID: {{ currentGame.id }}</p>
      <p>Game Type: {{ currentGame.game_type }}</p>
      <p>Game Status: {{ currentGame.status }}</p>
      <p v-if="currentGame.winner">Winner: {{ currentGame.winner === currentUser?.id ? 'You' : 'Opponent' }}</p>
      <div v-if="isPlayerTurn && currentGame.status === 'active'">
        <input v-model="currentGuess" maxlength="4" pattern="\d*"/>
        <button @click="submitGuess" :disabled="currentGuess.length !== 4">Submit Guess</button>
      </div>
      <div v-else-if="currentGame.status === 'active'">
        Waiting for {{ currentGame.game_type === 'single' ? 'your next move' : "opponent's move" }}...
      </div>
      <ul>
        <li v-for="guess in guesses" :key="guess.id">
          Player: {{ guess.player === currentUser?.id ? 'You' : 'Opponent' }}
          Guess: {{ guess.number }} - Bulls: {{ guess.bulls }}, Cows: {{ guess.cows }}
          (Time: {{ guess.time_taken.toFixed(2) }}s)
        </li>
      </ul>
    </div>
    <div v-else>
      Loading game...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useGameLogic } from '../../../composables/useGameLogic'
import { usePocketBase } from '../../../composables/usePocketBase'

const route = useRoute()
const gameId = route.params.id as string

const { 
  currentGame, 
  gamePlayers, 
  guesses, 
  isPlayerTurn, 
  makeGuess,
  fetchGameState,
  joinMultiplayerGame
} = useGameLogic()

const { pb, currentUser } = usePocketBase()

const currentGuess = ref('')

const submitGuess = async () => {
  if (currentGuess.value.length === 4) {
    await makeGuess(currentGuess.value)
    currentGuess.value = ''
  }
}

const initializeGame = async () => {
  try {
    const game = await pb.collection('games').getOne(gameId)
    if (game.status === 'waiting' && game.game_type === 'multiplayer') {
      await joinMultiplayerGame(gameId)
    } else {
      await fetchGameState()
    }
  } catch (error) {
    console.error('Failed to initialize game:', error)
    // Handle error (e.g., show error message to user or redirect)
  }
}

onMounted(async () => {
  await initializeGame()

  // Set up real-time subscription for game updates
  pb.collection("games").subscribe(gameId, async (e: any) => {
    if (e.action === "update") {
      await fetchGameState()
    }
  })
})

// Clean up subscription when component is unmounted
onUnmounted(() => {
  pb.collection("games").unsubscribe(gameId)
})

// Watch for changes in currentGame and update the page title
watch(currentGame, (newGame) => {
  if (newGame) {
    document.title = `Game ${newGame.id} - Bulls and Cows`
  }
})
</script>
