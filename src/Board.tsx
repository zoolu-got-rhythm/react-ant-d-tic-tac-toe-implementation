import { Cell, NaughtOrCrossValue } from "./Cell";
import "./App.css";
import { useEffect } from "react";
import { useHasMounted } from "./hooks/useHasMounted";

export interface BoardDimensionsProps {
    gutterSizeInPx: number;
    boardTileSizeInPx: number;
}

export interface BoardProps extends BoardDimensionsProps {
    onClickTile: (rowIndex: number, columnIndex: number) => void;
    naughtsAndCrossesArrayData: NaughtOrCrossValue[];
}

export function Board({
    gutterSizeInPx,
    boardTileSizeInPx,
    onClickTile,
    naughtsAndCrossesArrayData,
}: BoardProps) {
    const boardRows = 3;
    const boardColumns = 3;

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
                                            onClick={() => {
                                                onClickTile(
                                                    rowIndex,
                                                    columnIndex,
                                                );
                                            }}
                                            NaughtOrCrossValue={
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
