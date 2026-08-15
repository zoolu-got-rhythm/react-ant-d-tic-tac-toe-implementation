import { useEffect, useRef, useState } from "react";
import { Button, Input, InputRef, Typography } from "antd";

const { Title, Text } = Typography;

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

    const maxNameLength = 10;

    const playerNameInputRef = useRef<InputRef>(null);
    useEffect(() => {
        playerNameInputRef.current?.focus();
    }, []);

    return (
        <div id="playerNameEntryContainer">
            <Title level={4}>enter your name to find an opponent</Title>

            <div>
                <div
                    style={{
                        display: "inline-flex",
                        flexDirection: "column",
                        alignItems: "start",
                    }}
                >
                    <Input
                        ref={playerNameInputRef}
                        id="playerNameInput"
                        placeholder="your name"
                        value={playerName}
                        disabled={disabled}
                        onChange={(event) =>
                            event.target.value.length <= maxNameLength &&
                            setPlayerName(event.target.value)
                        }
                        onPressEnter={handleJoinClick}
                        style={{ maxWidth: "240px", marginRight: "8px" }}
                    />
                    <Text
                        type="secondary"
                        style={{ marginLeft: "3px", marginTop: "-3px" }}
                    >
                        {`${playerName.length}/${maxNameLength}`}
                    </Text>
                </div>
            </div>

            <Button
                style={{ marginTop: "10px" }}
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
