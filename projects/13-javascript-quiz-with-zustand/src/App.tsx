import './App.css';
import {Container, Stack, Typography} from "@mui/material";
import {JavascriptLogo} from "./components/JavascriptLogo.tsx";
import {Start} from "./components/Start.tsx";
import {useQuestionsStore} from "./store/questions.ts";
import {Game} from "./components/Game.tsx";


function App() {
    const questions = useQuestionsStore((state) => state.questions);

    return (
        <main>
            <Container maxWidth={'sm'}>
                <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'center'}>
                    <JavascriptLogo/>
                    <Typography component={'h1'} variant={'h2'}>
                        Javascript Quiz
                    </Typography>
                </Stack>

                {questions.length === 0 && <Start />}
                {questions.length > 0 && <Game />}
            </Container>
        </main>
    )
}

export default App
