import { ticTacToeHasWon } from "../../src/utils/ticTacToeHasWon";
import { isBoardFull } from "../../src/utils/isBoardFull";
import { countPlacedSymbols } from "../../src/utils/countPlacedSymbols";
import { NaughtOrCrossValue } from "../../src/types/ticTacToe";

export function createEmptyBoard(): NaughtOrCrossValue[] {
    return new Array(9).fill(null);
}

export function whoseTurnIsIt(board: NaughtOrCrossValue[]): "x" | "o" {
    return countPlacedSymbols(board) % 2 === 0 ? "x" : "o";
}

export function applyMove(
    board: NaughtOrCrossValue[],
    cellIndex: number,
    symbol: "x" | "o",
): NaughtOrCrossValue[] {
    const nextBoard = [...board];
    nextBoard[cellIndex] = symbol;
    return nextBoard;
}

export function evaluateBoard(board: NaughtOrCrossValue[]): {
    winner: NaughtOrCrossValue;
    isDraw: boolean;
} {
    const winner = ticTacToeHasWon(board);
    const isDraw = !winner && isBoardFull(board);
    return { winner, isDraw };
}
