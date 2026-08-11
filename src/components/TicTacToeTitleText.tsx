import Title from "antd/es/typography/Title";
import { BackButton } from "./BackButton";
import blackMarkerPenImageWebp from "../assets/images/black-marker-pen.webp";

interface TicTacToeTitleTextProps {
    subTitle: string;
}

export function TicTacToeTitleText({ subTitle }: TicTacToeTitleTextProps) {
    //TODO: add a market pen at end of tic-tac-toe relative to the text so it at end of "e" on "toe"
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
                        // marginTop: "11px",
                        position: "absolute",
                        left: "-43px",
                    }}
                />
                <img
                    src={blackMarkerPenImageWebp}
                    style={{
                        height: "150px",
                        width: "auto",
                        position: "absolute",
                        top: "-64px",
                        left: "275px",
                    }}
                />
                <h1 className="dynapuff-bold"> Tic-Tac-Toe </h1>
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
