import React, { useState } from 'react';
import './App.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import "regenerator-runtime/runtime";

const App = () => {
  const startListening = () => {

    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    setCheckStart(true);
  };

  const stopListening = () => {
   
    SpeechRecognition.stopListening();
    setCheckStart(false);
  };

  const [copy, setCopy] = useState(false);
  const [checkStart, setCheckStart] = useState(false);

  const {
    transcript,
    browserSupportsSpeechRecognition,
    resetTranscript
  } = useSpeechRecognition();

  const [support, setSupport] = useState(true);

  if (!browserSupportsSpeechRecognition) {
    setSupport(false);
  }

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(transcript)
      .then(() => {
        alert('Transcript copied to clipboard!');
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
      });
  };

  return (
    <>
      <div className="container">
        <h2>Speech to Text Converter</h2>
        <br />
        <p>A speech converter that converts your speech into text but <strong><br></br>avoid silence during active listening!</strong></p>
        <span style={{ color: !checkStart ? 'red' : 'black' }} className='grant'><p>Grant access to your microphone before clicking on start listening or stop listening</p></span>

        {!support ? (
          <div className="browserSupport">
            <p>Your browser does not support speech recognition. Make sure you have granted access to the microphone.</p>
          </div>
        ) : null}

        <div className="main-content">{transcript}</div>
        <div className="btn-style">
          <button
            onClick={() => {
              if (!copy) {
                setCopy(true);
                copyToClipboard();
              } else {
                setCopy(false);
              }
            }}
          >
            {copy ? 'Copied' : 'Copy'}
          </button>
          <button onClick={() => { startListening() }} style={{ color: checkStart ? 'red' : 'white' }}> {checkStart ? "Listening" : "Start Listen"}</button>
          <button onClick={() => { stopListening(); }} disabled={!checkStart}> {!checkStart ? 'Stopped' : 'Stop Listening'}</button>

          <button onClick={() => {
            setCopy(false);
            stopListening();
            setCheckStart(false);
            resetTranscript();
            
          }}>Reset</button>
        </div>
      </div>
    </>
  );
}

export default App;
