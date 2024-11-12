import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import CampaignIcon from '@mui/icons-material/Campaign';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';

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
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Avatar
            alt="Logo"
            src="/App-logo.jpg"
            sx={{ height: '75px', width: '75px', m: 1, mr: 2 }}
          />
          <img src="https://firebasestorage.googleapis.com/v0/b/me-portal.appspot.com/o/Miraclelogo%2Fmiracle%20white-light.png?alt=media&token=cf3624d6-aa0f-44f5-9779-6f7604a0c9e4" alt="Miracle Logo" />
        </Toolbar>
      </AppBar>

      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          background: 'static',
          overflow: 'hidden',
          alignItems: 'center',
          backgroundImage: `url(${"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqtlkHGXFWdfFWkHfMbqNlJ6TDt_YgkPzC4NbwhHJpb4eSLrybVarNxt83fvtgi_aOhHY&usqp=CAU"})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Add marginTop to the Box containing the Grid */}
        <Box sx={{ marginTop: '2px', width: '90%' }}> {/* Adjust marginTop as needed */}
          <Grid container spacing={2} justifyContent="center" sx={{ height: '100%' }}>
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
                onClick={handleSpeechToTextClick}>
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
                onClick={handleTextToTextClick}>
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
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={handleTextToSpeechClick}>
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
        </Box>
      </div>
    </Box>
  );
};

export default LandingPage;
