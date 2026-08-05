import { countPlacedSymbols } from "./countPlacedSymbols";
import { NaughtOrCrossValue } from "../types/ticTacToe";

describe("countPlacedSymbols", () => {
    test("returns 0 for an empty board", () => {
        const board: NaughtOrCrossValue[] = Array(9).fill(null);

        expect(countPlacedSymbols(board)).toBe(0);
    });

    test("counts x and o entries, ignoring null", () => {
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

        expect(countPlacedSymbols(board)).toBe(4);
    });

    test("returns 9 for a full board", () => {
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

        expect(countPlacedSymbols(board)).toBe(9);
    });
});
