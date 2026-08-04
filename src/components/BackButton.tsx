import { Button } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router";
import { CSSProperties } from "react";

interface BackButtonProps {
    style?: CSSProperties;
}

export const BackButton = ({ style }: BackButtonProps) => {
    const navigate = useNavigate();

    const location = useLocation();

    if (location.pathname === "/") return null; // hide on home route

    return (
        <Button
            style={style}
            type="dashed"
            icon={
                <RollbackOutlined
                    style={{
                        fontSize: "1.6em",
                        color: "#aaa",
                    }}
                />
            }
            onClick={() => navigate(-1)}
        ></Button>
    );
};
