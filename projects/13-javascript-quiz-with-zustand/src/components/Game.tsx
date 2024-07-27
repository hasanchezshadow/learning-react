import {IconButton, Stack} from "@mui/material";
import {Question} from "./Question.tsx";
import {useQuestionsStore} from "../store/questions.ts";
import {ArrowBackIosNew, ArrowForwardIos} from "@mui/icons-material";
import {Footer} from "./Footer.tsx";

export function Game() {
    const questions = useQuestionsStore((state) => state.questions);
    const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
    const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
    const goPreviousQuestion = useQuestionsStore((state) => state.goPreviousQuestion);

    const questionInfo = questions[currentQuestion];

    return (
        <>
            <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'center'}>
                <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
                    <ArrowBackIosNew></ArrowBackIosNew>
                </IconButton>
                {currentQuestion + 1} / {questions.length}
                <IconButton onClick={goNextQuestion} disabled={currentQuestion === questions.length - 1}>
                    <ArrowForwardIos></ArrowForwardIos>
                </IconButton>
            </Stack>
            <Question info={questionInfo}/>
            <Footer/>
        </>
    );
}
