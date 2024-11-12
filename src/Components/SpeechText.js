import * as React from 'react';
import { useRef, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, MenuItem, Select, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './SpeechText.css';

const SpeechText = () => {
  const commands = [
    {
      command: "open *",
      callback: (website) => {
        window.open("http://" + website.split(" ").join(""));
      },
    },
    {
      command: 'change background colour to *', 
      callback: (color) => {
        document.body.style.background = color;
      },
    },
    {
      command: /reset*/,
      callback: () => {
        handleReset();
      },
    },
    {
      command: "reset background colour",
      callback: () => {
        document.body.style.background = `rgba(0, 0, 0, 0.8)`;
      },
    },
    {
      command: "clear screen",
      callback: () => {
        resetTranscript();
      },
    },
    {
      command: 'change language to *', 
      callback: (lang) => {
        switch(lang.toLowerCase()){
          case 'english': setLanguage("en-US"); break;
          case 'telugu': setLanguage("te-IN"); break;
          case 'hindi': setLanguage("hi-IN"); break;
          case 'spanish': setLanguage("es-ES"); break;
          case 'french': setLanguage("fr-FR"); break;
          case 'german': setLanguage("de-DE"); break;
          case 'chinese': setLanguage("zh-CN"); break;
          case 'japanese': setLanguage("ja-JP"); break;
          case 'arabic': setLanguage("ar-SA"); break;
          case 'russian': setLanguage("ru-RU"); break;
          default: setLanguage("");
        }
      },
    },
  ];

  const [language, setLanguage] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const { transcript, resetTranscript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition({commands});
  const microphoneRef = useRef(null);
  const [audioFile, setAudioFile] = useState(null);
  const [transcriptionResult, setTranscriptionResult] = useState('');

  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };

  const stopHandle = () => {
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };

  const startListening = () => {
    if (!language) {
      setOpenPopup(true);
    } else {
      microphoneRef.current.classList.add("listening");
      SpeechRecognition.startListening({ continuous: true, language });
    }
  };

  const stopListening = () => {
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleAudioFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      transcribeAudioFile(file); // Call transcribeAudioFile to process the file for transcription
    } else {
      alert('Please upload a valid audio file');
    }
  };

  // Function to transcribe the uploaded audio file
  const transcribeAudioFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    fetch('/api/transcribe', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setTranscriptionResult(data.transcription || "Transcription failed. Please try again.");
      })
      .catch((error) => {
        console.error('Error transcribing audio:', error);
        setTranscriptionResult("Error processing the audio file.");
      });
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
                className={listening ? "listening" : ""}
              />
              <Button variant="contained" onClick={startListening} disabled={listening}>
                {listening ? 'Listening...' : 'Start'}
              </Button>
              <Button variant="contained" color="secondary" onClick={stopListening} sx={{ mt: 2 }} disabled={!listening}>
                Stop 
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
              <input
                type="file"
                accept="audio/*"
                onChange={handleAudioFileChange}
                style={{ marginTop: '16px' }}
              />
            </Paper>

            <Paper sx={{ width: '30%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Speech Output
              </Typography>
              <Box
                id="transcript-box"
                sx={{
                  width: '100%',
                  height: '100px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  p: 1,
                  overflow: 'auto',
                  backgroundColor: '#f9f9f9'
                }}
              >
                {transcriptionResult || transcript || "Start speaking or upload an audio file..."}
              </Box>
            </Paper>
          </Box>
        )}
      </Box>

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
