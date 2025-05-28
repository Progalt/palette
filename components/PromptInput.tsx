"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Pill from "./Pill";

export interface PromptHint {
  type: "brand" | "brightness";
  value: string;
}

export interface PromptInputData {
  text: string;
  hints: PromptHint[] | null;
}

interface PillType {
  label: string;
  hasColorBox?: boolean;
}

interface PromptInputProps {
  onChange: (input: PromptInputData) => void;
  onGenerate: () => void;
}

interface PillData {
  id: number;
  type: string;
  label: string;
  color?: string;
}

const PromptInput: React.FC<PromptInputProps> = ({ onChange, onGenerate }) => {
  const [pills, setPills] = useState<PillData[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [suggestedCommand, setSuggestedCommand] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  const pillTypes: Record<string, PillType> = {
    brand: { label: "Brand", hasColorBox: true },
    light: { label: "Light" },
    dark: { label: "Dark" },
  };

  const commands: string[] = Object.keys(pillTypes);

  const addPill = (type: string, color?: string): void => {
    const newPill: PillData = {
      id: Date.now(),
      type,
      label: pillTypes[type].label,
      ...(type === "brand" && { color: color || "#3B82F6" }),
    };

    setPills([...pills, newPill]);

    setInputValue((prev) => {
      const lastSlashIndex = prev.lastIndexOf("/");
      return lastSlashIndex !== -1
        ? prev.slice(0, lastSlashIndex).trimEnd()
        : prev;
    });

    setShowSuggestions(false);
    setSuggestedCommand("");
    inputRef.current?.focus();
  };

  const removePill = (id: number): void => {
    setPills(pills.filter((pill) => pill.id !== id));
  };

  const handleColorChange = useCallback((id: number, color: string) => {
    setPills((prevPills) =>
      prevPills.map((pill) => (pill.id === id ? { ...pill, color } : pill))
    );
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);

    const lastSlashIndex = value.lastIndexOf("/");
    if (lastSlashIndex !== -1) {
      const command = value.slice(lastSlashIndex + 1).toLowerCase();
      if (!command.includes(" ")) {
        const matches = commands.filter((cmd) => cmd.startsWith(command));
        setShowSuggestions(matches.length > 0);
        setSuggestedCommand(matches[0] || "");
      } else {
        setShowSuggestions(false);
        setSuggestedCommand("");
      }
    } else {
      setShowSuggestions(false);
      setSuggestedCommand("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && suggestedCommand) {
      e.preventDefault();
      addPill(suggestedCommand);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setSuggestedCommand("");
    } else if (e.key === "Backspace" && inputValue === "" && pills.length > 0) {
      removePill(pills[pills.length - 1].id);
    }
  };

  const getPillValue = (pill: PillData) => {
    if (pill.type === "brand" && pill.color != null) return pill.color;
    if (pill.type === "light") return "light";
    return "dark";
  };

  useEffect(() => {
    const input: PromptInputData = {
      text: inputValue,
      hints: pills.map((pill) => ({
        type: pill.type === "brand" ? "brand" : "brightness",
        value: getPillValue(pill),
      })),
    };
    onChange(input);
  }, [inputValue, pills]);

  const CommandSuggestions: React.FC = () => {
    const filteredCommands = commands.filter((cmd) => {
      const lastSlashIndex = inputValue.lastIndexOf("/");
      if (lastSlashIndex === -1) return false;
      const command = inputValue.slice(lastSlashIndex + 1).toLowerCase();
      return cmd.startsWith(command) && !command.includes(" ");
    });

    return (
      <AnimatePresence>
        {showSuggestions && filteredCommands.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
            className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-10 mt-1 overflow-hidden"
          >
            {filteredCommands.map((command, index) => (
              <motion.div
                key={command}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (index + 1) * 0.2, duration: 0.25 }}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center transition-colors duration-150"
                onClick={() => addPill(command)}
              >
                <span className="capitalize text-gray-500">{command}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="w-full mx-auto">
      <div className="relative">
        <div className="flex items-center shadow border h-14 border-gray-300 bg-white rounded-lg p-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <div className="flex flex-wrap gap-2 mr-2">
            {pills.map((pill) => (
              <Pill
                key={pill.id}
                id={pill.id}
                type={pill.type}
                label={pill.label}
                color={pill.color}
                onRemove={removePill}
                onColorChange={handleColorChange}
              />
            ))}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={
              pills.length === 0 ? "Start prompting or type / for extras" : ""
            }
            className="flex-1 text-lg outline-none bg-transparent text-gray-700"
          />

          <motion.button
            onClick={() => {
              onGenerate();
            }}
            initial="initial"
            animate="initial"
            whileHover="hover"
            className={`cursor-pointer px-4 h-full rounded-lg font-semibold text-lg transition-all overflow-hidden ${"bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg hover:shadow-xl hover:shadow-indigo-500/30"}`}
            variants={{
              initial: { width: "auto" },
              hover: { width: "auto" },
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              className="flex items-center justify-center gap-2"
              variants={{
                initial: { gap: "0rem" },
                hover: { gap: "0.5rem" },
              }}
            >
              <motion.div
                variants={{
                  initial: { rotate: 0 },
                  hover: { rotate: -180 },
                }}
                transition={{ duration: 1, type: "spring" }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>

              <motion.span
                variants={{
                  initial: { width: 0, opacity: 0 },
                  hover: { width: "auto", opacity: 1 },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="whitespace-nowrap font-medium text-sm"
              >
                Generate
              </motion.span>
            </motion.span>
          </motion.button>
        </div>

        <CommandSuggestions />
      </div>
    </div>
  );
};

export default PromptInput;
