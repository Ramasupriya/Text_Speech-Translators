import axios from 'axios';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';

function TextTranslation() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en'); // default source language
  const [targetLanguage, setTargetLanguage] = useState('id'); // default target language

  const translateText = async () => {
    const data = new FormData();
    data.append('source_language', sourceLanguage);
    data.append('target_language', targetLanguage);
    data.append('text', inputText);

    const options = {
      method: 'POST',
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'x-rapidapi-key': '5aa62f3849msh46534dc172a3486p1bff3djsnd1364118f140', // Replace with your RapidAPI key
        'x-rapidapi-host': 'text-translator2.p.rapidapi.com',
      },
      data: data,
    };

    try {
      const response = await axios.request(options);
      console.log(response.data); // Log response for debugging
      if (response.data && response.data.data && response.data.data.translatedText) {
        setTranslatedText(response.data.data.translatedText);
      } else {
        setTranslatedText("Translation not found.");
      }
    } catch (error) {
      console.error('Error translating text:', error);
      setTranslatedText("Error occurred during translation.");
    }
  };

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'hi', label: 'Hindi' },
    { value: 'te', label: 'Telugu' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ru', label: 'Russian' },
    { value: 'ar', label: 'Arabic' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'es', label: 'Spanish' },
    { value: 'id', label: 'Indonesian' }
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Miracle Open-Voice
          </Typography>
          <Typography variant="h6" color="inherit" component="div" sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            Text To Text
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          Text to Text Translation
        </Typography>
        
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <TextField
              label="Enter text to translate"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              label="Source Language"
              fullWidth
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
            >
              {languageOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              label="Target Language"
              fullWidth
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              {languageOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={translateText} fullWidth>
              Translate
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Translated Text:</Typography>
            <Typography variant="body1">
              {translatedText || "Translation will appear here."}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default TextTranslation;
