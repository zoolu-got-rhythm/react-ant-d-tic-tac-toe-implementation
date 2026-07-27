import { NaughtOrCrossValue } from "../types/ticTacToe";

export function isBoardFull(boardArray: NaughtOrCrossValue[]): boolean {
    return (
        boardArray.filter(
            (boardValue) => boardValue === "x" || boardValue === "o",
        ).length === 9
    );
}
