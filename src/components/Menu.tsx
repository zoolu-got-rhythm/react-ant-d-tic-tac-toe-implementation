import Title from "antd/es/typography/Title";
import RandomPlayingTicTacToe from "./RandomPlayingTicTacToe";
import { Button } from "antd";

export function Menu() {
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
                online 🔌
            </Title>
            <Button style={{ width: "200px", marginTop: "25px" }} onClick={() => {}}>
                practise
            </Button>
            <Button
                style={{ width: "200px", marginTop: "10px" }}
                onClick={() => {}}
            >
                online play
            </Button>
            <RandomPlayingTicTacToe />
        </div>
    );
}
