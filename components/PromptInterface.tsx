
"use client";

import { Sparkles } from "lucide-react";
import { useState } from "react";
import PromptInput, { PromptInputData } from "./PromptInput";
import { motion } from "motion/react";

interface PromptInterfaceProps {
    generatePalette : (input : PromptInputData) => void; 
    isLoading : boolean;
}

const iconAnim = {
  initial: { rotate: 0, scale: 1 },
  hover: { 
    rotate: 180, 
    scale: 1.25, 
    transition: {
      duration: 0.75, // duration in seconds
      type: "spring",

    },
  },
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
        <motion.button
          onClick={() => { 
            generatePalette(promptInput);
          }}
          disabled={!promptInput.text.trim() || isLoading}
          initial={"initial"}
          animate={"initial"}
          whileHover={"hover"}
          className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
            !promptInput.text.trim() || isLoading
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg hover:shadow-xl hover:shadow-indigo-500/30'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <motion.div variants={iconAnim}>
              <Sparkles className="w-5 h-5" />
            </motion.div>
            Generate Palette
          </span>

        </motion.button>
      </div>
    </div>
  );
}

export default PromptInterface;