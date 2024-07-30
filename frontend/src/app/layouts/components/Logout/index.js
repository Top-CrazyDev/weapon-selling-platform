import React from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
    const history = useHistory()

    const logout = () => {
        localStorage.setItem("aotacticalToken", "");
        localStorage.setItem("aotacticalRole", "");
        history.push("/");
    }

    return (
        <a onClick={logout} style={{
            fontSize: '18px',
            display: 'inline-block',
            marginLeft: '15px',
            marginRight: '15px',
            color: '#fff'
        }}>
            Logout
        </a>
    );
};

export default Logout;