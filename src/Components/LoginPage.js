import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, IconButton, InputAdornment } from '@mui/material';
import axios from './AuthService';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 4;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    // Validation
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must be at least 4 characters.');
      isValid = false;
    }

    if (!isValid) return;

    try {
      console.log({
        email: email,
        password: password,
      })
      const response = await axios.post(`http://localhost:5038/api/Register/login`, {
        email: email,
        password: password,
      });
      
      console.log('Response:', response);
      console.log('Response:', response.data);
      // console.log(email);

      if (response.status === 200 && response.data != "Invalid Credentials") {
        localStorage.setItem('oauth2', response.data.token);
        localStorage.setItem('userEmail', email);

        navigate('/landingPage');
      } else {
        setError('Authentication failed.');
      }
    } catch (err) {
      console.log(err);
      console.error('Login error:', err.response || err.message);
      setError(err.response?.data?.message || 'Invalid email or password.');
    }
  };


  return (

    <Grid container sx={{ height: '100vh' }}>
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          backgroundImage: 'url(https://st4.depositphotos.com/1071909/21301/i/600/depositphotos_213017962-stock-photo-translator-app-language-course-learning.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Text message in the bottom-left corner */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20, // Distance from the bottom
          left: 20,   // Distance from the left
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.5rem', // Adjust font size as needed
          // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: add semi-transparent background for better visibility
          padding: '10px', // Padding for text
          borderRadius: '5px', // Optional: rounded corners
        }}
      >
        <Typography variant="h4">Translators</Typography>
        <Typography variant="h6"> © 2024 Miracle Software Systems, Inc. </Typography>
      </Box>

      {/* Right Side: Login Form (25% width) */}
      <Grid
        item
        xs={12}   // Full width on small screens
        md={4}    // 25% width on medium and larger screens
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',  // Align to top
          padding: 3,
          backgroundColor: '#f5f5f5',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 500 }}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/me-portal.appspot.com/o/Miraclelogo%2Fmiracle.png?alt=media&token=724eb4e4-52ab-4761-906d-d4d4c6fc6569"
            alt="Miracle Logo"
            style={{
              marginLeft: 45,
              marginBottom: 2,  // Adds space between the logo and the form
              width: '200px',    // Set the width of the image (adjust as needed)
              height: 'auto',    // Maintain aspect ratio
            }}
          />
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              sx={{
                maxWidth: 300, // Set max width for smaller size
                fontSize: '0.875rem', // Decrease font size
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              sx={{
                maxWidth: 300, // Set max width for smaller size
                fontSize: '0.875rem', // Decrease font size
                marginBottom: 5,
              }}
            />

            {error && (
              <Alert severity="error" sx={{ marginBottom: 2, fontSize: '0.875rem' }}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ maxWidth: 300, fontSize: '0.875rem', backgroundColor: '#00aae7', color: 'white' }}
            >
              Login
            </Button>

          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;