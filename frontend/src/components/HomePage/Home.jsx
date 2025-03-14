import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner, Alert } from 'react-bootstrap';
import { Box, Typography, Container, Grid2, Paper } from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';
import styles from './Home.module.css';  // Importing the CSS module

const Home = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { logout } = useContext(AuthContext);
    const { email } = useContext(AuthContext);

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
    }, []);

    const handleLogout = () => {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        logout();
        navigate('/');
    };

    const handleResetPassword = async () => {
        try {
            navigate('/change-password');
        } catch (error) {
            console.log(error);
            alert('Error while resetting password');
        }
    };

    return (
        <Container maxWidth="lg" className={`${styles.homeContainer} mt-5`}>
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status" />
                    <span className="ms-2">Loading...</span>
                </div>
            ) : (
                <>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Grid2 container justifyContent="center" spacing={3}>
                        <Grid2 grid={{ xs: 12, sm: 6, md: 4 }}>
                            <Paper
                                elevation={6}
                                sx={{
                                    padding: 4,
                                    borderRadius: 3,
                                    background: 'linear-gradient(to top, #ff7e5f, #feb47b)',
                                    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
                                }}
                            >
                                <div className={styles.card}>
                                    <Typography variant="h4" component="h2" align="center" gutterBottom className={styles.cardTitle}>
                                        Welcome to Your Dashboard!
                                    </Typography>
                                    <Typography variant="body1" className={styles.cardText} gutterBottom>
                                        {message || "Here is your personalized dashboard where you can manage your settings and profile."}
                                    </Typography>
                                    <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleLogout}
                                            className={styles.button}
                                        >
                                            Logout
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={handleResetPassword}
                                            className={styles.button}
                                        >
                                            Reset Password
                                        </Button>
                                    </Box>
                                </div>
                            </Paper>
                        </Grid2>
                    </Grid2>
                </>
            )}
        </Container>
    );
};

export default Home;
