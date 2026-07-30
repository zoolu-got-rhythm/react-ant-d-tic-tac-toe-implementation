import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Board } from "./Board";
import { NaughtOrCrossValue } from "./Cell";
import { ticTacToeHasWon } from "../utils/ticTacToeHasWon";
import { TurnHistoryList } from "./TurnHistoryList";
import { Typography } from "antd";
import { isBoardFull } from "../utils/isBoardFull";
import { countPlacedSymbols } from "../utils/countPlacedSymbols";
import RandomPlayingTicTacToe from "./RandomPlayingTicTacToe";
import { Menu } from "./Menu";

export type HandleClickTile = (indexOfTileToUpdate: number) => void;

const { Title, Text } = Typography;

function PractiseTimeTravel() {
    const [ticTacToeArray, setTicTacToeArray] = useState<NaughtOrCrossValue[]>(
        new Array(9).fill(null),
    );

    const [ticTacToeArrayTurnHistory, setTicTacToeArrayTurnHistory] = useState<
        NaughtOrCrossValue[][]
    >([]);

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

    const handleClickTile: HandleClickTile = useCallback(
        function (indexOfTileToUpdate: number): void {
            if (winnerOfGame) {
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

                setTicTacToeArrayTurnHistory((previousTurnHistory) => [
                    ...previousTurnHistory.slice(0, entriesLength),
                    nextTicTacToeArray,
                ]);

                return nextTicTacToeArray;
            });
        },
        [winnerOfGame],
    );

    return (
        <div className="App">

            <Menu />
            {/* <Title> Tic-Tac-Toe </Title>
            <h4 id="reactFundamentals">
                React Fundamentals & Advanced Concepts
            </h4>

            <div id="ticTacToeGameContainer"> */}
                {/* <RandomPlayingTicTacToe /> */}
                {/* <div id="leftColumn">
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
                        >{`winner of game is ${winnerOfGame}`}</Text>
                    )}
                    <Board
                        ticTacToeArrayTurnHistory={ticTacToeArrayTurnHistory}
                        cellClickable={!winnerOfGame}
                        gutterSizeInPx={5}
                        boardTileSizeInPx={ticTacToeBoardSize}
                        onClickTile={handleClickTile}
                        naughtsAndCrossesArrayData={ticTacToeArray}
                    />
                </div>
                <div>
                    <TurnHistoryList
                        naughtsAndCrossesArrayData={ticTacToeArray}
                        ticTacToeArrayTurnHistory={ticTacToeArrayTurnHistory}
                        onTurnHistoryClick={function (
                            turnHistoryArrayForThatTurn: NaughtOrCrossValue[],
                            indexForThatTurn: number,
                        ): void {
                            setTicTacToeArray(turnHistoryArrayForThatTurn);
                        }}
                        onResetGameClick={function (): void {
                            setTicTacToeArray(Array(9).fill(null));
                        }}
                    />
                </div> */}
            {/* </div> */}
        </div>
    );
}

export default PractiseTimeTravel;
