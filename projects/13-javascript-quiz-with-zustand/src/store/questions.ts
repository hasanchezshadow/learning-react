import {create} from 'zustand';
import {type Question} from "../types/types";
import confetti from 'canvas-confetti';
import {createJSONStorage, persist, devtools} from "zustand/middleware"; // devtools to be used with the extension redux devtools
import {getAllQuestions} from "../services/question.service.ts";

interface State {
    questions: Question[],
    currentQuestion: number,
    fetchQuestions: (limit: number) => Promise<void>
    selectAnswer: (questionId: number, answerIndex: number) => void,
    goNextQuestion: () => void,
    goPreviousQuestion: () => void,
    reset: () => void,
}
// Middleware example
const logger = (config) => (set, get, api) => {
    return config(
        (...args) => {
            console.log('applying => ', args);
            set(...args)
            console.log('new state => ', get())
        },
        get,
        api
    )
}

export const useQuestionsStore = create<State>(devtools(persist(
    (set, get) => {
        return {
            questions: [],
            currentQuestion: 0,
            fetchQuestions: async (limit: number) => {
                const json = await getAllQuestions(limit);

                const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);
                set({questions});
            },
            selectAnswer: (questionId, answerIndex) => {
                const {questions} = get();
                // Using structuredClone to clone the object
                const newQuestions = structuredClone(questions);

                // We find the index of the question.
                const questionIndex = newQuestions.findIndex(question => question.id === questionId);
                // We get the info from the question
                const questionInfo = newQuestions[questionIndex];

                // We find out if the user answered correctly.
                const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;
                if (isCorrectUserAnswer) confetti();

                // We changed the information in the question copy.
                newQuestions[questionIndex] = {
                    ...questionInfo,
                    ...{
                        isCorrectUserAnswer,
                        userSelectedAnswer: answerIndex,
                    }
                };

                // We update the state
                set({questions: newQuestions});
            },
            goNextQuestion: () => {
                const {currentQuestion, questions} = get();
                const nextQuestion = currentQuestion + 1;

                if (nextQuestion < questions.length) {
                    set({currentQuestion: nextQuestion});
                }
            },
            goPreviousQuestion: () => {
                const {currentQuestion} = get();
                const previousQuestion = currentQuestion - 1;

                if (previousQuestion >= 0) {
                    set({currentQuestion: previousQuestion});
                }
            },
            reset: () => {
                set({currentQuestion: 0, questions: []})
            }
        }
    },
    {
        name: 'questions',
        storage: createJSONStorage(() => sessionStorage) // localStorage by default
    }))
);
