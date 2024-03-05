import OpenAI from "openai";
import { PassThrough} from "stream";
import { OpenAIStream, StreamingTextResponse } from 'ai';
import Groq from "groq-sdk";

export const runtime = 'edge';

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_KEY,
// });


const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const ingredients = searchParams.get('ingredients')
    const instructions = searchParams.get('instructions')
    const title = searchParams.get('title')
    const servings = searchParams.get('servings')
    const message = searchParams.get('message')

    console.log("ran")

    const response = await groq.chat.completions.create({
        model: "mixtral-8x7b-32768",
        messages: [
            {
                "role": "system",
                "content": `Help the user with the recipe. Info: \n ingredients:${ingredients} \n instructions:${instructions} \n title:${title} \n servings:${servings}`
            },
            {
                "role": "user",
                "content": message
            }
        ],
        temperature: 1,
        max_tokens: 512,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: true
    });


    // const response = await openai.chat.completions.create({
    //     model: "gpt-4-turbo-preview",
    //     messages: [
    //         {
    //             "role": "system",
    //             "content": `Help the user with the recipe. Info: \n ingredients:${ingredients} \n instructions:${instructions} \n title:${title} \n servings:${servings}`
    //         },
    //         {
    //             "role": "user",
    //             "content": message
    //         }
    //     ],
    //     temperature: 1,
    //     max_tokens: 512,
    //     top_p: 1,
    //     frequency_penalty: 0,
    //     presence_penalty: 0,
    //     stream: true
    // });
        const stream =OpenAIStream(response);
        console.log(`Help the user with the recipe. Info: \n ingredients:${ingredients} \n instructions:${instructions} \n title:${title} \n servings:${servings}`)

    return new StreamingTextResponse(stream);
}