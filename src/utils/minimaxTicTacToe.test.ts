import { NaughtOrCrossValue } from "../types/ticTacToe";
import { minimaxTicTacToe } from "./minimaxTicTacToe";

describe("minimaxTicTacToe", () => {
    describe("terminal states", () => {
        test("scores +1 when symbolToFindBestMoveFor already won (opponent to move)", () => {
            const board: NaughtOrCrossValue[] = [
                "x", "x", "x",
                "o", "o", null,
                null, null, null,
            ];

            const result = minimaxTicTacToe(board, "o", "x");

            expect(result.score).toBe(1);
            expect(result.indexOfBestPosition).toBeUndefined();
        });

        test("scores -1 when the opponent already won (symbolToFindBestMoveFor to move)", () => {
            const board: NaughtOrCrossValue[] = [
                "x", "x", "x",
                "o", "o", null,
                null, null, null,
            ];

            const result = minimaxTicTacToe(board, "x", "x");

            expect(result.score).toBe(-1);
            expect(result.indexOfBestPosition).toBeUndefined();
        });

        test("scores 0 for a full, drawn board", () => {
            const board: NaughtOrCrossValue[] = [
                "x", "o", "x",
                "x", "o", "o",
                "o", "x", "x",
            ];

            const result = minimaxTicTacToe(board, "x", "x");

            expect(result.score).toBe(0);
            expect(result.indexOfBestPosition).toBeUndefined();
        });
    });

    describe("finding the best move", () => {
        test("takes the winning move when one is available", () => {
            const board: NaughtOrCrossValue[] = [
                "x", "x", null,
                "o", "o", null,
                null, null, null,
            ];

            const result = minimaxTicTacToe(board, "x", "x");

            expect(result.indexOfBestPosition).toBe(2);
            expect(result.score).toBe(1);
        });

        test("blocks the opponent's winning move", () => {
            const board: NaughtOrCrossValue[] = [
                "o", "o", null,
                "x", null, null,
                null, null, null,
            ];

            const result = minimaxTicTacToe(board, "x", "x");

            expect(result.indexOfBestPosition).toBe(2);
        });

        test("does not hand the opponent a winning move", () => {
            const board: NaughtOrCrossValue[] = [
                "x", "x", null,
                null, "o", null,
                null, null, null,
            ];

            const result = minimaxTicTacToe(board, "o", "o");

            expect(result.indexOfBestPosition).toBe(2);
            expect(result.score).not.toBe(-1);
        });

        test("prefers the immediate win over a slower one", () => {
            const board: NaughtOrCrossValue[] = [
                "x", "x", null,
                "x", "o", "o",
                null, "o", null,
            ];

            const result = minimaxTicTacToe(board, "x", "x");

            expect(result.indexOfBestPosition).toBe(2);
            expect(result.score).toBe(1);
        });

        test("finds a drawing result from an empty board with optimal play", () => {
            const board: NaughtOrCrossValue[] = new Array(9).fill(null);

            const result = minimaxTicTacToe(board, "x", "x");

            expect(result.score).toBe(0);
        });

        test("does not mutate the input board", () => {
            const board: NaughtOrCrossValue[] = [
                "x", "x", null,
                "o", "o", null,
                null, null, null,
            ];
            const boardCopy = board.slice();

            minimaxTicTacToe(board, "x", "x");

            expect(board).toEqual(boardCopy);
        });
    });
});
