import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import "./App.css";
import { Board } from "./Board";
import { NaughtOrCrossValue } from "../types/ticTacToe";
import {
    ClientToServerEvents,
    ServerToClientEvents,
} from "../types/socketEvents";
import { TurnHistoryList } from "./TurnHistoryList";
import { PlayerNameEntry } from "./PlayerNameEntry";
import { Typography } from "antd";

export type HandleClickTile = (indexOfTileToUpdate: number) => void;

const { Title, Text } = Typography;

const serverUrl =
    process.env.REACT_APP_SERVER_URL ?? "http://localhost:4000";

type GamePhase = "enteringName" | "waiting" | "playing" | "over";

function App() {
    const socketRef = useRef<Socket<
        ServerToClientEvents,
        ClientToServerEvents
    > | null>(null);

    const [gamePhase, setGamePhase] = useState<GamePhase>("enteringName");
    const [roomId, setRoomId] = useState<string | null>(null);
    const [mySymbol, setMySymbol] = useState<"x" | "o" | null>(null);
    const [myName, setMyName] = useState<string | null>(null);
    const [opponentName, setOpponentName] = useState<string | null>(null);
    const [opponentLeftMessage, setOpponentLeftMessage] = useState<
        string | null
    >(null);

    const [ticTacToeArray, setTicTacToeArray] = useState<
        NaughtOrCrossValue[]
    >(new Array(9).fill(null));
    const [ticTacToeArrayTurnHistory, setTicTacToeArrayTurnHistory] =
        useState<NaughtOrCrossValue[][]>([]);
    const [currentTurn, setCurrentTurn] = useState<"x" | "o">("x");
    const [winnerOfGame, setWinnerOfGame] = useState<NaughtOrCrossValue>(
        null,
    );
    const [isDraw, setIsDraw] = useState(false);

    const [previewedBoard, setPreviewedBoard] = useState<
        NaughtOrCrossValue[] | null
    >(null);

    const ticTacToeBoardSize = 50;

    useEffect(() => {
        const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
            io(serverUrl);
        socketRef.current = socket;

        socket.on("waitingForOpponent", () => {
            setGamePhase("waiting");
        });

        socket.on(
            "gameStart",
            ({ roomId, yourSymbol, yourName, opponentName, board }) => {
                setRoomId(roomId);
                setMySymbol(yourSymbol);
                setMyName(yourName);
                setOpponentName(opponentName);
                setOpponentLeftMessage(null);
                setTicTacToeArray(board);
                setTicTacToeArrayTurnHistory([]);
                setCurrentTurn("x");
                setWinnerOfGame(null);
                setIsDraw(false);
                setPreviewedBoard(null);
                setGamePhase("playing");
            },
        );

        socket.on(
            "stateUpdate",
            ({ board, boardHistory, turn }) => {
                setTicTacToeArray(board);
                setTicTacToeArrayTurnHistory(boardHistory);
                setCurrentTurn(turn);
                setPreviewedBoard(null);
            },
        );

        socket.on("gameOver", ({ winner, isDraw }) => {
            setWinnerOfGame(winner);
            setIsDraw(isDraw);
            setGamePhase("over");
        });

        socket.on("opponentLeft", ({ opponentName }) => {
            setOpponentLeftMessage(`${opponentName} left the game`);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleJoin = useCallback((playerName: string) => {
        socketRef.current?.emit("join", { playerName });
    }, []);

    const handleClickTile: HandleClickTile = useCallback(
        function (indexOfTileToUpdate: number): void {
            if (!roomId || previewedBoard) {
                return;
            }
            socketRef.current?.emit("makeMove", {
                roomId,
                cellIndex: indexOfTileToUpdate,
            });
        },
        [roomId, previewedBoard],
    );

    const isConnectedToGame = gamePhase === "playing" || gamePhase === "over";
    const isMyTurn = mySymbol !== null && currentTurn === mySymbol;
    const cellClickable =
        isConnectedToGame &&
        previewedBoard === null &&
        !winnerOfGame &&
        !isDraw &&
        isMyTurn;

    const boardToDisplay = previewedBoard ?? ticTacToeArray;

    return (
        <div className="App">
            <Title> Tic-Tac-Toe </Title>
            <h4 id="reactFundamentals">
                React Fundamentals & Advanced Concepts
            </h4>

            {gamePhase === "enteringName" || gamePhase === "waiting" ? (
                <PlayerNameEntry
                    onJoin={handleJoin}
                    disabled={gamePhase === "waiting"}
                    statusText={
                        gamePhase === "waiting"
                            ? "waiting for an opponent to join..."
                            : null
                    }
                />
            ) : (
                <div id="ticTacToeGameContainer">
                    <div id="leftColumn">
                        <Text id="opponentInfo">
                            {`you are ${mySymbol?.toUpperCase()} — playing against ${opponentName}`}
                        </Text>
                        {opponentLeftMessage ? (
                            <Text id="opponentLeftMessage" type="danger">
                                {opponentLeftMessage}
                            </Text>
                        ) : !winnerOfGame && !isDraw ? (
                            <Text id="nextPlayer" strong>
                                {" "}
                                {`next player is ${
                                    isMyTurn ? "you" : opponentName
                                }`}
                            </Text>
                        ) : !winnerOfGame && isDraw ? (
                            <Text strong type="warning">
                                draw
                            </Text>
                        ) : (
                            <Text
                                id="winnerOfGame"
                                strong
                                type="success"
                            >{`winner of game is ${
                                winnerOfGame === mySymbol
                                    ? myName
                                    : opponentName
                            }`}</Text>
                        )}
                        <Board
                            cellClickable={cellClickable}
                            gutterSizeInPx={5}
                            boardTileSizeInPx={ticTacToeBoardSize}
                            onClickTile={handleClickTile}
                            naughtsAndCrossesArrayData={boardToDisplay}
                        />
                    </div>
                    <div>
                        <TurnHistoryList
                            liveBoardData={ticTacToeArray}
                            ticTacToeArrayTurnHistory={
                                ticTacToeArrayTurnHistory
                            }
                            isPreviewing={previewedBoard !== null}
                            onPreviewTurn={function (
                                turnHistoryArrayForThatTurn: NaughtOrCrossValue[],
                            ): void {
                                setPreviewedBoard(turnHistoryArrayForThatTurn);
                            }}
                            onPreviewStart={function (): void {
                                setPreviewedBoard(Array(9).fill(null));
                            }}
                            onReturnToLiveGame={function (): void {
                                setPreviewedBoard(null);
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
