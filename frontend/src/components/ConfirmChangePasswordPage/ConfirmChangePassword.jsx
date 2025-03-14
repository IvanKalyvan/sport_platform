import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ConfirmChangePassword.module.css';

function ConfirmationChangePassword() {
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const messageFromUrl = queryParams.get('message');
        const isError = queryParams.get('error') === 'true';

        if (messageFromUrl) {
            setMessage(decodeURIComponent(messageFromUrl));
            setError(isError);
        }
    }, [location.search]);

    const handleRedirect = (goToLogin = false) => {
        if (goToLogin) {
            navigate('/login');
        } else {
            navigate('/');
        }
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.alert} ${error ? styles.alertError : styles.alertSuccess}`}>
                <h1>{error ? 'Error' : 'Success'}</h1>
                <p>{message}</p>
            </div>
            <div className={styles.buttonsContainer}>
                <button onClick={() => handleRedirect(false)} className={styles.buttonSecondary}>
                    Go to main page
                </button>

                {!error && (
                    <button onClick={() => handleRedirect(true)} className={styles.buttonPrimary}>
                        Go to login
                    </button>
                )}
            </div>
        </div>
    );
}

export default ConfirmationChangePassword;
