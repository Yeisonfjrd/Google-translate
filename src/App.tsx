import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect } from 'react';
import { Container, Row, Col, Button, Stack } from 'react-bootstrap';

import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/icons';
import { LanguageSelector } from './components/LanguageSelector';
import { TextArea } from './components/TextArea';
import { VOICE_FOR_LANGUAGE } from './constants';
import { translate } from './services/translate';
import { useStore } from './hooks/useStore';
import { SectionType } from './types.d';

function App() {
  const {
    loading,
    fromLanguage,
    toLanguage,
    fromText,
    result,
    interchangeLanguages,
    setFromLanguages,
    setToLanguage,
    setFromText,
    setResult,
  } = useStore();

  const debouncedFromText = useDebounce(fromText, 300);

  useEffect(() => {
    if (debouncedFromText === '') {
      setResult('');
      return;
    }

    translate({ 
      fromLanguage, 
      toLanguage, 
      text: debouncedFromText 
    })
      .then((translatedText: string) => {
        if (translatedText) {
          setResult(translatedText);
        }
      })
      .catch(() => {
        setResult('Error en la traducción');
      });
  }, [debouncedFromText, fromLanguage, toLanguage]);

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {});
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result);
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage];
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  return (
<Container fluid className="app-container">
  <h2 className="app-header">AI Translator</h2>
  <Row className="justify-content-center">
    <Col xs={12} md={5}>
      <Stack gap={3}>
        <LanguageSelector
          type={SectionType.From}
          value={fromLanguage}
          onChange={setFromLanguages}
          className="language-selector"
        />
        <TextArea
          type={SectionType.From}
          value={fromText}
          onChange={setFromText}
          className="text-area"
        />
      </Stack>
    </Col>
    <Col xs="auto" className="d-flex align-items-center">
      <Button
        variant="link"
        onClick={interchangeLanguages}
        className="swap-button"
      >
        <ArrowsIcon />
      </Button>
    </Col>
    <Col xs={12} md={5}>
      <Stack gap={3}>
        <LanguageSelector
          type={SectionType.To}
          value={toLanguage}
          onChange={setToLanguage}
          className="language-selector"
        />
        <div className="relative-position">
          <TextArea
            loading={loading}
            type={SectionType.To}
            value={result}
            onChange={setResult}
            readOnly
            className="text-area"
          />
          <div className="action-buttons">
            <Button 
              variant="link" 
              onClick={handleClipboard}
              className="action-button"
            >
              <ClipboardIcon />
            </Button>
            <Button 
              variant="link" 
              onClick={handleSpeak}
              className="action-button"
            >
              <SpeakerIcon />
            </Button>
          </div>
        </div>
      </Stack>
    </Col>
  </Row>
</Container>
  );
}

export default App;

import { useState } from 'react';

function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}