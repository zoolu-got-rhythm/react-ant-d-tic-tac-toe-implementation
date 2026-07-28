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

const serverUrl = process.env.REACT_APP_SERVER_URL ?? "http://localhost:4000";

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

    const [ticTacToeArray, setTicTacToeArray] = useState<NaughtOrCrossValue[]>(
        new Array(9).fill(null),
    );
    const [ticTacToeArrayTurnHistory, setTicTacToeArrayTurnHistory] = useState<
        NaughtOrCrossValue[][]
    >([]);
    const [currentTurn, setCurrentTurn] = useState<"x" | "o">("x");
    const [winnerOfGame, setWinnerOfGame] = useState<NaughtOrCrossValue>(null);
    const [isDraw, setIsDraw] = useState(false);

    const [previewedBoard, setPreviewedBoard] = useState<
        NaughtOrCrossValue[] | null
    >(null);

    const ticTacToeBoardSize = 70;

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

        socket.on("stateUpdate", ({ board, boardHistory, turn }) => {
            setTicTacToeArray(board);
            setTicTacToeArrayTurnHistory(boardHistory);
            setCurrentTurn(turn);
            setPreviewedBoard(null);
        });

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

    const nameOfWinnerOfGame =
        winnerOfGame === mySymbol ? myName : opponentName;

    return (
        <div className="App">
            <Title> Tic-Tac-Toe </Title>
            <Title
                level={4}
                style={{
                    margin: "0px",
                    marginTop: "-15px",
                    padding: "0px",
                    color: "#888",
                }}
            >
                {" "}
                online 🔌{" "}
            </Title>
            {opponentName && (
                <h4
                    id="reactFundamentals"
                    style={{ marginTop: "15px" }}
                >{`${myName} vs ${opponentName}`}</h4>
            )}

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
                    {opponentLeftMessage ? (
                        <Text id="opponentLeftMessage" type="danger">
                            {opponentLeftMessage}
                        </Text>
                    ) : !winnerOfGame && !isDraw ? (
                        <Text id={isMyTurn ? "nextPlayer" : ""} strong>
                            {isMyTurn
                                ? "it's your turn"
                                : `it's ${opponentName}'s turn`}
                        </Text>
                    ) : !winnerOfGame && isDraw ? (
                        <Text strong type="warning">
                            draw
                        </Text>
                    ) : (
                        <Text
                            id="winnerOfGame"
                            strong
                            type={
                                nameOfWinnerOfGame === myName
                                    ? "success"
                                    : "danger"
                            }
                        >{`winner of game is ${nameOfWinnerOfGame}`}</Text>
                    )}
                    <Board
                        cellClickable={cellClickable}
                        gutterSizeInPx={5}
                        boardTileSizeInPx={ticTacToeBoardSize}
                        onClickTile={handleClickTile}
                        naughtsAndCrossesArrayData={boardToDisplay}
                    />
                </div>
            )}
        </div>
    );
}

export default App;
