import { useEffect, useState } from "react";
import "./App.css";
import { Board } from "./Board";
import { NaughtOrCrossValue } from "./Cell";
import { ticTacToeHasWon } from "./ticTacToeHasWon";

function App() {
    const [ticTacToeArray, setTicTacToeArray] = useState<NaughtOrCrossValue[]>(
        new Array(9).fill(null),
    );

    const [winnerOfGame, setWinnerOfGame] = useState<NaughtOrCrossValue>(null);

    const [ticTacToeBoardSize, setTicTacToeBoardSize] = useState<number>(50);

    useEffect(() => {
        const naughtOrCrossWinner: NaughtOrCrossValue =
            ticTacToeHasWon(ticTacToeArray);
        setWinnerOfGame(naughtOrCrossWinner);
    }, [ticTacToeArray]);
    return (
        <div className="App">
            <h2> tic-tac-toe </h2>
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
            <Board
                gutterSizeInPx={5}
                boardTileSizeInPx={ticTacToeBoardSize}
                onClickTile={function (
                    rowIndex: number,
                    columnIndex: number,
                ): void {
                    if (!winnerOfGame) {
                        let ticTacToeArrayCopy = [...ticTacToeArray];

                        const ticTacToeArrayCopyEntriesLength =
                            ticTacToeArrayCopy.filter(
                                (symbol) => symbol === "o" || symbol === "x",
                            ).length;
                        const indexToUpdateInTicTacToeArray =
                            rowIndex * 3 + columnIndex;
                        if (
                            ticTacToeArrayCopy[
                                indexToUpdateInTicTacToeArray
                            ] === null
                        ) {
                            ticTacToeArrayCopy[indexToUpdateInTicTacToeArray] =
                                ticTacToeArrayCopyEntriesLength % 2 === 0
                                    ? "x"
                                    : "o";

                            setTicTacToeArray(ticTacToeArrayCopy);
                        }
                    }
                }}
                naughtsAndCrossesArrayData={ticTacToeArray}
            />
            {winnerOfGame && <h4>{`winner of game is ${winnerOfGame}`}</h4>}
        </div>
    );
}

export default App;
