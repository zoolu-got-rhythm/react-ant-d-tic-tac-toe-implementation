import Title from "antd/es/typography/Title";
import { BackButton } from "./BackButton";

interface TicTacToeTitleTextProps {
    subTitle: string;
}

export function TicTacToeTitleText({ subTitle }: TicTacToeTitleTextProps) {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                }}
            >
                <BackButton
                    style={{
                        marginRight: "15px",
                        marginTop: "11px",
                        position: "absolute",
                        left: "-43px",
                    }}
                />
                <Title> Tic-Tac-Toe </Title>
            </div>

            <Title
                level={4}
                style={{
                    margin: "0px",
                    marginTop: "-15px",
                    padding: "0px",
                    color: "#888",
                }}
            >
                {subTitle}
            </Title>
        </>
    );
}
