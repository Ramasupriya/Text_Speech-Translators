// web speech Api for recognition and third party api for translation

import React, { useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import MicNoneIcon from '@mui/icons-material/MicNone';
import '../App.css'; // Import the same CSS for microphone animation

const SpeechTranslation = () => {
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('en'); // Default source language
  const [targetLanguage, setTargetLanguage] = useState('es'); // Default target language
  const microphoneRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'hi', name: 'Hindi' },
    { code: 'zh', name: 'Chinese' },
    { code: 'te', name: 'Telugu' }
  ];

  const startSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech Recognition API is not supported in this browser.');
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = sourceLanguage;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTextToTranslate(transcript);
      translateText(transcript);
    };

    recognition.onerror = (event) => {
      setError(`Speech recognition error: ${event.error}. Please check your microphone and permissions.`);
      stopHandle(); // Stop listening on error
    };

    recognition.onend = () => {
      setLoading(false);
      setIsListening(false);
    };

    setLoading(true);
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    recognition.start();
  };

  const stopHandle = () => {
    setIsListening(false); // Stop listening
    setLoading(false); // Stop loading
    microphoneRef.current.classList.remove("listening"); // Remove animation
  };

  const handleReset = () => {
    stopHandle();
    setTextToTranslate(''); // Clear transcript
    setTranslatedText(''); // Clear translated text
    setError(''); // Clear any errors
  };

  const translateText = (text) => {
    setLoading(true);
    setError('');

    const langPair = `${sourceLanguage}|${targetLanguage}`; // Source to target language

    fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.responseData) {
          setTranslatedText(data.responseData.translatedText);
          speakText(data.responseData.translatedText);
        } else {
          setError('Translation error, please try again later.');
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Error occurred while translating.');
        setLoading(false);
      });
  };

  const speakText = (text) => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = targetLanguage;
    speechSynthesis.speak(utterance);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Speech To Speech Translator
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

     
        <Grid container spacing={2} style={{ marginTop: '20px', marginLeft: '20px' , marginRight: '20px'}}>
          <Grid item xs={5}>
            <Box border={1} padding={2} borderRadius={1}>
              <label>
                Source Language:
                <select
                  value={sourceLanguage}
                  onChange={(e) => setSourceLanguage(e.target.value)}
                  style={{ marginLeft: '10px' }}
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </label>
              {textToTranslate && (
          <div style={{ marginTop: '20px' }}>
            <h3>Recognized Text</h3>
            <p>{textToTranslate}</p>
          </div>
        )}
            </Box>
          </Grid>

          <Grid item xs={5}>
            <Box border={1} padding={2} borderRadius={1}>
              <label>
                Target Language:
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  style={{ marginLeft: '10px' }}
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </label>
            
        {translatedText && (
          <div style={{ marginTop: '20px' }}>
            <h3>Translated Text</h3>
            <p>{translatedText}</p>
          </div>
        )}
        </Box>
        </Grid>
        </Grid>

<box>
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
       

        <div className="microphone-wrapper">
          <div className="mircophone-container">
            <div
              className="microphone-icon-container"
              ref={microphoneRef}
              onClick={startSpeechRecognition}
            >
              <MicNoneIcon style={{ color: '#000', fontSize: '48px' }} />
            </div>
            <div className="microphone-status">
              {isListening ? "Listening..." : "Click to start Listening"}
            </div>
            {isListening && (
              <button className="microphone-stop btn" onClick={stopHandle}>
                Stop
              </button>
            )}
          </div>
        </div>


        <button onClick={startSpeechRecognition} disabled={loading}>
          {loading ? 'Processing...' : 'Start Speech Recognition'}
        </button>


        <div style={{ marginTop: '20px' }}>
          <button className="microphone-reset btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      </box>
    </>
  );
};

export default SpeechTranslation;