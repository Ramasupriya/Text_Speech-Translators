

import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Select, MenuItem, Paper, TextField } from '@mui/material';
import { useDropzone } from 'react-dropzone';

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

   // Language detection functions
   const isEnglishText = (text) => /^[a-zA-Z0-9\s.,!?]+$/.test(text);
   const isSpanishText = (text) => /[áéíóúñÁÉÍÓÚÑüÜ]/.test(text);
   const isFrenchText = (text) => /[éèêëàâîïùûçÉÈÊËÀÂÎÏÙÛÇ]/.test(text);
   const isGermanText = (text) => /[äöüßÄÖÜẞ]/.test(text);
   const isChineseText = (text) => /[\u4e00-\u9fff]/.test(text);
   const isJapaneseText = (text) => /[\u3040-\u30ff\u4e00-\u9faf]/.test(text);
   const isHindiText = (text) => /[\u0900-\u097F]/.test(text);
   const isTeluguText = (text) => /[\u0C00-\u0C7F]/.test(text);

   const languageValidators = {
    "en-US": isEnglishText,
    "es-ES": isSpanishText,
    "fr-FR": isFrenchText,
    "de-DE": isGermanText,
    "zh-CN": isChineseText,
    "ja-JP": isJapaneseText,
    "hi-IN": isHindiText,
    "te-IN": isTeluguText,
  };

  

  // Function to handle text-to-speech conversion
  const handleSpeech = () => {
    if (text === "") {
      alert("Please enter some text to convert to speech.");
      return;
    }

    // Validate if text matches the selected language
    const validateText = languageValidators[selectedLanguage];
    if (validateText && !validateText(text)) {
      alert("Please select the proper language");
      return;
    }


    const utterance = new SpeechSynthesisUtterance(text); // Create a speech object
    utterance.lang = selectedLanguage; // Set the selected language for speech
    speechSynthesis.speak(utterance); // Invoke the speech synthesis API
  };

  const handleStopSpeech = () => {
    speechSynthesis.cancel(); // Stop any ongoing speech synthesis
  };

  // Handle file drop
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setText(reader.result); // Set file content to text state
    };
    reader.readAsText(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".txt,.doc,.docx,.pdf,.odt", // Accept only text files
  });



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



              {/* Drag and Drop Area */}
              <Box
                {...getRootProps()}
                sx={{
                  width: '100%',
                  height: 100,
                  border: '2px dashed gray',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  mb: 3,
                  bgcolor: isDragActive ? 'primary.light' : 'background.default'
                }}
              >
               {/* Accept only .txt, .doc, .pdf, .odt */}
  <input
    {...getInputProps({
      accept: ".txt,.doc,.docx,.pdf,.odt"
    })}
  />
                {isDragActive ? (
                  <Typography>Drop the file here...</Typography>
                ) : (
                  <Typography>Drag and drop a file here, or click to select a file</Typography>
                )}
              </Box>


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

              <Button
                variant="outlined"
                onClick={handleStopSpeech}
                fullWidth
              >
                Stop
              </Button>
              

            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TextSpeech;

