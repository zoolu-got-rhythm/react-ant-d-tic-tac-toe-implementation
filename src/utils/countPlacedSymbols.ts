import { NaughtOrCrossValue } from "../components/Cell";

export function countPlacedSymbols(boardArray: NaughtOrCrossValue[]): number {
    return boardArray.filter(
        (boardValue) => boardValue === "x" || boardValue === "o",
    ).length;
}
