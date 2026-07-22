import { BoardDimensionsProps } from "./Board";
import { useHasMounted } from "../hooks/useHasMounted";
import "./App.css";
import { memo, useEffect, useRef } from "react";
import { useRequestAnimationFrameStep } from "../hooks/useRequestionAnimationFrameStep";

export type NaughtOrCrossValue = "x" | "o" | null;

interface CellProps extends BoardDimensionsProps {
    naughtOrCrossValue: NaughtOrCrossValue;
    cellIndex: number; // 0, 1, 2, (row 1), 3, 4, 5 (row 2), 6, 7, 8 (row 3)
}

export const Cell = memo(function ({
    naughtOrCrossValue,
    gutterSizeInPx,
    boardTileSizeInPx,
    onClickTile,
    cellClickable,
    cellIndex,
}: CellProps) {
    console.log("naught or cross value", naughtOrCrossValue);
    useHasMounted("<Cell />");

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [requestAnimationFrameStep, cancelRequestAnimationFrameStep] =
        useRequestAnimationFrameStep();

    const cellDataValue = naughtOrCrossValue
        ? `cell ${cellIndex} = ${naughtOrCrossValue}`
        : `cell ${cellIndex} = empty`;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }

        const devicePixelRatio = window.devicePixelRatio || 1;
        const size = boardTileSizeInPx;
        canvas.width = size * devicePixelRatio;
        canvas.height = size * devicePixelRatio;

        const context = canvas.getContext("2d");
        if (!context) {
            return;
        }

        const drawUpdateSpeedInMilliseconds = 1000 / 60;

        context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
        context.clearRect(0, 0, size, size);
        context.strokeStyle = "#000";
        context.lineWidth = 5;
        context.lineCap = "round";

        const inset = size * 0.2;

        if (naughtOrCrossValue === "o") {
            const radius = (size - inset * 2) / 2;
            let fullCircle = Math.PI * 2;
            let circleSegment = fullCircle / 10;
            let circleDrawProgressInRadians = circleSegment;

            let startAngle = (Math.PI * 3) / 2;

            requestAnimationFrameStep(() => {
                context.beginPath();
                context.arc(
                    size / 2,
                    size / 2,
                    radius,
                    startAngle,
                    startAngle + circleDrawProgressInRadians,
                );
                context.stroke();

                if (circleDrawProgressInRadians >= fullCircle) {
                    cancelRequestAnimationFrameStep();
                }

                circleDrawProgressInRadians += circleSegment;
            }, drawUpdateSpeedInMilliseconds);
        } else if (naughtOrCrossValue === "x") {
            let currentPercentage = 0;
            let lineToDraw: "leftToBottomRight" | "rightToBottomLeft" =
                "leftToBottomRight";

            let lastPercentage = 0;
            requestAnimationFrameStep(() => {
                currentPercentage += 0.2;
                context.beginPath();

                if (lineToDraw === "leftToBottomRight") {
                    context.moveTo(
                        inset + (size - inset * 2) * lastPercentage,
                        inset + (size - inset * 2) * lastPercentage,
                    );
                    context.lineTo(
                        inset + (size - inset * 2) * currentPercentage,
                        inset + (size - inset * 2) * currentPercentage,
                    );
                }

                if (lineToDraw === "rightToBottomLeft") {
                    context.moveTo(
                        size - inset - (size - inset * 2) * lastPercentage,
                        inset + (size - inset * 2) * lastPercentage,
                    );
                    context.lineTo(
                        size - inset - (size - inset * 2) * currentPercentage,
                        inset + (size - inset * 2) * currentPercentage,
                    );
                }

                lastPercentage = currentPercentage;

                context.stroke();

                if (currentPercentage === 1) {
                    if (lineToDraw === "rightToBottomLeft")
                        cancelRequestAnimationFrameStep();

                    lineToDraw = "rightToBottomLeft";
                    currentPercentage = 0;
                    lastPercentage = 0;
                }
            }, drawUpdateSpeedInMilliseconds);
        }

        // clean-up to stop canvas drawing
        return () => {
            console.log("clear anim");
            cancelRequestAnimationFrameStep();
        };
    }, [boardTileSizeInPx, naughtOrCrossValue]);

    const handleClickTile = () => {
        onClickTile(cellIndex);
    };

    return (
        <canvas
            ref={canvasRef}
            data-value={cellDataValue}
            aria-label={cellDataValue}
            style={{
                marginLeft: `${gutterSizeInPx}px`,
                width: `${boardTileSizeInPx}px`,
                height: `${boardTileSizeInPx}px`,
            }}
            onClick={handleClickTile}
            className={`cell ${cellClickable && "cellClickable"}`}
        />
    );
});
