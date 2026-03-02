import { useEffect, useState } from "react";
import "./App.css";
import { Board } from "./Board";
import { NaughtOrCrossValue } from "./Cell";
import { ticTacToeHasWon } from "./ticTacToeHasWon";
import { TurnHistoryList } from "./TurnHistoryList";

function App() {
    const [ticTacToeArray, setTicTacToeArray] = useState<NaughtOrCrossValue[]>(
        new Array(9).fill(null),
    );

    const [ticTacToeArrayTurnHistory, setTicTacToeArrayTurnHistory] = useState<
        NaughtOrCrossValue[][]
    >([]);

    const [winnerOfGame, setWinnerOfGame] = useState<NaughtOrCrossValue>(null);

    const [ticTacToeBoardSize, setTicTacToeBoardSize] = useState<number>(50);

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

    return (
        <div className="App">
            <h2> tic-tac-toe </h2>

            <div id="ticTacToeGameContainer">
                <div id="leftColumn">
                    <div>
                        <input
                            type="range"
                            id="ticTacToeSize"
                            name="board size"
                            min="30"
                            max="70"
                            step={5}
                            value={ticTacToeBoardSize}
                            onChange={(val) => {
                                setTicTacToeBoardSize(Number(val.target.value));
                            }}
                        />
                        <label htmlFor="ticTacToeSize">board size</label>
                    </div>
                    <h5> {`next player is ${whosTurnIsIt}`} </h5>
                    <Board
                        gutterSizeInPx={5}
                        boardTileSizeInPx={ticTacToeBoardSize}
                        onClickTile={function (
                            rowIndex: number,
                            columnIndex: number,
                        ): void {
                            if (!winnerOfGame) {
                                const indexToUpdateInTicTacToeArray =
                                    rowIndex * 3 + columnIndex;
                                if (
                                    ticTacToeArrayCopy[
                                        indexToUpdateInTicTacToeArray
                                    ] === null
                                ) {
                                    ticTacToeArrayCopy[
                                        indexToUpdateInTicTacToeArray
                                    ] = whosTurnIsIt;

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
                        }}
                        naughtsAndCrossesArrayData={ticTacToeArray}
                    />
                    {winnerOfGame && (
                        <h4>{`winner of game is ${winnerOfGame}`}</h4>
                    )}
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
