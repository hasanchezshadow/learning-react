import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, Row, Stack} from 'react-bootstrap';

import './App.css';
import {useStore} from "./hooks/useStore.ts";
import {AUTO_LANGUAGE, VOICE_FOR_SUPPORTED_LANGUAGES} from "./constants/constants.ts";
import {ArrowsIcon, ClipboardIcon, SpeakerIcon} from "./components/Icons.tsx";
import {LanguageSelector} from "./components/LanguageSelector.tsx";
import {SectionType} from "./types/types.d";
import {TextArea} from "./components/TextArea.tsx";
import {useEffect} from "react";
import {translate} from "./services/translate.service.ts";
import useDebounce from "./hooks/useDebounce.ts";

function App() {
    const {
        fromLanguage,
        fromText,
        loading,
        resultText,
        toLanguage,
        interchangeLanguages,
        setFromLanguage,
        setToLanguage,
        setFromText,
        setResult,
    } = useStore();

    const debouncedFromText = useDebounce(fromText, 300);

    useEffect(() => {
        if (debouncedFromText === '') return;

        translate({fromLanguage, toLanguage, text: debouncedFromText})
            .then((translation) => {
                if (translation == null) return;
                setResult(translation);
            })
            .catch(() => setResult('Error translating the text'));
    }, [fromLanguage, toLanguage, debouncedFromText]);

    const handleClipboard = () => {
        navigator.clipboard.writeText(resultText).catch(() =>{});
    }

    const handleSpeak = () => {
        const utterance = new SpeechSynthesisUtterance(resultText);
        utterance.lang = VOICE_FOR_SUPPORTED_LANGUAGES[toLanguage];
        utterance.rate = 9;
        speechSynthesis.speak(utterance);
    }

    return (
        <Container fluid>
            <h2>
                Google Translate
            </h2>

            <Row>
                <Col>
                    <Stack gap={2}>
                        <LanguageSelector
                            type={SectionType.From}
                            value={fromLanguage}
                            onChange={setFromLanguage}
                        />
                        <TextArea
                            type={SectionType.From}
                            value={fromText}
                            onChange={setFromText}
                        />
                    </Stack>
                </Col>
                <Col xs={'auto'}>
                    <Button variant={'link'} disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
                        <ArrowsIcon/>
                    </Button>
                </Col>
                <Col>
                    <Stack gap={2}>
                        <LanguageSelector
                            type={SectionType.To}
                            value={toLanguage}
                            onChange={setToLanguage}
                        />
                        <div style={{position: "relative"}}>
                            <TextArea
                                type={SectionType.To}
                                isLoading={loading}
                                value={resultText}
                                onChange={setResult}
                            />
                            <div style={{
                                position: 'absolute',
                                left: 0,
                                bottom: 0,
                                display: 'flex',
                                gap: '8px'
                            }}>
                                <Button variant={'link'} onClick={handleClipboard}>
                                    <ClipboardIcon/>
                                </Button>
                                <Button variant={'link'} onClick={handleSpeak}>
                                    <SpeakerIcon/>
                                </Button>
                            </div>
                        </div>
                    </Stack>
                </Col>
            </Row>
        </Container>
    )
}

export default App
