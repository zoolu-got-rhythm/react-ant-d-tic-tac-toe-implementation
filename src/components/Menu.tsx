import Title from "antd/es/typography/Title";
import RandomPlayingTicTacToe from "./RandomPlayingTicTacToe";
import { Button } from "antd";

export function Menu() {
    return (
        <div className="App">
            <Title> Tic-Tac-Toe </Title>
            <Button style={{ width: "200px" }} onClick={() => {}}>
                free play
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
