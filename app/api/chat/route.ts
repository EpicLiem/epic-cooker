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
                "content": `Help the user with the recipe. Be specific.
                Unmodified Recipe: \n {ingredients: "${ingredients}", \n instructions: "${instructions}", \n "title:${title}", \n "servings:${servings}"
                Use this output format that will be parsed as a json, include extra notes/text in the message section, *include no text outside of the json*, insert info where the brackets are: 
                { 
                "Modified": true|false,
                "Instructions": "[Modified Intructions]", 
                "Ingredients": "[Modified Ingredients]",
                "Message": "[Output Message]" }
                eg. 
                { 
                "Modified": true
                "Instructions": "Slice the mango into thin slices...", 
                "Ingredients": "1 Mango|1 tb sugar...",
                "Message": "I modified the recipe to... Note that..." }
                or
                { 
                "Modified": false
                "Instructions": "", 
                "Ingredients": "",
                "Message": "In order to... Sometimes... Heat at..." }`
            },
            {
                "role": "user",
                "content": message
            }
        ],
        temperature: 1,
        max_tokens: 1024,
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

    return new StreamingTextResponse(stream);
}