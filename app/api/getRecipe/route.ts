const API_KEY = process.env.RECIPE_API_KEY
const APP_ID = process.env.APP_ID

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const res = await fetch( `https://api.edamam.com/api/recipes/v2?type=public&q=ramen&app_id=${APP_ID}&app_key=${API_KEY}`)
    const data = await res.json()


    return Response.json({ data })
}