<template>
  <div class="container mx-auto mt-8 p-4">
    <h1 class="text-3xl font-bold mb-6">Waiting Room</h1>
    <p class="mb-4">Game ID: {{ $route.params.id }}</p>
    
    <div v-if="currentGame">
      <p class="mb-4">Status: {{ currentGame.status }}</p>
      <p class="mb-4">Players joined: {{ gamePlayers.length }} / 2</p>
      
      <ul class="mb-6">
        <li v-for="player in gamePlayers" :key="player.id" class="mb-2">
          {{ player.expand?.player?.username || 'Unknown Player' }}
        </li>
      </ul>
      
      <button 
        v-if="isHost && gamePlayers.length === 2" 
        @click="startGame" 
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Start Game
      </button>
      
      <p v-else-if="!isHost && gamePlayers.length === 2" class="text-lg font-semibold">
        Waiting for host to start the game...
      </p>
      
      <p v-else class="text-lg font-semibold">
        Waiting for another player to join...
      </p>
    </div>
    
    <p v-else class="text-lg">Loading game information...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGameLogic } from '~/composables/useGameLogic';
import { usePocketBase } from '~/composables/usePocketBase';

const router = useRouter();
const { currentGame, gamePlayers, fetchGameState, joinMultiplayerGame } = useGameLogic();
const { currentUser } = usePocketBase();

const isHost = computed(() => {
  return gamePlayers.value && gamePlayers.value[0]?.player === currentUser.value?.id;
});

onMounted(async () => {
  const gameId = router.currentRoute.value.params.id;
  try {
    await joinMultiplayerGame(gameId);
    await fetchGameState();
    
    // Subscribe to real-time updates
    subscribeToGameUpdates(gameId);
  } catch (error) {
    console.error('Error joining game:', error);
    // Handle error (e.g., show error message to user)
  }
});

const subscribeToGameUpdates = (gameId) => {
  const { pb } = usePocketBase();
  
  pb.collection('games').subscribe(gameId, async (e) => {
    if (e.record.status === 'active') {
      await router.push(`/games/${gameId}`);
    } else {
      await fetchGameState();
    }
  });
  
  pb.collection('game_players').subscribe(`game="${gameId}"`, async () => {
    await fetchGameState();
  });
};

const startGame = async () => {
  if (!isHost.value || gamePlayers.value.length !== 2) return;
  
  const { pb } = usePocketBase();
  await pb.collection('games').update(currentGame.value.id, {
    status: 'active',
    start_time: new Date().toISOString(),
  });
  
  // The subscription will handle the navigation
};
</script>