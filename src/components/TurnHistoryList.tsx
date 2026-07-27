import { Button, Timeline } from "antd";
import { NaughtOrCrossValue } from "../types/ticTacToe";
import { TimelineItemType } from "antd/es/timeline/Timeline";
import { ClockCircleOutlined } from "@ant-design/icons";

import { Typography } from "antd";
import { useEffect, useState } from "react";
import { countPlacedSymbols } from "../utils/countPlacedSymbols";

const { Title } = Typography;

interface TurnHistoryListProps {
    ticTacToeArrayTurnHistory: NaughtOrCrossValue[][];
    // liveBoardData is the authoritative, server-driven board. It is only used
    // to keep the "latest turn" highlighted as new moves arrive - previewing
    // history no longer mutates the live game (there's a real opponent now).
    liveBoardData: NaughtOrCrossValue[];
    isPreviewing: boolean;
    onPreviewTurn: (
        turnHistoryArrayForThatTurn: NaughtOrCrossValue[],
        indexForThatTurn: number,
    ) => void;
    onPreviewStart: () => void;
    onReturnToLiveGame: () => void;
}

export function TurnHistoryList({
    ticTacToeArrayTurnHistory,
    liveBoardData,
    isPreviewing,
    onPreviewTurn,
    onPreviewStart,
    onReturnToLiveGame,
}: TurnHistoryListProps) {
    const [currentlySelectedTurnIndex, setCurrentlySelectedTurnIndex] =
        useState<number | null>(null);

    // always highlight the latest live turn in the list once a real move
    // comes in, regardless of what was being previewed before
    useEffect(() => {
        const nOfPlacesSymbolsOnBoard = countPlacedSymbols(liveBoardData);
        setCurrentlySelectedTurnIndex(nOfPlacesSymbolsOnBoard - 1);
    }, [liveBoardData]);

    let timeLineItems: TimelineItemType[] = [
        {
            content: (
                <Button
                    style={{ marginTop: "-10px" }}
                    disabled={ticTacToeArrayTurnHistory.length === 0}
                    type={
                        isPreviewing && currentlySelectedTurnIndex === -1
                            ? "primary"
                            : "default"
                    }
                    onClick={() => {
                        onPreviewStart();
                        setCurrentlySelectedTurnIndex(-1);
                    }}
                    className="historyButtonTurn"
                >
                    preview start
                </Button>
            ),
        },
    ];

    ticTacToeArrayTurnHistory.forEach((arrayFromTurn, i) => {
        timeLineItems.push({
            icon: <ClockCircleOutlined style={{ fontSize: "16px" }} />,
            content: (
                <Button
                    style={{ marginTop: "-10px" }}
                    type={
                        isPreviewing && i === currentlySelectedTurnIndex
                            ? "primary"
                            : "default"
                    }
                    onClick={() => {
                        onPreviewTurn(arrayFromTurn, i);
                        setCurrentlySelectedTurnIndex(i);
                    }}
                    className="historyButtonTurn"
                >{`preview turn ${i + 1}`}</Button>
            ),
        });
    });

    return (
        <div id="historyButtonTurnContainer">
            <Title level={3} style={{ marginBottom: "20px" }}>
                {" "}
                turn history{" "}
            </Title>
            {isPreviewing ? (
                <Button
                    id="returnToLiveGameButton"
                    type="dashed"
                    style={{ marginBottom: "10px" }}
                    onClick={onReturnToLiveGame}
                >
                    return to live game
                </Button>
            ) : null}
            <Timeline items={timeLineItems} />
        </div>
    );
}
