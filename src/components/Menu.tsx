import Title from "antd/es/typography/Title";
import RandomPlayingTicTacToe from "./RandomPlayingTicTacToe";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { TicTacToeTitleText } from "./TicTacToeTitleText";

export function Menu() {
    const navigate = useNavigate();

    return (
        <div className="App">
            <TicTacToeTitleText subTitle="online 🔌" />
            <Button
                style={{ width: "200px", marginTop: "25px" }}
                onClick={() => {
                    navigate("/practise");
                }}
            >
                practice
            </Button>
            <Button
                style={{ width: "200px", marginTop: "10px" }}
                onClick={() => {
                    navigate("/online-play");
                }}
            >
                online play
            </Button>
            <RandomPlayingTicTacToe />
        </div>
    );
}
