"use client";

import PromptInterface from "./PromptInterface";
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PromptHint, PromptInputData } from "./PromptInput";
import { useState } from "react";
import { useRouter } from "next/navigation";

const fadeTransition = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};


const MainPageHero : React.FC = ({

}) => {

    const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
 

  const generatePalette = async (keywords : string, mode : string, hints : PromptHint[]) => {
    if (!keywords.trim()) return;
    setIsLoading(true);
    
    try {

      
      console.log(keywords);
      console.log(mode);
      console.log(hints);

      const response = await fetch('/api/gen-palette', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send the keywords and mode in the request body as JSON
        body: JSON.stringify({
          keywords: keywords,
          mode: mode,
          hints: hints
        }),
      });
      const paletteId = await response.json();
      
      // setPalette(JSON.parse(paletteData.result));

      router.push(`/p/${paletteId.result}`);

      
    } catch (error) {
      console.error('Error generating palette:', error);
    } 
  };

    return (
        <div className="w-full sm:w-auto sm:max-w-4xl sm:min-w-3xl">
        <AnimatePresence mode="wait">
            {!isLoading ? (
            <motion.div key="interface" {...fadeTransition}>
                <PromptInterface 
                generatePalette={(input : PromptInputData) => {
                    let brightness : string = "light";
                    if (input.hints != null) {
                    for (let i = 0; i < input.hints.length; i++) {
                        if (input.hints[i].type === "brightness") {
                        brightness = input.hints[i].value;
                        }
                    }
                    }
                    const safeHints = input.hints != null ? input.hints : [];
                    generatePalette(input.text, brightness, safeHints); 
                }}
                isLoading={isLoading}
                />
            </motion.div>
            ) : (
            <motion.div
                key="loading"
                {...fadeTransition}
                className="flex flex-row gap-4 items-center justify-center font-semibold text-xl"
            >
                <Sparkles
                className="w-8 h-8 text-blue-600 animate-spin"
                style={{
                    background: 'linear-gradient(to right, #2563eb, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}
                />
                <span className="bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
                Working our magic
                </span>
            </motion.div>
            )}
        </AnimatePresence>

        
      </div>
    );
}

export default MainPageHero;