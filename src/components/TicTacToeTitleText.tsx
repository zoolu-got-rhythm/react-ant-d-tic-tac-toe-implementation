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

                <h1 className="dynapuff-bold" style={{ position: "relative" }}>
                    {" "}
                    Tic-Tac-Toe{" "}
                    <img
                        src={blackMarkerPenImageWebp}
                        style={{
                            // em units so this scales with the h1's clamp()-driven
                            // font-size instead of drifting at narrower viewports
                            height: "3.125em",
                            width: "auto",
                            position: "absolute",
                            top: "-1.70em",
                            left: "5.73em",
                        }}
                    />
                </h1>
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
