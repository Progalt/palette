"use client"

import { useRef, useState } from "react";
import GlowBorder from "../Base/GlowBorder";
import BrightnessModeSwitch from "./BrighnessModeSwitch";
import HeroButton from "./HeroButton";
import HeroBrandColours from "./HeroBrand";

export interface PromptHint {
    type : "brand";
    value : string; 
}

interface HeroPromptProps {
    onGenerate? : (prompt : string, mode : string, hints : PromptHint[]) => void;
}

const HeroPrompt : React.FC<HeroPromptProps>= ({ onGenerate }) => {
    const [ mode, setMode ] = useState<string>("light");
    const [ brandColours, setBrandColours ] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <GlowBorder>
            <div className="bg-white rounded-md p-2 pl-4 flex flex-col">
                <div className="my-1">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder={
                        `What's the vibe?`
                        }
                        className="w-full flex-1 text-lg outline-none bg-transparent text-gray-700"
                    />
                </div>
                <div className="flex flex-row h-10 justify-between">
                    <div className="flex flex-row h-10 items-center gap-2">
                        <BrightnessModeSwitch 
                            mode={mode} 
                            onChange={(mode : string) => setMode(mode)}
                        />
                        <div className="h-[75%] w-[2px] bg-gray-300"/>
                        <HeroBrandColours 
                            colours={brandColours}
                            addNewBrandColour={() => {
                                setBrandColours([ ...brandColours, "#FF0000"]);
                            }}
                            modifyColours={(index : number, newColour : string) => {
                                const newColours = [...brandColours];
                                newColours[index] = newColour;
                                setBrandColours(newColours);
                            }}
                            deleteColour={(index : number) => {
                                const newColours = [...brandColours];
                                newColours.splice(index, 1);
                                setBrandColours(newColours);
                            }}
                        />
                    </div>
                    <HeroButton text="Generate" fill={false} 
                        onClick={() => {
                          
                            if (!onGenerate) {
                                return;
                            }

                            let prompt = "";
                            if (inputRef.current) {
                                prompt = inputRef.current.value;
                            }

                            const hints : PromptHint[] = [];
                            
                            for (let i = 0; i < brandColours.length; i++) {
                                hints.push({
                                    type: "brand",
                                    value: brandColours[i]
                                });
                            }

                            onGenerate(prompt, mode, hints);
                        }}
                    />
                </div>
            </div>
        </GlowBorder>
    );
}

export default HeroPrompt;