import {CheckCirckeIcon} from "./CheckCirckeIcon.tsx";
import {XCircleIcon} from "./XCircleIcon.tsx";
import {QuestionMarkCircleIcon} from "./QuestionMarkCircleIcon.tsx";
import {useQuestionsData} from "./hooks/useQuestionsData.ts";
import {Button} from "@mui/material";
import {useQuestionsStore} from "../store/questions.ts";

export function Footer() {
    const {correctAnswers, incorrectAnswers, unanswered} = useQuestionsData();
    const reset = useQuestionsStore(state => state.reset);

    return (
        <footer style={{marginTop: '16px'}}>
            <strong style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8}}>
                <CheckCirckeIcon/> <span>{correctAnswers} correct</span> <span>-</span> <XCircleIcon/> <span>{incorrectAnswers} incorrect</span> <span>-</span> <QuestionMarkCircleIcon/> <span>{unanswered} unanswered</span>
            </strong>
            <div style={{marginTop: 16}}>
                <Button onClick={() => {reset()}}>Reset game</Button>
            </div>
        </footer>
    )
}
