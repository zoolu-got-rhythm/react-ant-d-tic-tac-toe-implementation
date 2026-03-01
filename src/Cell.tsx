import "./App.css";
import { BoardDimensionsProps, BoardProps } from "./Board";
import { useHasMounted } from "./hooks/useHasMounted";

export type NaughtOrCrossValue = "x" | "o" | null;

interface CellProps extends BoardDimensionsProps {
    NaughtOrCrossValue: NaughtOrCrossValue;
    onClick: () => void;
}

export function Cell({
    NaughtOrCrossValue,
    gutterSizeInPx,
    boardTileSizeInPx,
    onClick,
}: CellProps) {
    useHasMounted("<Cell />");
    return (
        <div
            style={{
                marginLeft: `${gutterSizeInPx}px`,
                width: `${boardTileSizeInPx}px`,
                height: `${boardTileSizeInPx}px`,
            }}
            onClick={onClick}
            className="cell"
        >
            <h2
                style={{
                    fontSize: `${boardTileSizeInPx - 10}px`,
                }}
            >
                {NaughtOrCrossValue}
            </h2>
        </div>
    );
}
