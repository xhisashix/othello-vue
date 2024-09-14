<template>
  <div class="container mx-auto py-4">
    <main class="container mt-3">
      <h1 class="text-lg text-xl">オセロ</h1>
      <div
        class="p-4 my-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
        role="alert"
      >
        <span>現在のターン</span> :
        <span id="current-player">{{ currentPlayer }}</span>
      </div>
      <div class="mt-4">
        <p id="">
          黒 :
          <span id="black-count">{{ blackCount }}</span>
        </p>
        <p id="">
          白 :
          <span id="white-count">{{ whiteCount }}</span>
        </p>
      </div>
      <div id="board" class="board">
        <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
          <div
            v-for="(cell, colIndex) in row"
            :key="colIndex"
            :class="[
              'cell',
              cell === '' ? 'empty' : cell,
              othelloGame.isValidMove(rowIndex, colIndex) ? 'valid-move' : '',
            ]"
            @click="othelloGame.makeMove(rowIndex, colIndex)"
          >
            {{ cell }}
          </div>
        </div>
      </div>
      <div class="mt-4">
        <button
          id="reset"
          class="bg-gray-300 rounded px-2 py-1"
          @click="othelloGame.resetGame"
        >
          リセット
        </button>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import OthelloGame from "./lib/OthelloGame";

export default {
  setup() {
    const board = ref<string[][]>([]);
    const currentPlayer = ref<string>("B");
    const blackCount = ref<number>(0);
    const whiteCount = ref<number>(0);
    const othelloGame = new OthelloGame();

    onMounted(() => {
      board.value = othelloGame.board;
      currentPlayer.value = othelloGame.currentPlayer;
      blackCount.value = othelloGame.blackCount;
      whiteCount.value = othelloGame.whiteCount;
    });

    return {
      board,
      currentPlayer,
      blackCount,
      whiteCount,
      othelloGame,
    };
  },
};
</script>

<style scoped></style>
