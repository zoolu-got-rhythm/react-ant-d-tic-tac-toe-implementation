import { BoardDimensionsProps } from "./Board";
import { useHasMounted } from "../hooks/useHasMounted";
import "./App.css";
import { Typography } from "antd";

const { Text } = Typography;



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
    cellClickable
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
            className={`cell ${cellClickable && "cellClickable"}`}
        >
            <Text
                strong
                style={{
                    fontSize: "40px",
                }}
            >
                {NaughtOrCrossValue}
            </Text>
        </div>
    );
}
