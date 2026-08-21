import { getRemainingPositionsOnTicTacToeBoard } from "./getRemainingPositionsOnTicTacToeBoard";
import { NaughtOrCrossValue } from "../types/ticTacToe";

describe("getRemainingPositionsOnTicTacToeBoard", () => {
    test("returns all indices for an empty board", () => {
        const board: NaughtOrCrossValue[] = Array(9).fill(null);

        expect(getRemainingPositionsOnTicTacToeBoard(board)).toEqual([
            0, 1, 2, 3, 4, 5, 6, 7, 8,
        ]);
    });

    test("returns an empty array for a full board", () => {
        const board: NaughtOrCrossValue[] = [
            "x",
            "o",
            "x",
            "o",
            "x",
            "o",
            "o",
            "x",
            "o",
        ];

        expect(getRemainingPositionsOnTicTacToeBoard(board)).toEqual([]);
    });

    test("returns indices of null cells for a partially filled board", () => {
        const board: NaughtOrCrossValue[] = [
            "x",
            "o",
            null,
            null,
            "x",
            null,
            null,
            null,
            "o",
        ];

        expect(getRemainingPositionsOnTicTacToeBoard(board)).toEqual([
            2, 3, 5, 6, 7,
        ]);
    });

    test("returns the single index when only one cell is empty", () => {
        const board: NaughtOrCrossValue[] = Array(9).fill("x");
        board[4] = null;

        expect(getRemainingPositionsOnTicTacToeBoard(board)).toEqual([4]);
    });

    test("handles a board that is not the standard 9-cell size", () => {
        const board: NaughtOrCrossValue[] = ["x", null, "o"];

        expect(getRemainingPositionsOnTicTacToeBoard(board)).toEqual([1]);
    });
});
