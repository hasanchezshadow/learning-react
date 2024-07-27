import {useQuestionsStore} from "../../store/questions.ts";

export function useQuestionsData() {
    const questions = useQuestionsStore((state) => state.questions);
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let unanswered = 0;

    for (const question of questions) {
        const {isCorrectUserAnswer, userSelectedAnswer} = question;
        if (!userSelectedAnswer) unanswered++;
        if (isCorrectUserAnswer) correctAnswers++;
        if (isCorrectUserAnswer != null && !isCorrectUserAnswer) incorrectAnswers++;
    }

    return {correctAnswers, incorrectAnswers, unanswered};
}
