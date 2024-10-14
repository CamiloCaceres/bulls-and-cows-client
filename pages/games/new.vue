<!-- components/BullsAndCowsGame.vue -->
<template>
  <div>
    <h1>Bulls and Cows Game</h1>
    <div v-if="!currentGame">
      <button @click="startSinglePlayerGame">Start Single Player Game</button>
      <button @click="startMultiplayerGame">Create Multiplayer Game</button>
      <div>
        <input v-model="gameIdToJoin" placeholder="Enter game ID to join" />
        <button @click="joinGame">Join Game</button>
      </div>
    </div>
    <div v-else>
      <p>Game ID: {{ currentGame.id }}</p>
      <p>Game Type: {{ currentGame.game_type }}</p>
      <p>Game Status: {{ currentGame.status }}</p>
      <p v-if="currentGame.winner">Winner: {{ currentGame.winner === currentUser?.id ? 'You' : 'Opponent' }}</p>
      <div v-if="isPlayerTurn && currentGame.status === 'active'">
        <input v-model="currentGuess" maxlength="4" pattern="\d*"/>
        <button @click="submitGuess" :disabled="currentGuess.length !== 4">Submit Guess</button>
      </div>
      <div v-else-if="currentGame.status === 'active'">
        Waiting for opponent's move...
      </div>
      <ul>
        <li v-for="guess in guesses" :key="guess.id">
          Player: {{ guess.player === currentUser?.id ? 'You' : 'Opponent' }}
          Guess: {{ guess.number }} - Bulls: {{ guess.bulls }}, Cows: {{ guess.cows }}
          (Time: {{ guess.time_taken.toFixed(2) }}s)
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGameLogic } from '../../composables/useGameLogic'

const { 
  currentGame, 
  gamePlayers, 
  guesses, 
  isPlayerTurn, 
  createSinglePlayerGame, 
  createMultiplayerGame, 
  joinMultiplayerGame, 
  makeGuess,
  fetchGameState 
} = useGameLogic()

const { pb, currentUser } = usePocketBase()

const currentGuess = ref('')
const gameIdToJoin = ref('')

const startSinglePlayerGame = async () => {
  await createSinglePlayerGame()
}

const startMultiplayerGame = async () => {
  await createMultiplayerGame()
}

const joinGame = async () => {
  if (gameIdToJoin.value) {
    try {
      await joinMultiplayerGame(gameIdToJoin.value)
    } catch (error) {
      console.error('Failed to join game:', error)
      // Handle error (e.g., show error message to user)
    }
  }
}

const submitGuess = async () => {
  if (currentGuess.value.length === 4) {
    await makeGuess(currentGuess.value, currentGame.value)
    currentGuess.value = ''
  }
}

// Set up real-time subscription for game updates
onMounted(() => {
  if (currentGame.value) {
    const gameId = currentGame.value.id
    pb.collection("games").subscribe(gameId, async (e: any) => {
      if (e.action === "update") {
        await fetchGameState();
      }
    })

    return () => pb.collection("games").unsubscribe(gameId);
  }
});
</script>