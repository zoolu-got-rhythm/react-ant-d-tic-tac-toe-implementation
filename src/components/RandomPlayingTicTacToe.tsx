import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { Board } from "./Board";
import { ticTacToeHasWon } from "../utils/ticTacToeHasWon";
import { TurnHistoryList } from "./TurnHistoryList";
import { Typography } from "antd";
import { isBoardFull } from "../utils/isBoardFull";
import { countPlacedSymbols } from "../utils/countPlacedSymbols";
import { useRequestAnimationFrameStep } from "../hooks/useRequestionAnimationFrameStep";
import { NaughtOrCrossValue } from "../types/ticTacToe";

export type HandleClickTile = (indexOfTileToUpdate: number) => void;

const { Title, Text } = Typography;

export function RandomPlayingTicTacToe() {
    const [ticTacToeArray, setTicTacToeArray] = useState<NaughtOrCrossValue[]>(
        new Array(9).fill(null),
    );

    const [winnerOfGame, setWinnerOfGame] = useState<NaughtOrCrossValue>(null);

    const ticTacToeBoardSize = 50;

    let ticTacToeArrayCopy = [...ticTacToeArray];

    const ticTacToeArrayCopyEntriesLength =
        countPlacedSymbols(ticTacToeArrayCopy);

    let whosTurnIsIt: "x" | "o" =
        ticTacToeArrayCopyEntriesLength % 2 === 0 ? "x" : "o";

    useEffect(() => {
        const naughtOrCrossWinner: NaughtOrCrossValue =
            ticTacToeHasWon(ticTacToeArray);

        setWinnerOfGame(naughtOrCrossWinner);
    }, [ticTacToeArray]);

    const boardIsFull = isBoardFull(ticTacToeArrayCopy);

    const [requestAnimationFrameStep, cancelRequestAnimationFrameStep] =
        useRequestAnimationFrameStep();

    const handleClickTile: HandleClickTile = useCallback(
        function (indexOfTileToUpdate: number): void {
            if (winnerOfGame) {
                console.log("should be returning");
                return;
            }

            setTicTacToeArray((previousTicTacToeArray) => {
                if (previousTicTacToeArray[indexOfTileToUpdate] !== null) {
                    return previousTicTacToeArray;
                }

                const entriesLength = countPlacedSymbols(
                    previousTicTacToeArray,
                );

                const symbolToPlace: NaughtOrCrossValue =
                    entriesLength % 2 === 0 ? "x" : "o";

                const nextTicTacToeArray = [...previousTicTacToeArray];
                nextTicTacToeArray[indexOfTileToUpdate] = symbolToPlace;

                return nextTicTacToeArray;
            });
        },
        [winnerOfGame],
    );

    const intervalBetweenRandomTileClicksInMs = 350;
    const intervalToResetGameInMs = 3000;

    const indexesOfTilesClicked = useRef<number[]>([]);

    const range0To8: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    useEffect(() => {
        if (winnerOfGame || boardIsFull) {
            cancelRequestAnimationFrameStep();
            window.setTimeout(() => {
                indexesOfTilesClicked.current = [];
                setTicTacToeArray(new Array(9).fill(null));
                setWinnerOfGame(null);
            }, intervalToResetGameInMs);
        } else {
            requestAnimationFrameStep(() => {
                const availableIndexes = range0To8.filter(
                    (n) => !indexesOfTilesClicked.current.includes(n),
                );
                const chosenRandomIndex =
                    availableIndexes[
                        Math.floor(Math.random() * availableIndexes.length)
                    ];

                indexesOfTilesClicked.current.push(chosenRandomIndex);
                handleClickTile(chosenRandomIndex);
            }, intervalBetweenRandomTileClicksInMs);
        }
        return () => {
            cancelRequestAnimationFrameStep();
        };
    }, [winnerOfGame, boardIsFull]);

    return (
        <div id="ticTacToeGameContainer">
            <div id="leftColumn">
                {!winnerOfGame && !boardIsFull ? (
                    <Text id="nextPlayer" strong>
                        {" "}
                        {`next player is ${whosTurnIsIt.toUpperCase()}`}
                    </Text>
                ) : !winnerOfGame && boardIsFull ? (
                    <Text strong type="warning">
                        draw
                    </Text>
                ) : (
                    <Text
                        id="winnerOfGame"
                        strong
                        type="success"
                    >{`winner of game is ${winnerOfGame?.toUpperCase()}`}</Text>
                )}
                <Board
                    cellClickable={false}
                    gutterSizeInPx={5}
                    boardTileSizeInPx={ticTacToeBoardSize}
                    naughtsAndCrossesArrayData={ticTacToeArray}
                />
            </div>
        </div>
    );
}

export default RandomPlayingTicTacToe;
