import {
  BOARD_SIZE,
  PLAYER_BLACK,
  PLAYER_WHITE,
} from "../constants/OthelloConstants";
import { reactive } from "vue";

const DIRECTIONS = [
  { row: -1, col: -1 },
  { row: -1, col: 0 },
  { row: -1, col: 1 },
  { row: 0, col: -1 },
  { row: 0, col: 1 },
  { row: 1, col: -1 },
  { row: 1, col: 0 },
  { row: 1, col: 1 },
];

/**
 * Represents the Othello game.
 */
export default class OthelloGame {
  public board: string[][];
  public currentPlayer: string;
  public blackCount: number;
  public whiteCount: number;

  constructor() {
    this.board = reactive(
      Array.from({ length: BOARD_SIZE }, () =>
        Array.from({ length: BOARD_SIZE }, () => "")
      )
    );
    this.currentPlayer = PLAYER_BLACK;
    this.blackCount = 0;
    this.whiteCount = 0;
    this.initGame();
  }

  /**
   * Initializes the Othello game board and sets the initial state.
   */
  public initGame() {
    this.board.splice(
      0,
      this.board.length,
      ...Array.from({ length: BOARD_SIZE }, () =>
        Array.from({ length: BOARD_SIZE }, () => "")
      )
    );
    const mid = BOARD_SIZE / 2;
    this.board[mid - 1][mid - 1] = PLAYER_WHITE;
    this.board[mid - 1][mid] = PLAYER_BLACK;
    this.board[mid][mid - 1] = PLAYER_BLACK;
    this.board[mid][mid] = PLAYER_WHITE;
    this.blackCount = 2;
    this.whiteCount = 2;
  }

  /**
   * Event that is triggered when the Othello game board is updated.
   */
  public boardUpdated = new Event("boardUpdated");

  /**
   * Resets the Othello game to its initial state.
   */
  public resetGame() {
    this.initGame();
  }

  /**
   * Gets the current player.
   *
   * @returns The current player.
   */
  public getCurrentPlayer(): string {
    return this.currentPlayer;
  }

  /**
   * Checks if a move is valid at the specified row and column.
   *
   * @param row - The row index.
   * @param col - The column index.
   * @returns A boolean indicating if the move is valid.
   */
  public isValidMove(row: number, col: number): boolean {
    if (this.board[row][col] !== "") {
      return false;
    }

    for (const direction of DIRECTIONS) {
      let x = col + direction.row;
      let y = row + direction.col;
      let count = 0;
      while (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
        if (this.board[y][x] === "") {
          break;
        }
        if (this.board[y][x] === this.currentPlayer) {
          if (count > 0) {
            return true;
          }
          break;
        }
        x += direction.row;
        y += direction.col;
        count++;
      }
    }
    return false;
  }

  /**
   * Makes a move at the specified row and column.
   *
   * @param row - The row index.
   * @param col - The column index.
   */
  public makeMove(row: number, col: number) {
    if (!this.isValidMove(row, col)) {
      return;
    }

    for (const direction of DIRECTIONS) {
      let x = col + direction.row;
      let y = row + direction.col;
      let count = 0;
      while (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
        if (this.board[y][x] === "") {
          break;
        }
        if (this.board[y][x] === this.currentPlayer) {
          while (count > 0) {
            x -= direction.row;
            y -= direction.col;
            this.board[y][x] = this.currentPlayer;
            count--;
          }
          break;
        }
        x += direction.row;
        y += direction.col;
        count++;
      }
    }

    this.board[row][col] = this.currentPlayer;
    this.currentPlayer =
      this.currentPlayer === PLAYER_BLACK ? PLAYER_WHITE : PLAYER_BLACK;
    this.blackCount = this.board
      .flat()
      .filter((cell) => cell === PLAYER_BLACK).length;
    this.whiteCount = this.board
      .flat()
      .filter((cell) => cell === PLAYER_WHITE).length;
  }
}
