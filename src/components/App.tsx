import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Board } from "./Board";
import { NaughtOrCrossValue } from "./Cell";
import { ticTacToeHasWon } from "../utils/ticTacToeHasWon";
import { TurnHistoryList } from "./TurnHistoryList";
import { Typography } from "antd";
import { isBoardFull } from "../utils/isBoardFull";

const { Title, Text } = Typography;

function App() {
    const [ticTacToeArray, setTicTacToeArray] = useState<NaughtOrCrossValue[]>(
        new Array(9).fill(null),
    );

    const [ticTacToeArrayTurnHistory, setTicTacToeArrayTurnHistory] = useState<
        NaughtOrCrossValue[][]
    >([]);

    const [winnerOfGame, setWinnerOfGame] = useState<NaughtOrCrossValue>(null);

    const ticTacToeBoardSize = 50;

    let ticTacToeArrayCopy = [...ticTacToeArray];

    const ticTacToeArrayCopyEntriesLength = ticTacToeArrayCopy.filter(
        (symbol) => symbol === "o" || symbol === "x",
    ).length;

    let whosTurnIsIt: "x" | "o" =
        ticTacToeArrayCopyEntriesLength % 2 === 0 ? "x" : "o";

    useEffect(() => {
        const naughtOrCrossWinner: NaughtOrCrossValue =
            ticTacToeHasWon(ticTacToeArray);
        setWinnerOfGame(naughtOrCrossWinner);
    }, [ticTacToeArray]);

    const boardIsFull = isBoardFull(ticTacToeArrayCopy);

    const handleClickTile = useCallback(
        function (rowIndex: number, columnIndex: number): void {
            if (!winnerOfGame) {
                const indexToUpdateInTicTacToeArray =
                    rowIndex * 3 + columnIndex;
                if (
                    ticTacToeArrayCopy[indexToUpdateInTicTacToeArray] === null
                ) {
                    ticTacToeArrayCopy[indexToUpdateInTicTacToeArray] =
                        whosTurnIsIt;

                    setTicTacToeArrayTurnHistory([
                        ...ticTacToeArrayTurnHistory.slice(
                            0,
                            ticTacToeArrayCopyEntriesLength,
                        ),
                        ticTacToeArrayCopy,
                    ]);

                    setTicTacToeArray(ticTacToeArrayCopy);
                }
            }
        },
        [winnerOfGame],
    );

    return (
        <div className="App">
            <Title> Tic-Tac-Toe </Title>
            <h4 id="reactFundamentals"> React Fundamentals </h4>

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
                        >{`winner of game is ${winnerOfGame}`}</Text>
                    )}
                    <Board
                        cellClickable={!winnerOfGame}
                        gutterSizeInPx={5}
                        boardTileSizeInPx={ticTacToeBoardSize}
                        onClickTile={handleClickTile}
                        naughtsAndCrossesArrayData={ticTacToeArray}
                    />
                </div>
                <div>
                    <TurnHistoryList
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
                </div>
            </div>
        </div>
    );
}

export default App;
