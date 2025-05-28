"use client";

import { useState } from "react";
import PromptInput, { PromptInputData } from "./PromptInput";

interface PromptInterfaceProps {
  generatePalette: (input: PromptInputData) => void;
  isLoading: boolean;
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
};

const PromptInterface: React.FC<PromptInterfaceProps> = ({
  generatePalette,
  isLoading,
}) => {
  const [promptInput, setPromptInput] = useState<PromptInputData>({
    text: "",
    hints: [],
  });

  return (
    <div className="p-8">
      <div className="space-y-4">
        {/* Keywords Input */}
        <div>
          <PromptInput
            onChange={(input: PromptInputData) => {
              setPromptInput(input);
              console.log(input);
            }}
            onGenerate={() => {
              generatePalette(promptInput);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PromptInterface;
