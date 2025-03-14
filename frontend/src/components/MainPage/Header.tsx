import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <header className={styles.header}>
            <button className={styles.button} onClick={() => navigate("/register")}>
                Signup
            </button>
            <button className={styles.button} onClick={() => navigate("/login")}>
                Login
            </button>
        </header>
    );
};

export default Header;
