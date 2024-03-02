import Image from "next/image";
import Link from "next/link";
import {WavyBackground} from "@/components/ui/wavy-background";
import {StickyScroll} from "@/components/ui/sticky-scroll-reveal";
import {SparklesCore} from "@/components/ui/sparkles";
import {TypewriterEffectSmooth} from "@/components/ui/typewriter-effect";

const content = [
    {
        title: "Delicious Recipes",
        description:
            "Unlock the secrets to mouthwatering dishes with just a click. Delicious Recipes is your go-to guide for exploring a vast array of culinary delights, tailored to fit any taste or occasion. Forget the hassle of flipping through cookbooks or endless online searches.",
        content: (
            <div
                className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
                <Image src="/burger.png"
                       width={300}
                       height={300}
                       className="h-full w-full object-cover"
                       alt="burger"
                />
            </div>
        ),
    },
    {
        title: "Customizable",
        description:
            "Embrace the future of cooking with customizable recipes, where artificial intelligence transforms how you prepare meals. Our innovative platform redefines recipe exploration, allowing you to tailor any dish to your preferences with ease.",
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
                <Image
                    src="/chatgpt.png"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    },
    {
        title: "Never Run Out of Recipes",
        description:
            "With over 200,000 recipes at your fingertips, you'll never face the dilemma of what to cook next. Our expansive collection spans global cuisines, dietary preferences, and culinary skills, ensuring there's always something new and exciting to discover.",
        content: (
            <div className="h-full w-full  flex items-center justify-center text-white">
                <Image
                    src="/cuisines.png"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    },
];

export default function Home() {
    const words = [
        {
            text: "Cook",
        },
        {
            text: "amazing",
        },
        {
            text: "recipes",
        },
        {
            text: "with",
        },
        {
            text: "Epic Cooker.",
            className: "text-blue-500 dark:text-blue-500",
        },
    ];
    return (
        <main>
            <WavyBackground className="max-w-4xl mx-auto pb-40">
                <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
                    Epic Cooker
                </p>
                <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
                    Easily Find Delicious Recipes
                </p>
            </WavyBackground>
            <div className={"h-screen w-screen"}>
                <StickyScroll content={content}/>
            </div>
            <div className="flex flex-col items-center justify-center h-[40rem]">
                <TypewriterEffectSmooth words={words} className={"dark"}/>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                    <Link href={"/search"}>
                        <button
                            className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                        <span
                            className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"/>
                            <span
                                className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                                Start Cooking
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
