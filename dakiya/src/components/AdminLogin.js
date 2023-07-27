import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { adminApi } from "../api/admin"; // Import the authApi object

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




const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username=='admin') {
            navigate('/admin/dashboard');
        }
}, [navigate]); // Depend on navigate to prevent unnecessary re-renders
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage('Email and password are required');
            return;
        }

        try {
            const response = await adminApi.loginAdmin(email, password); // Use the loginAdmin API function

            if (response.status === 200) {
                const { name, message } = response.data;
                console.log('Navigating...');
                localStorage.setItem('username', "admin"); // Store username in localStorage
                setErrorMessage('');
                navigate('/admin/dashboard', { state: { name, message } }); // Navigate to the admin dashboard
                
            }
        } catch (error) {
            if (error.response && error.response.status === 402) {
                setErrorMessage('Invalid email or password');
            } else if (error.response && error.response.status === 401) {
                setErrorMessage('Admin not found');
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
                    Admin Login
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
            </div>
        </Container>
    );
};

export default AdminLogin;

