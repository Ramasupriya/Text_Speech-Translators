import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import SpeechText from './Components/SpeechText';
import SpeechTranslation from './Components/SpeechTranslation';
import TextTranslation from './Components/TextTranslation';
import TextSpeech from './Components/TextSpeech';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/speechtext" element={<SpeechText />} />
                <Route path="/speechtranslation" element={<SpeechTranslation />} />
                <Route path="/textspeech" element={<TextSpeech />} />
                <Route path="/texttranslation" element={<TextTranslation />} />
            </Routes>
        </Router>
    );
};

export default App;
