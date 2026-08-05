import { NaughtOrCrossValue } from "../types/ticTacToe";

export function countPlacedSymbols(boardArray: NaughtOrCrossValue[]): number {
    return boardArray.filter(
        (boardValue) => boardValue === "x" || boardValue === "o",
    ).length;
}
