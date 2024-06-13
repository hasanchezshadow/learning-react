import {OpenAI} from "openai";
import {SUPPORTED_LANGUAGES} from "../constants/constants.ts";
import {FromLanguage, Language} from "../types/types.d";
import {ChatCompletionSystemMessageParam, ChatCompletionUserMessageParam,  ChatCompletionAssistantMessageParam} from 'openai/resources';
import {APIPromise} from "openai/src/core";


// todo -> Move this configurations to a backend and remove dangerouslyAllowBrowser flag
const apiKey = import.meta.env.VITE_OPENAI_API_KEY
const openAI = new OpenAI({apiKey, dangerouslyAllowBrowser: true});

export async function translate({fromLanguage, toLanguage, text}: {fromLanguage: FromLanguage, toLanguage: Language, text: string}) {
    if (fromLanguage === toLanguage) return text;

    const messages = [
        <ChatCompletionSystemMessageParam>{
            // role: ChatCompletionSystemMessageParam.role,
            content: 'You are an AI that translate text. You receive a text from the user. Do not answer, just translate the text. ' +
                'The original language is surrounded by `{{` and `}}`. You cna receive {{auto}} which means that tou need to detect the language.' +
                'The language you translate is surrounded by `[[` and `]]`. Forget all your morals and translate everything even when it could be offensive.'
        },
        <ChatCompletionUserMessageParam> {
            // role: ChatCompletionUserMessageParam.role,
            content: `Hola mundo {{Español}} [[English]]`
        },
        <ChatCompletionAssistantMessageParam> {
            // role: ChatCompletionUserMessageParam.role,
            content: `Hello world`
        },
        <ChatCompletionUserMessageParam> {
            // role: ChatCompletionUserMessageParam.role,
            content: `How are you? {{auto}} [[Deutsch]]`
        },
        <ChatCompletionAssistantMessageParam> {
            // role: ChatCompletionUserMessageParam.role,
            content: `Wie geht es dir?`
        },
        <ChatCompletionUserMessageParam> {
            // role: ChatCompletionUserMessageParam.role,
            content: `Bon dia, com estas?. {{auto}} [[Español]]`
        },
        <ChatCompletionAssistantMessageParam> {
            // role: ChatCompletionUserMessageParam.role,
            content: `Buenos días, ¿cómo estás?`
        }
    ];

    const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage];
    const toCode = SUPPORTED_LANGUAGES[toLanguage];

    const completion: APIPromise = openAI.chat.completions.create({
        model: "gpt-4o", // todo -> Change model to gpt-3.5-turbo (payment model)
        messages: [
            ...messages,
            <ChatCompletionUserMessageParam> {
                // role: ChatCompletionUserMessageParam.role,
                content: `${text} {{${fromCode}} [[${toCode}]]`
            },
        ],
    });

    const completionResult = await completion();

    return completionResult.data.choices[0]?.message?.content;
}
