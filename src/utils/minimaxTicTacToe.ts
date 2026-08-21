import { NaughtOrCrossValue } from "../types/ticTacToe";
import { getRemainingPositionsOnTicTacToeBoard } from "./getRemainingPositionsOnTicTacToeBoard";
import { isBoardFull } from "./isBoardFull";
import { ticTacToeHasWon } from "./ticTacToeHasWon";

interface Result {
    score: number;
    indexOfBestPosition?: number;
}

export function minimaxTicTacToe(
    ticTacToeArray: NaughtOrCrossValue[],
    turn: NaughtOrCrossValue,
    symbolToFindBestMoveFor: NaughtOrCrossValue,
): Result {
    if (ticTacToeHasWon(ticTacToeArray)) {
        if (turn === symbolToFindBestMoveFor) {
            return {
                score: -1,
            };
        } else {
            return { score: +1 };
        }
    }

    if (isBoardFull(ticTacToeArray)) {
        return { score: 0 };
    }

    const indexesOfRemainingInTicTacToeArray =
        getRemainingPositionsOnTicTacToeBoard(ticTacToeArray);

    let results: Result[] = [];

    for (let i = 0; i < indexesOfRemainingInTicTacToeArray.length; i++) {
        let ticTacToeArrayCopy = ticTacToeArray.slice();
        ticTacToeArrayCopy[indexesOfRemainingInTicTacToeArray[i]] = turn;

        let r = minimaxTicTacToe(
            ticTacToeArrayCopy,
            turn === "o" ? "x" : "o",
            symbolToFindBestMoveFor,
        );

        r.indexOfBestPosition = indexesOfRemainingInTicTacToeArray[i];
        results.push(r);
    }

    let indexOfResultWithBestScore: number = 0;
    if (turn === symbolToFindBestMoveFor) {
        let highestScore = -Infinity;

        for (let i = 0; i < results.length; i++) {
            const score = results[i].score;

            if (score > highestScore) {
                highestScore = score;
                indexOfResultWithBestScore = i;
            }
        }
    } else {
        let lowestScore = +Infinity;

        for (let i = 0; i < results.length; i++) {
            const score = results[i].score;

            if (results[i].score < lowestScore) {
                lowestScore = score;
                indexOfResultWithBestScore = i;
            }
        }
    }

    return results[indexOfResultWithBestScore];
}

export function findBestMoveIndexForSymbolUsingMinimaxAlgorithm(
    symbol: NaughtOrCrossValue,
    ticTacToeArray: NaughtOrCrossValue[],
): number {
    return minimaxTicTacToe(ticTacToeArray, symbol, symbol)
        .indexOfBestPosition!;
}