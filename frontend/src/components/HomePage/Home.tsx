import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner, Alert } from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios from 'axios';
import styles from './Home.module.css';

interface AuthContextType {
    logout: () => void;
    email: string;
}

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { logout, email } = useContext(AuthContext) as AuthContextType;

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const response = await axios.get('http://localhost:3001/home', { withCredentials: true });
                setMessage(response.data.message);
            } catch (err) {
                setError('Unauthorized, please log in.');
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        checkAuthorization();
    }, [navigate]);

    const handleLogout = () => {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        logout();
        navigate('/');
    };

    const handleResetPassword = async () => {
        try {
            navigate('/change-password');
        } catch (err: any) {

            if (err.response){

                const errorMessages = err.response.data.message || [];

                setError(errorMessages[0] || 'An error occurred');

            }

            else {

                setError("An unexpected error occurred");

            }
        }
    };

    return (
        <div className={styles.homeContainer}>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status" />
                    <span className="ms-2">Loading...</span>
                </div>
            ) : (
                <>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className="d-flex justify-content-center">
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>Welcome to Your Dashboard!</h2>
                            <p className={styles.cardText}>
                                {message || "Here is your personalized dashboard where you can manage your settings and profile."}
                            </p>
                            <div>
                                <Button
                                    variant="primary"
                                    onClick={handleLogout}
                                    className={styles.button}
                                >
                                    Logout
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={handleResetPassword}
                                    className={styles.button}
                                >
                                    Reset Password
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
