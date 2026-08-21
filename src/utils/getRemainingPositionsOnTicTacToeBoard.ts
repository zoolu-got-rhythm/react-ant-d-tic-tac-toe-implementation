import { NaughtOrCrossValue } from "../types/ticTacToe";

export function getRemainingPositionsOnTicTacToeBoard(
    ticTacToeArray: NaughtOrCrossValue[],
): number[] {
    return ticTacToeArray
        .map((value: NaughtOrCrossValue, i) => (value === null ? i : null))
        .filter((v) => v !== null);
}
