import { BoardDimensionsProps } from "./Board";
import { useHasMounted } from "../hooks/useHasMounted";
import "./App.css";
import { Typography } from "antd";
import { useEffect, useRef } from "react";
import { timeStamp } from "console";
import { useRequestAnimationFrameStep } from "../hooks/useRequestionAnimationFrameStep";

const { Text } = Typography;

export type NaughtOrCrossValue = "x" | "o" | null;

interface CellProps extends BoardDimensionsProps {
    naughtOrCrossValue: NaughtOrCrossValue;
    onClick: () => void;
}

export function Cell({
    naughtOrCrossValue,
    gutterSizeInPx,
    boardTileSizeInPx,
    onClick,
    cellClickable,
}: CellProps) {
    useHasMounted("<Cell />");

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [requestAnimationFrameStep, cancelRequestAnimationFrameStep] =
        useRequestAnimationFrameStep();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }

        const devicePixelRatio = window.devicePixelRatio || 1;
        const size = boardTileSizeInPx;
        canvas.width = size * devicePixelRatio;
        canvas.height = size * devicePixelRatio;
        // canvas.style.width = `${size}px`;
        // canvas.style.height = `${size}px`;

        const context = canvas.getContext("2d");
        if (!context) {
            return;
        }

        context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
        context.clearRect(0, 0, size, size);
        context.strokeStyle = "#000";
        context.lineWidth = 5;
        context.lineCap = "round";

        const inset = size * 0.2;

        if (naughtOrCrossValue === "o") {
            const radius = (size - inset * 2) / 2;
            let fullCircle = Math.PI * 2;
            let circleSegment = (Math.PI * 2) / 10;
            let circleDrawProgressInRadians = circleSegment;

            requestAnimationFrameStep(() => {
                context.beginPath();
                context.arc(
                    size / 2,
                    size / 2,
                    radius,
                    circleDrawProgressInRadians - circleDrawProgressInRadians,
                    circleDrawProgressInRadians,
                );
                context.stroke();

                if (circleDrawProgressInRadians >= fullCircle) {
                    cancelRequestAnimationFrameStep();
                }

                circleDrawProgressInRadians += circleSegment;
            }, 1000 / 60);
        } else if (naughtOrCrossValue === "x") {
            let currentPercentage = 0;
            let lineToDraw: "leftToBottomRight" | "rightToBottomLeft" =
                "leftToBottomRight";

            let lastPercentage = 0;
            requestAnimationFrameStep(() => {
                currentPercentage += 0.2;

                console.log("percentages", lastPercentage, currentPercentage);

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
            }, 1000 / 60);
        }
    }, [boardTileSizeInPx, naughtOrCrossValue]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                marginLeft: `${gutterSizeInPx}px`,
                width: `${boardTileSizeInPx}px`,
                height: `${boardTileSizeInPx}px`,
            }}
            onClick={onClick}
            className={`cell ${cellClickable && "cellClickable"}`}
        />
    );
}
