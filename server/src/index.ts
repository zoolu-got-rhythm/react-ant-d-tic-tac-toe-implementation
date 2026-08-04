import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import {
    ClientToServerEvents,
    ServerToClientEvents,
} from "../../src/types/socketEvents";
import { RoomStore, PlayerConn } from "./rooms";
import { applyMove, evaluateBoard, whoseTurnIsIt } from "./gameEngine";

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
const clientOrigin = process.env.CLIENT_ORIGIN ?? "http://localhost:3000";

const app = express();
app.use(cors({ origin: clientOrigin }));
app.get("/health", (_req, res) => res.json({ ok: true }));

const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
    cors: { origin: clientOrigin },
});

const roomStore = new RoomStore();

io.on(
    "connection",
    (socket: Socket<ClientToServerEvents, ServerToClientEvents>) => {
        socket.on("join", ({ playerName }) => {
            const newPlayer: PlayerConn = { socketId: socket.id, playerName };
            const room = roomStore.joinOrPair(newPlayer);

            if (!room) {
                socket.emit("waitingForOpponent");
                return;
            }

            socket.join(room.roomId);
            io.sockets.sockets.get(room.players.x.socketId)?.join(room.roomId);

            io.to(room.players.x.socketId).emit("gameStart", {
                roomId: room.roomId,
                yourSymbol: "x",
                yourName: room.players.x.playerName,
                opponentName: room.players.o!.playerName,
                board: room.board,
            });

            io.to(room.players.o!.socketId).emit("gameStart", {
                roomId: room.roomId,
                yourSymbol: "o",
                yourName: room.players.o!.playerName,
                opponentName: room.players.x.playerName,
                board: room.board,
            });
        });

        socket.on("makeMove", ({ roomId, cellIndex }) => {
            const room = roomStore.getRoom(roomId);
            if (!room || room.winner || room.isDraw) {
                socket.emit("moveRejected", { reason: "gameOver" });
                return;
            }

            const mySymbol: "x" | "o" =
                room.players.x.socketId === socket.id ? "x" : "o";
            const turn = whoseTurnIsIt(room.board);

            if (mySymbol !== turn) {
                socket.emit("moveRejected", { reason: "notYourTurn" });
                return;
            }

            if (room.board[cellIndex] !== null) {
                socket.emit("moveRejected", { reason: "cellTaken" });
                return;
            }

            room.board = applyMove(room.board, cellIndex, mySymbol);
            room.boardHistory = [...room.boardHistory, room.board];

            const { winner, isDraw } = evaluateBoard(room.board);
            room.winner = winner;
            room.isDraw = isDraw;

            io.to(roomId).emit("stateUpdate", {
                board: room.board,
                boardHistory: room.boardHistory,
                turn: whoseTurnIsIt(room.board),
                lastMoveBy: mySymbol,
            });

            if (winner || isDraw) {
                io.to(roomId).emit("gameOver", {
                    board: room.board,
                    winner,
                    isDraw,
                });
            }
        });

        socket.on("disconnect", () => {
            roomStore.clearWaitingPlayer(socket.id);

            const room = roomStore.getRoomBySocketId(socket.id);
            if (!room) {
                return;
            }

            const isX = room.players.x.socketId === socket.id;
            const leavingPlayer = isX ? room.players.x : room.players.o;
            const remainingSocketId = isX
                ? room.players.o?.socketId
                : room.players.x.socketId;

            if (remainingSocketId && leavingPlayer) {
                io.to(remainingSocketId).emit("opponentLeft", {
                    opponentName: leavingPlayer.playerName,
                });
            }

            roomStore.removeRoom(room.roomId);
        });

        socket.on("requestPlayAgain", () => {
            const room = roomStore.getRoomBySocketId(socket.id);
            if (!room) {
                return;
            }

            const isX = room.players.x.socketId === socket.id;
            const otherPlayersSocketId = isX
                ? room.players.o?.socketId
                : room.players.x.socketId;

            if (otherPlayersSocketId) {
                io.to(otherPlayersSocketId).emit("requestOpponentToPlayAgain");
            }
        });

        socket.on("acceptPlayAgain", () => {
            const room = roomStore.getRoomBySocketId(socket.id);
            if (!room) {
                return;
            }

            roomStore.resetGameForGivenRoom(room.roomId)


            io.to(room.players.x.socketId).emit("gameStart", {
                roomId: room.roomId,
                yourSymbol: "x",
                yourName: room.players.x.playerName,
                opponentName: room.players.o!.playerName,
                board: room.board,
            });

            io.to(room.players.o!.socketId).emit("gameStart", {
                roomId: room.roomId,
                yourSymbol: "o",
                yourName: room.players.o!.playerName,
                opponentName: room.players.x.playerName,
                board: room.board,
            });
        });
    },
);

httpServer.listen(port, () => {
    console.log(`tic-tac-toe socket.io server listening on port ${port}`);
});
