import Title from "antd/es/typography/Title";
import "./App.css";
import { BoardDimensionsProps, BoardProps } from "./Board";
import { useHasMounted } from "./hooks/useHasMounted";
import Text from "antd/es/typography/Text";

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
            <Text
                strong
                style={{
                    fontSize: "50px",
                }}
            >
                {NaughtOrCrossValue}
            </Text>
        </div>
    );
}
