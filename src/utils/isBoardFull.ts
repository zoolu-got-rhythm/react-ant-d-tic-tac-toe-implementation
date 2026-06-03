import { NaughtOrCrossValue } from "../components/Cell";

export function isBoardFull(boardArray: NaughtOrCrossValue[]): boolean {
    return (
        boardArray.filter(
            (boardValue) => boardValue === "x" || boardValue === "o",
        ).length === 9
    );
}
