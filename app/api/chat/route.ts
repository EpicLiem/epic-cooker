import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const ingredients = searchParams.get('ingredients')
    const instructions = searchParams.get('instructions')
    const title = searchParams.get('title')
    const servings = searchParams.get('servings')
    const message = searchParams.get('message')

    console.log("ran")

    const response = await openai.chat.completions.create({
        model: "gpt-4",
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
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
        const content = response.choices[0].message.content
    console.log(content)

    return Response.json({ content : content })
}