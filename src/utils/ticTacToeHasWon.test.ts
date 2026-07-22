import { ticTacToeHasWon } from "./ticTacToeHasWon";

describe("ticTacToeHasWon", () => {
    const winningCombinations = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // diagonal
        [2, 4, 6], // diagonal
    ];

    describe("x wins", () => {
        test.each(winningCombinations)(
            'returns "x" for winning combination %j',
            (...winningIndexes) => {
                const board = Array(9).fill(null);

                winningIndexes.forEach((index) => {
                    board[index] = "x";
                });

                expect(ticTacToeHasWon(board)).toBe("x");
            },
        );
    });

    describe("o wins", () => {
        test.each(winningCombinations)(
            'returns "o" for winning combination %j',
            (...winningIndexes) => {
                const board = Array(9).fill(null);

                winningIndexes.forEach((index) => {
                    board[index] = "o";
                });

                expect(ticTacToeHasWon(board)).toBe("o");
            },
        );
    });

    describe("no winner", () => {
        test("returns null for an empty board", () => {
            expect(
                ticTacToeHasWon([
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                ]),
            ).toBeNull();
        });

        test("returns null for a draw", () => {
            expect(
                ticTacToeHasWon(["x", "o", "x", "o", "x", "o", "o", "x", "o"]),
            ).toBeNull();
        });

        test("returns null for a partially completed game", () => {
            expect(
                ticTacToeHasWon([
                    "x",
                    "o",
                    null,
                    null,
                    "x",
                    null,
                    null,
                    null,
                    "o",
                ]),
            ).toBeNull();
        });
    });
});
