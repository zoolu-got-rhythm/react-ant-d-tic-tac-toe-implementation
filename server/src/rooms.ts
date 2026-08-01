import { randomUUID } from "crypto";
import { NaughtOrCrossValue } from "../../src/types/ticTacToe";
import { createEmptyBoard } from "./gameEngine";

export interface PlayerConn {
    socketId: string;
    playerName: string;
}

export interface Room {
    roomId: string;
    players: { x: PlayerConn; o: PlayerConn | null };
    board: NaughtOrCrossValue[];
    boardHistory: NaughtOrCrossValue[][];
    winner: NaughtOrCrossValue;
    isDraw: boolean;
}

export class RoomStore {
    private waitingPlayer: PlayerConn | null = null;
    private rooms = new Map<string, Room>();
    private roomIdBySocketId = new Map<string, string>();

    getRoom(roomId: string): Room | undefined {
        return this.rooms.get(roomId);
    }

    resetGameForGivenRoom(roomId: string) {
        const room = this.rooms.get(roomId);
        if (room) {
            room.board = createEmptyBoard();
            room.boardHistory = [];
            room.isDraw = false;
            room.winner = null;
        }
    }

    getRoomBySocketId(socketId: string): Room | undefined {
        const roomId = this.roomIdBySocketId.get(socketId);
        return roomId ? this.rooms.get(roomId) : undefined;
    }

    isWaiting(socketId: string): boolean {
        return this.waitingPlayer?.socketId === socketId;
    }

    clearWaitingPlayer(socketId: string): void {
        if (this.waitingPlayer?.socketId === socketId) {
            this.waitingPlayer = null;
        }
    }

    removeRoom(roomId: string): void {
        const room = this.rooms.get(roomId);
        if (!room) {
            return;
        }
        this.roomIdBySocketId.delete(room.players.x.socketId);
        if (room.players.o) {
            this.roomIdBySocketId.delete(room.players.o.socketId);
        }
        this.rooms.delete(roomId);
    }

    /**
     * Pairs this player with the waiting player, if any. Returns the newly
     * created room, or null if this player is now the one waiting.
     */
    joinOrPair(newPlayer: PlayerConn): Room | null {
        if (!this.waitingPlayer) {
            this.waitingPlayer = newPlayer;
            return null;
        }

        const firstPlayer = this.waitingPlayer;
        this.waitingPlayer = null;

        const room: Room = {
            roomId: randomUUID(),
            players: { x: firstPlayer, o: newPlayer },
            board: createEmptyBoard(),
            boardHistory: [],
            winner: null,
            isDraw: false,
        };

        this.rooms.set(room.roomId, room);
        this.roomIdBySocketId.set(firstPlayer.socketId, room.roomId);
        this.roomIdBySocketId.set(newPlayer.socketId, room.roomId);

        return room;
    }
}
