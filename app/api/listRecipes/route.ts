import {NextRequest} from "next/server";

const API_KEY = process.env.RECIPE_API_KEY
const APP_ID = process.env.APP_ID

export async function GET(req: NextRequest) {
    const search = req.nextUrl.searchParams.get('q') as string
    const headers = {'X-Api-Key': 'qZnIv1QR6QcBq5CzI+3KMw==KFHjq4XFJC3OkeiD'}
    const res = await fetch( `https://api.api-ninjas.com/v1/recipe?query=${search}`, { headers })
    const data = await res.json()

    return Response.json({ data })
}