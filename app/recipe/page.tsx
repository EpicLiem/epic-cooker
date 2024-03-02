"use client"
import {useSearchParams} from "next/navigation";
import Link from "next/link";
import React, {useState} from "react";
import {motion} from "framer-motion";
import {LampContainer} from "@/components/ui/lamp";
import {BackgroundGradient} from "@/components/ui/background-gradient"
import {Input} from "@/components/ui/input";

async function getChat(ingredients, instructions, title, servings, message) {
    ;
    const res = await fetch(`/api/chat?title=${title}&ingredients=${ingredients}&instructions=${instructions}&servings=${servings}&message=${message}`)

    const data = await res.json()

    return data;
}

export default function Home() {
    const [result, setResult] = useState([]);
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
        const chat = await getChat(ingredients, instructions, title, servings, chatQuery)
        // @ts-ignore
        console.log([chat["content"]])
        setResult([chat["content"]])
    };
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
                    <p >
                        {instructions}
                    </p>
                </BackgroundGradient>
            </div>

            <div className="flex justify-center items-center p-10 w-screen">
                <div className="flex items-center space-x-2 text-lg rounded-[22px] p-4 sm:p-10 bg-white dark:bg-zinc-900 w-2/3">
                    <div>
                        {result.map((x, idx) => (
                            <span>{x}</span>
                                ))}
                    </div>

                    <div className="flex w-2/3 items-center space-x-2">
                        <Input type="chat" placeholder="Chat" value={chatQuery} onChange={handleSearchChange}
                               onKeyDown={handleSearchChange}/>
                        <button className="p-[3px] relative" onClick={submitChat}>
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"/>
                            <div
                                className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                                Submit
                            </div>
                        </button>
                    </div>

                </div>
            </div>


        </main>
    )

}