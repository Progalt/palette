
"use client";

import { Sparkles } from "lucide-react";
import { useState } from "react";
import PromptInput, { PromptInputData } from "./PromptInput";

interface PromptInterfaceProps {
    generatePalette : (input : PromptInputData) => void; 
    isLoading : boolean;
}

const PromptInterface : React.FC<PromptInterfaceProps> = ({
    generatePalette,
    isLoading
}) => {

    const [ promptInput, setPromptInput ] = useState<PromptInputData>({ text: "", hints: [] });

    return (
        <div className="p-8">
          <div className="space-y-4">
            {/* Keywords Input */}
            <div>
             
              <PromptInput onChange={(input : PromptInputData) => {
                setPromptInput(input);
                console.log(input);
              }}/>
              
            </div>

            {/* Generate Button */}
            <button
              onClick={() => { 
                generatePalette(promptInput);
              }}
              disabled={!promptInput.text.trim() || isLoading}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
                !promptInput.text.trim() || isLoading
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 animate-spin" />
                  Generating Magic...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Generate Palette
                </span>
              )}
            </button>
          </div>
        </div>
    );
}

export default PromptInterface;