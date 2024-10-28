import * as React from 'react';
import { useRef, useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, MenuItem, Select, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './SpeechText.css';

// Ensure to import your CSS file

const SpeechText = () => {
  const [language, setLanguage] = useState('');
  const [openPopup, setOpenPopup] = useState(false); // State for handling popup visibility
  const { transcript, resetTranscript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const microphoneRef = useRef(null);

  useEffect(() => {
    console.log("Transcript:", transcript);
    console.log("Listening:", listening);
  }, [transcript, listening]);

  // Function to start listening with validation
  const startListening = () => {
    if (!language) {
      setOpenPopup(true); // Open popup if no language is selected
    } else {
      console.log(`Starting speech recognition in language: ${language}`); // Debugging: log language
      microphoneRef.current.classList.add("listening");
      SpeechRecognition.startListening({ continuous: true, language });
    }
  };

  // Function to stop listening
  const stopListening = () => {
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
    console.log("Stopped listening");
  };

  // Function to close popup
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Miracle Open-Voice
          </Typography>
          <Typography variant="h6" color="inherit" component="div" sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
              Speech To Text
            </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        {!browserSupportsSpeechRecognition ? (
          <span>Browser doesn't support speech recognition.</span>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Paper sx={{ width: '30%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <MicIcon
                ref={microphoneRef}
                sx={{ fontSize: 40, mb: 2 }}
                className={listening ? "listening" : ""} // Apply animation class
              />
              <Button variant="contained" onClick={startListening} disabled={listening}>
                {listening ? 'Listening...' : 'Click to Record'}
              </Button>
              <Button variant="contained" color="secondary" onClick={stopListening} sx={{ mt: 2 }} disabled={!listening}>
                Stop Recording
              </Button>
              <Button onClick={resetTranscript} sx={{ mt: 2 }}>
                Reset
              </Button>
            </Paper>

            <Paper sx={{ width: '30%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Select the Language
              </Typography>
              <Select value={language} onChange={(e) => setLanguage(e.target.value)} displayEmpty fullWidth>
                <MenuItem value="">Select Language</MenuItem>
                <MenuItem value="en-US">English (United States)</MenuItem>
                <MenuItem value="te-IN">Telugu</MenuItem>
                <MenuItem value="hi-IN">Hindi</MenuItem>
                <MenuItem value="es-ES">Spanish</MenuItem>
                <MenuItem value="fr-FR">French</MenuItem>
                <MenuItem value="de-DE">German</MenuItem>
                <MenuItem value="zh-CN">Chinese (Simplified)</MenuItem>
                <MenuItem value="ja-JP">Japanese</MenuItem>
                <MenuItem value="ar-SA">Arabic</MenuItem>
                <MenuItem value="ru-RU">Russian</MenuItem>
              </Select>
            </Paper>

            <Paper sx={{ width: '30%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Speech Output
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  height: '100px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  p: 1,
                  overflow: 'auto',
                  backgroundColor: '#f9f9f9' // Optional: Add background color for better visibility
                }}
              >
                {transcript || "Start speaking to see the transcript here..."} {/* This will display the recognized text */}
              </Box>
            </Paper>
          </Box>
        )}
      </Box>

      {/* Popup Dialog for language selection */}
      <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle>Select Language</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select a language before starting the recording.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SpeechText;
