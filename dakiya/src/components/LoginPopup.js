import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { authApi } from "../api/login";

const containerStyle = {
    marginTop: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const formStyle = {
    width: '100%',
    marginTop: '24px',
};

const textFieldStyle = {
    marginBottom: '16px',
};

const submitButtonStyle = {
    margin: '24px 0 16px',
};

const LoginPopup = ({ showRegisterForm, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage('Email and password are required');
            return;
        }

        try {
            const response = await authApi.login(email, password); // Use the login API function

            if (response.status === 200) {
                const { name, message } = response.data;
                console.log('Navigating...');
                localStorage.setItem('username', name); // Store username in localStorage
                localStorage.setItem('isUserLoggedIn', 'true'); // Set isUserLoggedIn to true in localStorage
                localStorage.setItem('popupClosed', 'true');
                setErrorMessage('');
                onLoginSuccess(); // Call the onLoginSuccess prop to notify the parent component
            }
        } catch (error) {
            if (error.response && error.response.status === 402) {
                setErrorMessage('Invalid email or password');
            } else if (error.response && error.response.status === 401) {
                setErrorMessage('User not found');
            } else {
                console.error('Error during login:', error);
                setErrorMessage('An error occurred during login');
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <div style={containerStyle}>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form style={formStyle} onSubmit={handleLogin}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={textFieldStyle}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={textFieldStyle}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={submitButtonStyle}
                    >
                        Login
                    </Button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <Button onClick={showRegisterForm}>Register</Button>


             </div>
        </Container>
    );
};

export default LoginPopup;
