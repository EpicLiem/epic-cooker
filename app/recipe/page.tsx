"use client"
import {useSearchParams} from "next/navigation";
import Link from "next/link";
import React, {useState} from "react";
import {motion} from "framer-motion";
import {LampContainer} from "@/components/ui/lamp";
import {BackgroundGradient} from "@/components/ui/background-gradient"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { AIStreamParser } from 'ai';
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";


async function getChat(ingredients: string | null, instructions: string | null, title: string | null, servings: string | null, message: string) {
    const res = await fetch(`/api/chat?title=${title}&ingredients=${ingredients}&instructions=${instructions}&servings=${servings}&message=${message}`)

    const data = await res.json()

    return data;
}

export default function Home() {
    const [result, setResult] = useState([""]);
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams()
    const ingredients = searchParams.get('ingredients')
    const instructions = searchParams.get('instructions')
    const title = searchParams.get('title')
    const servings = searchParams.get('servings')
    const [chatQuery, setChatQuery] = useState("")

    const handleSearchChange = (e) => {
        const newQuery = e.target.value;
        setChatQuery(newQuery);
    };

    const submitChat = async () => {
        setIsLoading(true)
        const res = await fetch(`/api/chat?title=${title}&ingredients=${ingredients}&instructions=${instructions}&servings=${servings}&message=${chatQuery}`)
            .then(function (response) {
                return response.text()
            })
            .then(function (data) {
                setIsLoading(false)
                // @ts-ignore
                setResult([data])
            });
    }
    return (
        <main>
            <Link href={`/search`} className={"p-2 "}>
                <button
                    className="dark px-8 py-0.5  border-2 border-black dark:border-white uppercase bg-white text-neutarl-700 transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] text-black ">
                    Back
                </button>
            </Link>
            <LampContainer>
                <motion.h1
                    initial={{opacity: 0.5, y: 100}}
                    whileInView={{opacity: 1, y: 0}}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
                >
                    {title}
                </motion.h1>
            </LampContainer>

            <div className="flex justify-center items-center p-10">
                <BackgroundGradient
                    className="flex items-center space-x-2 text-lg rounded-[22px] p-4 sm:p-10 bg-white dark:bg-zinc-900"
                    containerClassName="flex justify-center items-center">
                    <div>
                        <ul>
                            {ingredients?.split("|").map((x, idx) => (
                                <li><p>{x}</p></li>
                            ))}
                        </ul>
                    </div>
                </BackgroundGradient>
            </div>
            <div className="flex justify-center items-center p-10">
                <BackgroundGradient
                    className="flex items-center space-x-2 text-lg rounded-[22px] p-4 sm:p-10 bg-white dark:bg-zinc-900"
                    containerClassName="w-2/3">
                    <p>
                        {instructions}
                    </p>
                </BackgroundGradient>
            </div>

            <div className="flex flex-col justify-center items-center p-10 w-screen">
                <div className="w-2/3 bg-white dark:bg-zinc-900 rounded-[22px] p-4 sm:p-10">
                    <div className="flex flex-col gap-4">
                        <div className="bg-white dark:bg-zinc-950 rounded-[22px] p-4 sm:p-10">
                            {!isLoading ? (
                                result.map((x, idx) => (
                                    <Markdown key={idx} remarkPlugins={[[remarkGfm]]}>{x}</Markdown>
                                ))
                            ) : (
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-3/4"/>
                                    <Skeleton className="h-4 w-2/3"/>
                                    <Skeleton className="h-4 w-4/5"/>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <Textarea
                                placeholder="Chat"
                                value={chatQuery}
                                onChange={handleSearchChange}
                                onKeyDown={handleSearchChange}
                                disabled={isLoading}
                                className="flex-grow"
                            />
                            {!isLoading ? (
                                <button
                                    className="p-[3px] relative disabled:opacity-50"
                                    onClick={submitChat}
                                    disabled={isLoading}
                                >
                                    <div
                                        className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"/>
                                    <div
                                        className="px-4 py-7 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                                        Submit
                                    </div>
                                </button>
                            ) : (
                                <button
                                    className="px-4 py-3 backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200"
                                    disabled={isLoading}
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>


        </main>
    )

}