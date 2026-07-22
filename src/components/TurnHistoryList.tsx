import { Button, Timeline } from "antd";
import { NaughtOrCrossValue } from "./Cell";
import { TimelineItemType } from "antd/es/timeline/Timeline";
import { ClockCircleOutlined } from "@ant-design/icons";

import { Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { countPlacedSymbols } from "../utils/countPlacedSymbols";

const { Title } = Typography;

interface TurnHistoryListProps {
    ticTacToeArrayTurnHistory: NaughtOrCrossValue[][];
    onTurnHistoryClick: (
        turnHistoryArrayForThatTurn: NaughtOrCrossValue[],
        indexForThatTurn: number,
    ) => void;
    onResetGameClick: () => void;
    naughtsAndCrossesArrayData: NaughtOrCrossValue[];
}

export function TurnHistoryList({
    ticTacToeArrayTurnHistory,
    onTurnHistoryClick,
    onResetGameClick,
    naughtsAndCrossesArrayData,
}: TurnHistoryListProps) {
    const [currentlySelectedTurnIndex, setCurrentlySelectedTurnIndex] =
        useState<number | null>(null);

    // this use effect block handles logic for always making last turn in list "highlighted" when a player does a new turn
    useEffect(() => {
        const nOfPlacesSymbolsOnBoard = countPlacedSymbols(
            naughtsAndCrossesArrayData,
        );

        setCurrentlySelectedTurnIndex(nOfPlacesSymbolsOnBoard - 1);
    }, [naughtsAndCrossesArrayData]);

    let timeLineItems: TimelineItemType[] = [
        {
            content: (
                <Button
                    style={{ marginTop: "-10px" }}
                    disabled={ticTacToeArrayTurnHistory.length === 0}
                    type={
                        currentlySelectedTurnIndex === -1
                            ? "primary"
                            : "default"
                    }
                    onClick={() => {
                        onResetGameClick();
                        setCurrentlySelectedTurnIndex(-1);
                    }}
                    className="historyButtonTurn"
                >
                    back to start
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
                        i === currentlySelectedTurnIndex ? "primary" : "default"
                    }
                    onClick={() => {
                        onTurnHistoryClick(arrayFromTurn, i);
                        setCurrentlySelectedTurnIndex(i);
                    }}
                    className="historyButtonTurn"
                >{`go to turn ${i + 1}`}</Button>
            ),
        });
    });

    return (
        <div id="historyButtonTurnContainer">
            <Title level={3} style={{ marginBottom: "20px" }}>
                {" "}
                turn history{" "}
            </Title>
            <Timeline items={timeLineItems} />
        </div>
    );
}
