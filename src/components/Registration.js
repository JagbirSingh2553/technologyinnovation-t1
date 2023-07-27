import React, { useState } from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { authApi } from '../api/registration';

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

const submitButtonStyle = {
    margin: '24px 0 16px',
};

const Registration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
            setErrorMessage('Please fill in all fields');
            return;
        }
        if (/\d/.test(name)) {
            setErrorMessage('Name should not contain numbers');
            return;
        }
        if (password.length < 8) {
            setErrorMessage('Password should be at least 8 characters');
            return;
        }


        try {
            const response = await authApi.register(name, email, password); // Use the register API function

            if (response.status === 200) {
                console.log('Registration successful');
                navigate('/', { state: { name: name } });
                localStorage.setItem('username', name);
                localStorage.setItem('isUserLoggedIn', 'true');
                localStorage.setItem('popupClosed', 'true');
            } else {
                console.error('Registration failed');
                setErrorMessage('Registration failed');
            }
        } catch (error) {
            if (error.response && error.response.status === 540) {
                setErrorMessage('User already exists');
            } else {
                console.error('Error during registration:', error);
                setErrorMessage('Error during registration');
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <div style={containerStyle}>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form style={formStyle} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Full Name"
                                name="name"
                                autoComplete="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                        Sign Up
                    </Button>
                    {errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>}
                    <Typography>
                        Already have an account?{' '}
                        <NavLink to="/login" style={{ textDecoration: 'none' }}>
                           Login
                        </NavLink>
                    </Typography>
                </form>
            </div>
        </Container>
    );
};
export default Registration;
