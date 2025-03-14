import React from "react";
import Header from "./Header";
import styles from "./Main.module.css";

const Main = () => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <main className={styles.container}>
                <h1>Welcome to Our Website</h1>
                <p>Explore and enjoy our services.</p>
            </main>
        </div>
    );
};

export default Main;
