import Title from "antd/es/typography/Title";


interface TicTacToeTitleTextProps{
    subTitle: string;
}

export function TicTacToeTitleText({subTitle}: TicTacToeTitleTextProps) {
    return (
        <>
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
                {subTitle}
            </Title>
        </>
    );
}
