import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { feedbackApi } from '../api/feedback';

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

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    try {
      console.log('Form Data:', { name, email, subject, message });

      const response = await feedbackApi.submitFeedback(name, email, subject, message);

      response.then((result) => {
        if (result.status === 200) {
          navigate('/', { state: { name: name } });
          localStorage.setItem('username', name);
          console.log(response.data)
          // Form submission successful
          // Handle success feedback to the user
          setSuccessMessage('Thank you for your response!!!');
        } else {
          // Handle form submission error
          console.error('Form submission failed:', result.statusText);
          setErrorMessage('Form submission failed');
        }
      }).catch((error) => {
        console.error('Error sending form data:', error);
        console.error('Error response:', error.response);
        setErrorMessage('Error sending form data');
      });

    } catch (error) {
      // Clear form fields
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');

      // Set the message to "Thank you for your response!!!"
      setErrorMessage('');
      setSuccessMessage('Thank you for your feedback!!!');

      // Refresh the page after a short delay (optional)
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div style={containerStyle}>
        <Typography component="h1" variant="h5">
          Feedback Form
        </Typography>
        <form style={formStyle} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Your Name"
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
                label="Your Email"
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
                id="subject"
                label="Subject"
                name="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                rows={4}
                id="message"
                label="Your Message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
            Submit
          </Button>
          {errorMessage && (
            <p className="error-message" style={{ color: 'red' }}>
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="success-message" style={{ color: 'green' }}>
              {successMessage}
            </p>
          )}
          <Typography>
            Back to {' '}
            <NavLink to="/events" style={{ textDecoration: 'none', fontWeight: 'bold', textDecorationLine: 'underline' }}>
              Events
            </NavLink>
          </Typography>
        </form>
      </div>
    </Container>
  );
};

export default FeedbackForm;