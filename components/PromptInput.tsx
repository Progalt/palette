"use client";

import React, { useState, useRef, useEffect } from 'react';
import { X, Plus, Sun, Moon } from 'lucide-react';

export interface PromptHint {
    type : "brand" | "brightness";
    value : string; 
}

export interface PromptInputData {

    text : string; 
    hints : PromptHint[] | null;
}

interface Pill {
  id: number;
  type: string;
  label: string;
  color?: string;
}

interface PillType {
  label: string;
  hasColorBox?: boolean;
}

interface PillDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (command: string) => void;
}

interface PromptInputProps {
    onChange : (input : PromptInputData) => void;
}

const PromptInput : React.FC<PromptInputProps> = ({
    onChange
}) => {
    const [pills, setPills] = useState<Pill[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [suggestedCommand, setSuggestedCommand] = useState<string>('');
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
    const [pendingBrandPill, setPendingBrandPill] = useState<PillType | null>(null);
    const [showPillDropdown, setShowPillDropdown] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const pillTypes: Record<string, PillType> = {
        brand: { label: 'Brand', hasColorBox: true },
        light: { label: "Light" },
        dark: { label: "Dark" }
    };

    const colorOptions: string[] = [
        '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
        '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
    ];

    const commands: string[] = Object.keys(pillTypes);

    const addPill = (type: string, color?: string): void => {
        if (type === 'brand' && !color) {
            // For brand, show color picker first
            setPendingBrandPill({ ...pillTypes[type] });
            setShowColorPicker(true);
            setShowSuggestions(false);
            setSuggestedCommand('');
            return;
        }

        const newPill: Pill = {
            id: Date.now(),
            type,
            label: pillTypes[type].label,
            ...(color && { color })
        };
        setPills([...pills, newPill]);

        setInputValue(prev => {
            const lastSlashIndex = prev.lastIndexOf('/');
            if (lastSlashIndex !== -1) {
                return prev.slice(0, lastSlashIndex).trimEnd();
            }
            return prev;
        });

        setShowSuggestions(false);
        setSuggestedCommand('');
        setShowColorPicker(false);
        setPendingBrandPill(null);
        inputRef.current?.focus();
    };

    const handleColorSelect = (color: string): void => {
        if (pendingBrandPill) {
            addPill('brand', color);
        }
    };

    const removePill = (id: number): void => {
        setPills(pills.filter(pill => pill.id !== id));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setInputValue(value);

        const lastSlashIndex = value.lastIndexOf('/');

if (lastSlashIndex !== -1) {
    // Extract everything after the last '/'
    const command = value.slice(lastSlashIndex + 1).toLowerCase();
    
        // Only proceed if there's no space after the slash (to avoid matching completed commands)
        if (!command.includes(' ')) {
            const matchingCommands = commands.filter(cmd =>
                cmd.toLowerCase().startsWith(command)
            );
        
            if (matchingCommands.length > 0) {
                setShowSuggestions(true);
                setSuggestedCommand(matchingCommands[0]);
            } else {
                setShowSuggestions(false);
                setSuggestedCommand('');
            }
        } else {
            setShowSuggestions(false);
            setSuggestedCommand('');
        }
    } else {
        setShowSuggestions(false);
        setSuggestedCommand('');
    }

    };

    const getPillValue = (pill : Pill) => {
        if (pill.type == "brand" && pill.color != null) {
            return pill.color;
        }

        if (pill.type == "light") {
            return "light";
        }

        return "dark";
    }

    useEffect(() => {

        const input : PromptInputData = {
            text: inputValue,
            hints: pills.map((pill) => {
                const h : PromptHint = {
                    type: pill.type == "brand" ? "brand" : "brightness",
                    value: getPillValue(pill)
                };

                return h;
            })
        };

        onChange(input);

    }, [inputValue, pills])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter' && suggestedCommand) {
            e.preventDefault();
            addPill(suggestedCommand);
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
            setSuggestedCommand('');
        } else if (e.key === 'Backspace' && inputValue === '' && pills.length > 0) {
            // Remove last pill when backspace is pressed on empty input
            removePill(pills[pills.length - 1].id);
        }
    };

    const CommandSuggestions: React.FC = () => {
        if (!showSuggestions) return null;

        const filteredCommands = commands.filter(cmd => 
        cmd.toLowerCase().startsWith(inputValue.slice(1).toLowerCase())
        );

        return (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-10 mt-1">
            {filteredCommands.map(command => (
            <div
                key={command}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => addPill(command)}
            >
                <span className="capitalize text-gray-500">{command}</span>
            </div>
            ))}
        </div>
        );
    };

    const ColorPicker: React.FC = () => {
        if (!showColorPicker) return null;

        return (
        <div className="absolute top-full left-0 bg-white border border-gray-300 rounded-md shadow-lg z-20 mt-1 p-4">
            <div className="mb-2 font-medium text-sm">Choose a brand color:</div>
            <div className="grid grid-cols-5 gap-2">
            {colorOptions.map(color => (
                <button
                key={color}
                onClick={() => handleColorSelect(color)}
                className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-500 transition-colors"
                style={{ backgroundColor: color }}
                title={color}
                />
            ))}
            </div>
            <button
            onClick={() => {
                setShowColorPicker(false);
                setPendingBrandPill(null);
                inputRef.current?.focus();
            }}
            className="mt-3 text-sm text-gray-500 hover:text-gray-700"
            >
            Cancel
            </button>
        </div>
        );
    };

    const PillDropdown: React.FC<PillDropdownProps> = ({ isOpen, onClose, onSelect }) => {
        if (!isOpen) return null;

        return (
        <div className="absolute top-full right-0 bg-white border border-gray-300 rounded-md shadow-lg z-10 mt-1 min-w-32">
            {commands.map(command => (
            <div
                key={command}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => {
                onSelect(command);
                onClose();
                }}
            >
                <span className="capitalize text-gray-500">{command}</span>
            </div>
            ))}
        </div>
        );
    };

    return (
        <div className="w-full mx-auto">

        <div className="relative">
            <div className="flex items-center border border-gray-300 bg-white rounded-full p-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
            {/* Pills Container */}
            <div className="flex flex-wrap gap-2 mr-2">
                {pills.map(pill => (
                <div
                    key={pill.id}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white border border-gray-300 text-gray-700"
                >
                    {pill.type === 'brand' && pill.color && (
                    <div
                        className="w-4 h-4 rounded mr-2"
                        style={{ backgroundColor: pill.color }}
                    />
                    )}
                    {pill.type === 'light' && (
                    <Sun
                        className="w-4 h-4 mr-2"
                    
                    />
                    )}
                    {pill.type === 'dark' && (
                    <Moon
                        className="w-4 h-4 mr-2"
                    
                    />
                    )}
                    <span >{pill.label}</span>
                    <button
                    onClick={() => removePill(pill.id)}
                    className="ml-1 hover:bg-gray-100 rounded-full p-0.5"
                    >
                    <X size={16} />
                    </button>
                </div>
                ))}
            </div>

            {/* Input Field */}
            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={pills.length === 0 ? "Start prompting or type / for extras" : ""}
                className="flex-1 text-lg outline-none bg-transparent text-gray-700"
            />

            {/* Plus Button */}
            <div className="relative">
                <button
                onClick={() => setShowPillDropdown(!showPillDropdown)}
                className="p-2 aspect-square hover:bg-gray-100 rounded-full"
                >
                <Plus size={16} className="text-gray-500" />
                </button>
                
                <PillDropdown
                isOpen={showPillDropdown}
                onClose={() => setShowPillDropdown(false)}
                onSelect={addPill}
                />
            </div>
            </div>

            {/* Command Suggestions */}
            <CommandSuggestions />
            
            {/* Color Picker */}
            <ColorPicker />
        </div>
    </div>
    );
}

export default PromptInput;