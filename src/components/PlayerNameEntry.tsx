import { useState } from "react";
import { Button, Input, Typography } from "antd";

const { Title } = Typography;

interface PlayerNameEntryProps {
    onJoin: (playerName: string) => void;
    disabled: boolean;
    statusText: string | null;
}

export function PlayerNameEntry({
    onJoin,
    disabled,
    statusText,
}: PlayerNameEntryProps) {
    const [playerName, setPlayerName] = useState("");

    const handleJoinClick = () => {
        const trimmedPlayerName = playerName.trim();
        if (!trimmedPlayerName) {
            return;
        }
        onJoin(trimmedPlayerName);
    };

    return (
        <div id="playerNameEntryContainer">
            <Title level={4}>enter your name to find an opponent</Title>
            <Input
                id="playerNameInput"
                placeholder="your name"
                value={playerName}
                disabled={disabled}
                onChange={(event) => setPlayerName(event.target.value)}
                onPressEnter={handleJoinClick}
                style={{ maxWidth: "240px", marginRight: "8px" }}
            />
            <Button
                id="joinGameButton"
                type="primary"
                disabled={disabled || !playerName.trim()}
                onClick={handleJoinClick}
            >
                join game
            </Button>
            {statusText ? <p>{statusText}</p> : null}
        </div>
    );
}
