import { NaughtOrCrossValue } from "./ticTacToe";

export type MoveRejectedReason = "notYourTurn" | "cellTaken" | "gameOver";

export interface ClientToServerEvents {
    join: (payload: { playerName: string }) => void;
    makeMove: (payload: { roomId: string; cellIndex: number }) => void;
    requestPlayAgain: () => void;
    acceptPlayAgain: () => void;
}

export interface ServerToClientEvents {
    waitingForOpponent: () => void;
    gameStart: (payload: {
        roomId: string;
        yourSymbol: "x" | "o";
        yourName: string;
        opponentName: string;
        board: NaughtOrCrossValue[];
    }) => void;
    stateUpdate: (payload: {
        board: NaughtOrCrossValue[];
        boardHistory: NaughtOrCrossValue[][];
        turn: "x" | "o";
        lastMoveBy: "x" | "o";
    }) => void;
    gameOver: (payload: {
        board: NaughtOrCrossValue[];
        winner: NaughtOrCrossValue;
        isDraw: boolean;
    }) => void;
    opponentLeft: (payload: { opponentName: string }) => void;
    moveRejected: (payload: { reason: MoveRejectedReason }) => void;
    requestOpponentToPlayAgain: () => void;
}
