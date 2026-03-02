import { Button, Timeline } from "antd";
import { NaughtOrCrossValue } from "./Cell";
import Title from "antd/es/typography/Title";
import { TimelineItemType } from "antd/es/timeline/Timeline";
import { ClockCircleOutlined } from "@ant-design/icons";

interface TurnHistoryListProps {
    ticTacToeArrayTurnHistory: NaughtOrCrossValue[][];
    onTurnHistoryClick: (
        turnHistoryArrayForThatTurn: NaughtOrCrossValue[],
        indexForThatTurn: number,
    ) => void;
    onResetGameClick: () => void;
}

export function TurnHistoryList({
    ticTacToeArrayTurnHistory,
    onTurnHistoryClick,
    onResetGameClick,
}: TurnHistoryListProps) {
    let timeLineItems: TimelineItemType[] = [
        {
            content: (
                <Button
                    style={{ marginTop: "-10px" }}
                    onClick={() => onResetGameClick()}
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
                    onClick={() => onTurnHistoryClick(arrayFromTurn, i)}
                    className="historyButtonTurn"
                >{`go to turn ${i + 1}`}</Button>
            ),
        });
    });

    return (
        <div id="historyButtonTurnContainer">
            <Title level={3} style={{marginBottom: "20px"}}> turn history </Title>

            <Timeline items={timeLineItems} />
        </div>
    );
}
