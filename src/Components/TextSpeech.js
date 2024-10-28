//web speech Api

import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Select, MenuItem, Paper, TextField } from '@mui/material';

const TextSpeech = () => {
  const [text, setText] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en-US"); // Default language: English

  // List of supported languages
  const languages = [
    { code: "en-US", name: "English" },
    { code: "es-ES", name: "Spanish" },
    { code: "fr-FR", name: "French" },
    { code: "de-DE", name: "German" },
    { code: "zh-CN", name: "Chinese" },
    { code: "ja-JP", name: "Japanese" },
    { code: "hi-IN", name: "Hindi" },
    { code: "te-IN", name: "Telugu" },
  ];

  // Function to handle text-to-speech conversion
  const handleSpeech = () => {
    if (text === "") {
      alert("Please enter some text to convert to speech.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text); // Create a speech object
    utterance.lang = selectedLanguage; // Set the selected language for speech
    speechSynthesis.speak(utterance); // Invoke the speech synthesis API
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        {/* App Bar */}
        <AppBar position="static">
          <Toolbar variant="dense" sx={{ justifyContent: 'space-between' }}>
            
            <Typography variant="h6" color="inherit" component="div">
              Miracle Open Voice
            </Typography>

            <Typography variant="h6" color="inherit" component="div" sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
              Text To Speech
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 3 }}>
          {/* Main Layout */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {/* Paper Section for Text Input and Language Selection */}
            <Paper
              sx={{
                width: '60%',
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
          

              {/* Text Input Field */}
              <TextField
                multiline
                rows={4}
                fullWidth
                label="Enter text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                variant="outlined"
                sx={{ mb: 3 }}
              />

              {/* Language Selector */}
              <Select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                displayEmpty
                fullWidth
                sx={{ mb: 3 }}
              >
                {languages.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </MenuItem>
                ))}
              </Select>

              {/* Convert Button */}
              <Button
                variant="contained"
                onClick={handleSpeech}
                fullWidth
                sx={{ mb: 3 }}
              >
                Convert Text to Speech
              </Button>
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TextSpeech;

