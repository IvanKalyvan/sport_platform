import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ConfirmEmail.module.css";

const ConfirmEmail = () => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const messageFromUrl = queryParams.get("message");
        const isError = queryParams.get("error") === "true";

        if (messageFromUrl) {
            setMessage(decodeURIComponent(messageFromUrl));
            setError(isError);
        }
    }, [location.search]);

    const handleRedirect = (goToLogin = false) => {
        navigate(goToLogin ? "/login" : "/");
    };

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.card} ${error ? styles.error : styles.success}`}>
                <h1>{error ? "Error" : "Congratulations!"}</h1>
                <p>{message}</p>
                <div className={styles.buttons}>
                    <button onClick={() => handleRedirect(false)} className={styles.backButton}>
                        Go to Main Page
                    </button>
                    {!error && (
                        <button onClick={() => handleRedirect(true)} className={styles.loginButton}>
                            Go to Login
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConfirmEmail;
