import { ref, computed } from "vue";
import { usePocketBase } from "./usePocketBase";
import { useRouter } from "vue-router";

const router = useRouter();

export const useGameLogic = () => {
  const { pb, currentUser } = usePocketBase();
  const currentGame = ref();
  const gamePlayers = ref();
  const guesses = ref<any[]>([]);

  const isPlayerTurn = computed(() => {
    return (
      currentGame.value &&
      currentGame.value.current_turn === currentUser.value?.id
    );
  });

  const createSinglePlayerGame = async () => {
    const newGame = await pb.collection("games").create({
      status: "active",
      secret_number: generateSecretNumber(),
      current_turn: currentUser.value?.id,
      max_attempts: 10,
      number_length: 4,
      game_type: "single",
      start_time: new Date().toISOString(),
    });

    await pb.collection("game_players").create({
      game: newGame.id,
      player: currentUser.value?.id,
      join_order: 1,
      start_time: new Date().toISOString(),
    });

    currentGame.value = newGame;
    await fetchGamePlayers();
    return newGame;
  };

  const createMultiplayerGame = async () => {
    const newGame = await pb.collection("games").create({
      status: "waiting",
      secret_number: generateSecretNumber(),
      max_attempts: 10,
      number_length: 4,
      game_type: "multiplayer",
    });

    await pb.collection("game_players").create({
      game: newGame.id,
      player: currentUser.value?.id,
      join_order: 1,
    });

    currentGame.value = newGame;
    await fetchGamePlayers();
  };

  const joinMultiplayerGame = async (gameId: string) => {
    const game = await pb.collection("games").getOne(gameId);
    if (game.status !== "waiting" || game.game_type !== "multiplayer") {
      throw new Error("Cannot join this game");
    }

    await pb.collection("game_players").create({
      game: gameId,
      player: currentUser.value?.id,
      join_order: 2,
    });

    await pb.collection("games").update(gameId, {
      status: "active",
      current_turn: currentUser.value?.id,
      start_time: new Date().toISOString(),
    });

    currentGame.value = await pb.collection("games").getOne(gameId);
    await fetchGamePlayers();
    await updateGamePlayersStartTime();
  };

  const fetchGamePlayers = async () => {
    if (!currentGame.value) return;

    gamePlayers.value = await pb.collection("game_players").getFullList({
      filter: `game = "${currentGame.value.id}"`,
      sort: "join_order",
    });
  };

  const updateGamePlayersStartTime = async () => {
    for (const gamePlayer of gamePlayers.value) {
      await pb.collection("game_players").update(gamePlayer.id, {
        start_time: new Date().toISOString(),
      });
    }
  };
  

  const makeGuess = async (guessNumber: string, game: any) => {

    // Calculate bulls and cows locally
    const { bulls, cows } = calculateBullsAndCows(guessNumber, game.value.secret_number);

    // Create the guess with the calculated bulls and cows
    const newGuess = await pb.collection("guesses").create({
      game: game.value.id,
      player: currentUser.value?.id,
      number: guessNumber,
      bulls: bulls,
      cows: cows,
    });

    if (
      bulls === 4
    ) {
      console.log("Game over");
      await endGame(currentUser.value?.id, game.value.id);
    }/*  else {
      await updateTurn();
    }

    await fetchGameState(); */
    return newGuess;
  };
  const endGame = async (winnerId: string | null, gameId: string) => {
    console.log("Ending game");
    const endTime = new Date().toISOString();
    await pb.collection("games").update(gameId, {
      status: "finished",
      winner: winnerId,
      end_time: endTime,
    });
    console.log("Game ended");
    router.push(`/games/${gameId}`);
/*     for (const gamePlayer of gamePlayers.value) {
      await pb.collection("game_players").update(gamePlayer.id, {
        end_time: endTime,
        duration:
          (new Date(endTime).getTime() -
            new Date(gamePlayer.start_time).getTime()) /
          1000,
      });
    } */
  };
  const updateTurn = async () => {
    if (currentGame.value.game_type === "multiplayer") {
      const nextPlayer = gamePlayers.value.find(
        (gp: any) => gp.player !== currentUser.value?.id
      );
      await pb.collection("games").update(currentGame.value.id, {
        current_turn: nextPlayer.player,
      });
    }
  };



  const fetchGameState = async () => {
    if (!currentGame.value) return;

    currentGame.value = await pb
      .collection("games")
      .getOne(currentGame.value.id);
    await fetchGamePlayers();
    guesses.value = await pb.collection("guesses").getFullList({
      filter: `game = "${currentGame.value.id}"`,
      sort: "created",
    });
    return currentGame.value
  };

  const calculateBullsAndCows = (guess: string, secret: number) => {
    const secretString = secret.toString();
    const guessString = guess.toString();
    let bulls = 0;
    let cows = 0;
    
    for (let i = 0; i < 4; i++) {
      if (guessString[i] === secretString[i]) {
        bulls++;
      } else if (secretString.includes(guessString[i])) {
        cows++;
      }
    }
    
    return { bulls, cows };
  };

  const generateSecretNumber = () => {
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let result = "";
    for (let i = 0; i < 4; i++) {
      const index = Math.floor(Math.random() * digits.length);
      result += digits[index];
      digits.splice(index, 1);
    }
    return result;
  };

  return {
    currentGame,
    gamePlayers,
    guesses,
    isPlayerTurn,
    createSinglePlayerGame,
    createMultiplayerGame,
    joinMultiplayerGame,
    makeGuess,
    fetchGameState,
    endGame,
  };
};
