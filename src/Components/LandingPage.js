
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar'; // Import Avatar
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import CampaignIcon from '@mui/icons-material/Campaign';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';

import backgroundImage from '../assets/backgroundimage.jpg'; // Adjust the path as necessary

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSpeechToTextClick = () => {
    navigate('/speechtext');
  };

  const handleSpeechToSpeechClick = () => {
    navigate('/speechtranslation');
  };
  
  const handleTextToSpeechClick = () => {
    navigate('/textspeech');
  };
  
  const handleTextToTextClick = () => {
    navigate('/texttranslation');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2}}>
            {/* Replace with Avatar */}
            <Avatar
              alt="Logo"
              src="https://cdn3.vectorstock.com/i/1000x1000/98/27/language-translation-icon-concept-with-speech-vector-26089827.jpg" // Replace with a valid image URL
              sx={{ width: 80, height: 70 }} // Size for the avatar
            />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Miracle Open-Voice
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `url(${backgroundImage})`, // Use the local image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={7} sm={1} md={4}>
            <Button
              variant="contained"
              style={{
                backgroundColor: '#1e88e5',
                color: '#fff',
                width: '100%',
                padding: '20px',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={handleSpeechToTextClick}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <CampaignIcon sx={{ fontSize: 40 }} />
                <ArrowForwardIcon sx={{ fontSize: 40 }} />
                <FontAwesomeIcon icon={faFileLines} style={{ fontSize: '40px', marginLeft: '10px' }} />
              </Box>
              <Typography variant="subtitle1" style={{ marginTop: '15px' }}>
                Speech to Text
              </Typography>
            </Button>

            <Button
              variant="contained"
              style={{
                backgroundColor: '#1e88e5',
                color: '#fff',
                width: '100%',
                padding: '20px',
                height: '200px',
                marginTop: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={handleTextToTextClick}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <FontAwesomeIcon icon={faFileLines} style={{ fontSize: '40px', marginLeft: '10px' }} />
                <ArrowForwardIcon sx={{ fontSize: 40 }} />
                <FontAwesomeIcon icon={faFileLines} style={{ fontSize: '40px', marginLeft: '10px' }} />
              </Box>

              <Typography variant="subtitle1" style={{ marginTop: '15px' }}>
                Translating Text
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={7} sm={2} md={4}>
            <Button
              variant="contained"
              style={{
                backgroundColor: '#1e88e5',
                color: '#fff',
                width: '100%',
                padding: '20px',
                height: '200px',
                marginTop: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={handleTextToSpeechClick}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <FontAwesomeIcon icon={faFileLines} style={{ fontSize: '40px', marginLeft: '10px' }} />
                <ArrowForwardIcon sx={{ fontSize: 40 }} />
                <CampaignIcon sx={{ fontSize: 40 }} />
              </Box>

              <Typography variant="subtitle1" style={{ marginTop: '15px' }}>
                Text to Speech
              </Typography>
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: '#1e88e5',
                color: '#fff',
                width: '100%',
                padding: '20px',
                height: '200px',
                marginTop: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={handleSpeechToSpeechClick}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <CampaignIcon sx={{ fontSize: 40 }} />
                <ArrowForwardIcon sx={{ fontSize: 40 }} />
                <CampaignIcon sx={{ fontSize: 40 }} />
              </Box>

              <Typography variant="subtitle1" style={{ marginTop: '15px' }}>
                Translating Speech
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default LandingPage;
