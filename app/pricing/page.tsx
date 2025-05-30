"use client";

import GlowBorder from "@/components/Base/GlowBorder";
import MenuBar from "@/components/MenuBar";
import { Check } from "lucide-react";

export default function Pricing() {
    return (
        <div className="relative min-h-dvh w-full flex flex-col justify-center">
            <div className="absolute -z-10 inset-0 h-full w-full 
            bg-[radial-gradient(circle,#73737350_1px,transparent_1px)] 
            bg-[size:10px_10px]
            [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_25%,transparent_80%)]" />
            
            <div className="w-full absolute top-0">
                <MenuBar />
            </div>

            <div className="flex flex-row items-center justify-center">
                
                
                <div className="grid grid-cols-2 gap-2 max-w-[1024px] w-full h-[612px]">
                    <GlowBorder className="w-full h-[612px]">
                        <div className="bg-white p-6 flex flex-col h-full rounded-md">
                            <div className="h-32 flex flex-col">
                                <h1 className="text-xl font-semibold">
                                    Basic
                                </h1>


                                <p className="text-gray-500">Perfect for getting started quick and testing things out.</p>

                                <div className="flex-grow"/>
                                <div className="text-3xl font-bold mt-3">
                                    $0
                                    <span className="text-lg font-medium text-gray-500">/month</span>
                                </div>
                            </div>

                            <div className="w-full h-[2px] bg-gray-300 my-1"/>

                            <div className="flex flex-row gap-4 my-2">
                                <Check />
                                <p>Full access to theme generating</p>
                            </div>

                            <div className="flex flex-row gap-4 my-2">
                                <Check />
                                <p>2 free theme generations per day</p>
                            </div>

                            <div className="flex flex-row gap-4 my-2">
                                <Check />
                                <p>Easily export to Figma, CSS, Tailwind CSS or Flutter</p>
                            </div>

                            <div className="flex-grow"/>

                            <div className="w-full h-[2px] bg-gray-300 mt-1"/>

                            <button className="w-full text-center bg-violet-500 mt-5 py-3 text-white font-bold rounded-lg">
                                Get Started
                            </button>
                        </div>
                    </GlowBorder>

                    <GlowBorder>
                        <div className="  w-full bg-white rounded-md p-6 flex flex-col h-[612px]">
                            <div className="h-32 flex flex-col">
                                <h1 className="text-xl font-semibold">
                                    Premium
                                </h1>


                                <p className="text-gray-500">Perfect for creatives that want access to powerful AI theme tools.</p>

                                <div className="flex-grow"/>
                                <div className="text-3xl font-bold mt-3">
                                    $3.99
                                    <span className="text-lg font-medium text-gray-500">/month</span>
                                </div>
                            </div>

                            <div className="w-full h-[2px] bg-gray-300 my-1"/>

                            <div className="flex flex-row gap-4 my-2">
                                <Check />
                                <p>Everything in basic</p>
                            </div>

                            <div className="flex flex-row gap-4 my-2">
                                <Check />
                                <p>Unlimited theme generations</p>
                            </div>

                            <div className="flex flex-row gap-4 my-2">
                                <Check />
                                <p>More options for a theme</p>
                            </div>

                            <div className="flex flex-row gap-4 my-2">
                                <Check />
                                <p>Remix existing themes if they aren't quite right</p>
                            </div>

                            <div className="flex flex-row gap-4 my-2">
                                <Check />
                                <p>Access to pre-styled components based on your themes</p>
                            </div>

                            <div className="flex-grow"/>

                            <div className="w-full h-[2px] bg-gray-300 mt-1"/>

                            <button className="w-full text-center bg-violet-500 mt-5 py-3 text-white font-bold rounded-lg">
                                Get Started
                            </button>
                        </div>
                    </GlowBorder>
                    
                </div>
            </div>
        </div>
    );
}