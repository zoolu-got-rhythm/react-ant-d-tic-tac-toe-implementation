import { NaughtOrCrossValue } from "./Cell";

interface TicTacToeCheckFor3InARowParameters {
    naughtOrCross: "x" | "o";
    ticTacToeArray: NaughtOrCrossValue[];
}

export function ticTacToeHasWon(ticTacToeArray: NaughtOrCrossValue[]) {
    return (
        checkFor3InARow({ naughtOrCross: "o", ticTacToeArray }) ||
        checkFor3InARow({ naughtOrCross: "x", ticTacToeArray }) ||
        null
    );
}

function checkFor3InARow({
    naughtOrCross,
    ticTacToeArray,
}: TicTacToeCheckFor3InARowParameters) {
    const valid3InARowCombinationsByIndex = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < valid3InARowCombinationsByIndex.length; i++) {
        let validTicTacToeCombination = valid3InARowCombinationsByIndex[i];
        if (
            ticTacToeArray[validTicTacToeCombination[0]] === naughtOrCross &&
            ticTacToeArray[validTicTacToeCombination[1]] === naughtOrCross &&
            ticTacToeArray[validTicTacToeCombination[2]] === naughtOrCross
        ) {
            return naughtOrCross;
        }
    }
}
