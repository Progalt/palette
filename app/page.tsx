"use client";

import React, { useState } from 'react';
import { Palette, Copy, Check, Sparkles } from 'lucide-react';
import { ColourPalette } from '@/components/palette';
import PromptInterface from '@/components/PromptInterface';

import { GoogleGenAI } from "@google/genai";
import MiniPaletteShowcase from '@/components/PaletteShowcase';
import { PromptHint, PromptInputData } from '@/components/PromptInput';
import { useRouter } from 'next/navigation';
import GradientOutline from '@/components/GradientOutline';

const ColorPaletteGenerator = () => {


  const [hints, setHints] = useState<PromptHint[] | null>();
  const [mode, setMode] = useState('light');
  const [palette, setPalette] = useState<ColourPalette>();
  const [isLoading, setIsLoading] = useState(false);
  const [copiedColor, setCopiedColor] = useState(null);
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
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (color : any) => {
    try {
      await navigator.clipboard.writeText(color.hex);
      setCopiedColor(color.hex);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl md:min-w-3xl">
      
        { !isLoading ? <PromptInterface 
          generatePalette={(input : PromptInputData) => {
            setHints(input.hints);

            let brightness : string = "light";

            if (input.hints != null) {
              for (let i = 0; i < input.hints.length; i++) {
                if (input.hints[i].type === "brightness") {
                  brightness = input.hints[i].value;
                  
                }
              }
            }

            setMode(brightness);

            let safeHints = input.hints != null ? input.hints : [];
            
            generatePalette(input.text, brightness, safeHints); 
          }}
          isLoading={isLoading}
        /> : <>
          
        </> }

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
      </div>
     
    </div>
  );
};

export default ColorPaletteGenerator;