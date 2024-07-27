import {type Question} from "../types/types";
import {Card, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import SyntaxHighlighter from 'react-syntax-highlighter';
import {darcula} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {useQuestionsStore} from "../store/questions.ts";

const getBackgroundColor = (info: Question, answerIndex: number) => {
    const {userSelectedAnswer, correctAnswer} = info;

    if (userSelectedAnswer == null) return 'transparent';

    if (answerIndex !== userSelectedAnswer && answerIndex !== correctAnswer) return 'transparent';

    if (answerIndex === correctAnswer) return 'green';
    if (answerIndex === userSelectedAnswer) return 'red';

    return 'transparent'
}

export function Question({info}: Readonly<{ info: Question }>) {
    const selectAnswer = useQuestionsStore((state) => state.selectAnswer);

    const handleClick = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex);
    }

    return (
        <Card variant={"outlined"} sx={{bgcolor: '#222', p: 2, textAlign: 'left', marginTop: 4}}>
            <Typography variant={'h5'}>
                {info.question}
            </Typography>

            <SyntaxHighlighter language={'javascript'} style={darcula}>
                {info.code}
            </SyntaxHighlighter>

            <List sx={{bgcolor: '#333'}} disablePadding>
                {
                    info.answers.map((answer, index) => (
                        <ListItem key={index} disablePadding divider>
                            <ListItemButton
                                disabled={info.userSelectedAnswer != null}
                                onClick={handleClick(index)}
                                sx={{
                                    backgroundColor: getBackgroundColor(info, index)
                                }}
                            >
                                <ListItemText primary={answer} sx={{textAlign: 'center'}}></ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
        </Card>
    )
}
