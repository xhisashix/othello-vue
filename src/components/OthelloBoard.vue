<template>
  <div>
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
    <div class="mt-4">
      <button
        id="reset"
        class="bg-gray-300 rounded px-2 py-1"
        @click="resetGame"
      >
        リセット
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    board: Array,
    isValidMove: Function,
    makeMove: Function,
    resetGame: Function,
  },
};
</script>

<style scoped></style>
