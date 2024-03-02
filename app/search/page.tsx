"use client"
import {Input} from "@/components/ui/input"
import {BackgroundGradient} from "@/components/ui/background-gradient";
import {IconAppWindow} from "@tabler/icons-react";
import Image from "next/image";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import {useEffect, useState} from "react";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/navigation";


async function getData(search:string | null) {
    let res;
    if (search == null) {
        res = await fetch(`/api/listRecipes?q=${"ramen"}`)
    } else {
        res = await fetch(`/api/listRecipes?q=${search}`)
    }
    const data = await res.json()

    return data;
}
let results: { // @ts-ignore
    title: any;
    // @ts-ignore
    description: any;
    // @ts-ignore
    link: string;
}[]




export default function Home() {
    const [results, setResults] = useState([]);
    const searchParams = useSearchParams()
    const initialSearch = searchParams.get('search') || null;
    const [searchQuery, setSearchQuery] = useState(initialSearch)
    const router = useRouter()

    useEffect(() => {
        async function getResults() {
            const data = await getData(initialSearch);
            const newResults = data["data"].map(element => ({
                title: element["title"],
                description: element["servings"],
                link: `/recipe?title=${element["title"]}&ingredients=${element["ingredients"]}&instructions=${element["instructions"]}&servings=${element["servings"]}`,
            }));
            setResults(newResults);
        }

        getResults();
    }, [searchParams]); // Empty dependency array means this effect runs once on mount

    const handleSearchChange = (e) => {
        const newQuery = e.target.value;
        setSearchQuery(newQuery);
        // Update the URL without reloading the page
        router.push( `/search?q=${newQuery}`);
    };

    const fetchResults = async () => {
        const data = await getData(searchQuery);
        const newResults = data.data.map(element => ({
            title: element.title,
            description: element.servings,
            link: `/recipe?title=${element.title}&ingredients=${element.ingredients}&instructions=${element.instructions}&servings=${element.servings}`,
        }));
        setResults(newResults);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            fetchResults();
            e.preventDefault(); // Prevent the form from submitting if wrapped in a form
        }
    };

    return (
        <main>
            <div className="flex justify-center items-center p-10 w-screen">
                <div className="flex w-2/3 items-center space-x-2">
                    <Input type="search" placeholder="Search" value={searchQuery} onChange={handleSearchChange} onKeyDown={handleKeyDown}/>
                    <button className="p-[3px] relative" onClick={fetchResults}>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"/>
                        <div
                            className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                            Search
                        </div>
                    </button>
                </div>
            </div>
            <h2 className="text-3xl p-10">Results:</h2>
            <div className="max-w-5xl mx-auto px-8">
                <HoverEffect items={results}/>
            </div>


        </main>
    )
}