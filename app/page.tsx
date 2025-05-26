"use client";

import React, { useState } from 'react';
import PromptInterface from '@/components/PromptInterface';
import { PromptHint, PromptInputData } from '@/components/PromptInput';
import { useRouter } from 'next/navigation';
import { Sparkles } from 'lucide-react';

const ColorPaletteGenerator = () => {

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl md:min-w-3xl">
      
        { !isLoading ? <PromptInterface 
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
        /> : <>
          <div className="flex flex-row gap-4 items-center font-semibold text-lg">
            <Sparkles
              className="w-6 h-6 text-blue-600 animate-spin"
              style={{
                background: 'linear-gradient(to right, #2563eb, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            />
            <span className="bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
              Working our magic
            </span>
          </div>
        </> }

        
      </div>
     
    </div>
  );
};

export default ColorPaletteGenerator;