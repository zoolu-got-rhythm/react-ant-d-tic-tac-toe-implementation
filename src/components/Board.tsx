import { Cell } from "./Cell";
import { NaughtOrCrossValue } from "../types/ticTacToe";
import { useHasMounted } from "../hooks/useHasMounted";
import "./App.css";
import { HandleClickTile } from "./App";

export interface BoardDimensionsProps {
    gutterSizeInPx: number;
    boardTileSizeInPx: number;
    cellClickable: boolean;
    onClickTile: HandleClickTile;
}

export interface BoardProps extends BoardDimensionsProps {
    naughtsAndCrossesArrayData: NaughtOrCrossValue[];
}

export function Board({
    gutterSizeInPx,
    boardTileSizeInPx,
    onClickTile,
    naughtsAndCrossesArrayData,
    cellClickable,
}: BoardProps) {
    const boardRows = 3; // this assumption on another file is ok, but in terms of clean coding it's breaking a rule
    const boardColumns = 3; // this assumption on another file is ok, but in terms of clean coding it's breaking a rule
    // changing any of the above 2 lines will silently cause a break (should be refactored)

    useHasMounted("<Board />");

    return (
        <div
            className="board"
            style={{
                paddingRight: `${gutterSizeInPx}px`,
                paddingBottom: `${gutterSizeInPx}px`,
            }}
        >
            {Array(boardRows)
                .fill("")
                .map((_, rowIndex: number) => {
                    return (
                        <div className="row">
                            {Array(boardColumns)
                                .fill("")
                                .map((_, columnIndex: number) => {
                                    const indexOfNaughtOrCrossForCurrentCell =
                                        rowIndex * 3 + columnIndex;
                                    const naughtOrCrossForCurrentCell: NaughtOrCrossValue =
                                        naughtsAndCrossesArrayData[
                                            indexOfNaughtOrCrossForCurrentCell
                                        ];
                                    return (
                                        <Cell
                                            cellIndex={
                                                indexOfNaughtOrCrossForCurrentCell
                                            }
                                            key={
                                                indexOfNaughtOrCrossForCurrentCell
                                            }
                                            cellClickable={cellClickable}
                                            onClickTile={onClickTile}
                                            naughtOrCrossValue={
                                                naughtOrCrossForCurrentCell
                                            }
                                            gutterSizeInPx={gutterSizeInPx}
                                            boardTileSizeInPx={
                                                boardTileSizeInPx
                                            }
                                        />
                                    );
                                })}
                        </div>
                    );
                })}
        </div>
    );
}
