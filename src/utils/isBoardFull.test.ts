import { isBoardFull } from "./isBoardFull";
import { NaughtOrCrossValue } from "../types/ticTacToe";

describe("isBoardFull", () => {
    test("returns false for an empty board", () => {
        const board: NaughtOrCrossValue[] = Array(9).fill(null);

        expect(isBoardFull(board)).toBe(false);
    });

    test("returns false for a partially filled board", () => {
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

        expect(isBoardFull(board)).toBe(false);
    });

    test("returns true when all cells contain x", () => {
        const board: NaughtOrCrossValue[] = Array(9).fill("x");

        expect(isBoardFull(board)).toBe(true);
    });

    test("returns true when all cells contain o", () => {
        const board: NaughtOrCrossValue[] = Array(9).fill("o");

        expect(isBoardFull(board)).toBe(true);
    });

    test("returns true when board is full with mixed values", () => {
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

        expect(isBoardFull(board)).toBe(true);
    });

    test("returns false when exactly one cell is null", () => {
        const board: NaughtOrCrossValue[] = [
            "x",
            "o",
            "x",
            "o",
            "x",
            "o",
            "o",
            "x",
            null,
        ];

        expect(isBoardFull(board)).toBe(false);
    });
});
