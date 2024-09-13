<script setup lang="ts">
import { ref } from "vue";
import { BOARD_SIZE, PLAYER_BLACK, PLAYER_WHITE } from "./constants/OthelloConstants";

const DIRECTIONS = [
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 0 },
  { x: 1, y: -1 },
  { x: 0, y: -1 },
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
];

const board = ref<string[][]>([]);
const currentPlayer = ref<string>("B");
const blackCount = ref<number>(0);
const whiteCount = ref<number>(0);

/**
 * ゲームの初期化
 * @returns void
 */
const initGame = () => {
  board.value = Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => "")
  );
  board.value[3][3] = PLAYER_WHITE;
  board.value[3][4] = PLAYER_BLACK;
  board.value[4][3] = PLAYER_BLACK;
  board.value[4][4] = PLAYER_WHITE;
  currentPlayer.value = PLAYER_BLACK;
  blackCount.value = 2;
  whiteCount.value = 2;
};

/**
 * ゲームのリセット
 * @returns void
 */
const resetGame = () => {
  initGame();
};

/**
 * 石をおけるかどうか
 * @param row
 * @param col
 * @returns void
 */
const isValidMove = (row: number, col: number) => {
  if (board.value[row][col] !== "") {
    return false;
  }

  for (const direction of DIRECTIONS) {
    let x = col + direction.x;
    let y = row + direction.y;
    let count = 0;
    while (x >= 0 && x < 8 && y >= 0 && y < 8) {
      if (board.value[y][x] === "") {
        break;
      }
      if (board.value[y][x] === currentPlayer.value) {
        if (count > 0) {
          return true;
        }
        break;
      }
      x += direction.x;
      y += direction.y;
      count++;
    }
  }
  return false;
};

/**
 * 石を置く
 * @param row
 * @param col
 * @returns void
 */
const makeMove = (row: number, col: number) => {
  if (!isValidMove(row, col)) {
    currentPlayer.value =
      currentPlayer.value === PLAYER_BLACK ? PLAYER_WHITE : PLAYER_BLACK;
    return;
  }

  for (const direction of DIRECTIONS) {
    let x = col + direction.x;
    let y = row + direction.y;
    let count = 0;
    while (x >= 0 && x < 8 && y >= 0 && y < 8) {
      if (board.value[y][x] === "") {
        break;
      }
      if (board.value[y][x] === currentPlayer.value) {
        if (count > 0) {
          let i = 1;
          while (i <= count) {
            board.value[row + direction.y * i][col + direction.x * i] =
              currentPlayer.value;
            i++;
          }
          break;
        }
        break;
      }
      x += direction.x;
      y += direction.y;
      count++;
    }
  }
  board.value[row][col] = currentPlayer.value;
  currentPlayer.value =
    currentPlayer.value === PLAYER_BLACK ? PLAYER_WHITE : PLAYER_BLACK;
  blackCount.value = board.value
    .flat()
    .filter((cell) => cell === PLAYER_BLACK).length;
  whiteCount.value = board.value
    .flat()
    .filter((cell) => cell === PLAYER_WHITE).length;
};

initGame();
</script>

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
              isValidMove(rowIndex, colIndex) ? 'valid-move' : '',
            ]"
            @click="makeMove(rowIndex, colIndex)"
          >
            {{ cell }}
          </div>
        </div>
      </div>
      <div class="mt-4">
        <button
          id="reset"
          class="bg-gray-300 rounded px-2 py-1"
          @click="resetGame"
        >
          リセット
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
