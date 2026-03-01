import { NaughtOrCrossValue } from "./Cell";

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
    return (
        <div id="historyButtonTurnContainer">
            <h4> turn history </h4>
            <button
                onClick={() => onResetGameClick()}
                className="historyButtonTurn"
            >
                back to start
            </button>
            {ticTacToeArrayTurnHistory.map((arrayFromTurn, i) => {
                return (
                    <button
                        onClick={() => onTurnHistoryClick(arrayFromTurn, i)}
                        className="historyButtonTurn"
                    >{`go to turn ${i + 1}`}</button>
                );
            })}
        </div>
    );
}
