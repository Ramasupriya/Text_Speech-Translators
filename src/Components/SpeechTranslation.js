import React, { useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Alert, Grid } from '@mui/material';
import MicNoneIcon from '@mui/icons-material/MicNone';
import './SpeechTranslation.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechTranslation = () => {
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en'); // Default source language
  const [targetLanguage, setTargetLanguage] = useState('te'); // Default target language
  const microphoneRef = useRef(null);
  const [audioFile, setAudioFile] = useState(null); // State to store the uploaded audio file
  const { transcript, resetTranscript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [audioURL, setAudioURL] = useState(null);   // State to store the URL for audio preview

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

  const handleReset = () => {
    setTranslatedText(''); // Clear translated text
    setError(''); // Clear any errors
    resetTranscript();

    
  };

  //Speech to Text
  const startSpeechRecognition = () => {
    if (!sourceLanguage) {
      alert('Speech Recognition API is not supported in this browser.');
    } else {
      setTranslatedText('');
      resetTranscript();
      microphoneRef.current.classList.add("listening");
      SpeechRecognition.startListening({ continuous: true, sourceLanguage });
     
   
    }
  };

  const stopHandle = () => {
    microphoneRef.current.classList.remove("listening");    // Removes listening animation
    SpeechRecognition.stopListening();    // Stops listening
    translateText(transcript);
  };

  //Text to Text
  const translateText = (text) => {
    setLoading(true);
    setError('');

    const langPair = `${sourceLanguage}|${targetLanguage}`; // Source to target language

    fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.responseData.matches !== '') {
          setTranslatedText(data.responseData.translatedText);
          speakText(data.responseData.translatedText);
        } else {
          Alert('Please provide proper input speech');
          setError('Translation error, please try again later.');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError('Error occurred while translating.');
        setLoading(false);
      });
  };

  //Text to Speech
  const speakText = (text) => {
    const speechSynthesis = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = targetLanguage;
    speechSynthesis.speak(utterance);
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioFile(file); // Store the audio file in state
      const fileURL = URL.createObjectURL(file); // Generate a URL to preview the audio
      setAudioURL(fileURL);
    }
  };

  // Handle file upload
  const handleUploadClick = () => {
    document.getElementById('audioFileInput').click(); // Trigger the file input when the button is clicked
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense" sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" color="inherit" component="div">
              Miracle Open Voice
            </Typography>
            <Typography variant="h6" color="inherit" component="div" sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
              Speech to Speech
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Grid container spacing={2} style={{ marginTop: '20px', marginLeft: '20px', marginRight: '20px' }}>
        <Grid item xs={6}>
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

            {transcript && (
              <div style={{ marginTop: '20px' }}>
                <h3>Recognized Text</h3>
                <p>{transcript}</p>
              </div>
            )}
          </Box>
        </Grid>

        <Grid item xs={6}>
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

            {loading ? (
              <h4>Loading...</h4>
            ) : (
              translatedText && (
                <div style={{ marginTop: '20px' }}>
                  <h3>Translated Text</h3>
                  <p>{translatedText}</p>
                </div>
              )
            )}
          </Box>
        </Grid>
      </Grid>

         {/* Audio upload section */}
         <div style={{ marginLeft: '200px',marginTop: '20px' }}>
        <button onClick={handleUploadClick}>Upload Audio</button>
        <input
          type="file"
          id="audioFileInput"
          accept="audio/*"
          style={{ display: 'none' }} // Hide the file input
          onChange={handleFileChange} // Ensure event is passed correctly
        />

        {audioFile && (
          <div>
          
            <audio controls>
              <source src={audioURL} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>

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
              {listening ? "Listening..." : "Click to start Listening"}
            </div>
            {listening && (
              <button className="microphone-stop btn" onClick={stopHandle}>
                Stop
              </button>
            )}
          </div>
          <button className="microphone-reset btn" onClick={handleReset}>
            Reset
          </button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      

  
    </>
  );
};

export default SpeechTranslation;
