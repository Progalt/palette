import React, { useState, useRef, useEffect } from "react";
import { Moon, Sun, X } from "lucide-react";
import ColorPicker from "./Base/ColourPicker";

interface PillProps {
  id: number;
  type: string;
  label: string;
  color?: string;
  onRemove: (id: number) => void;
  onColorChange?: (id: number, color: string) => void;
}

const Pill: React.FC<PillProps> = ({ id, type, label, color, onRemove, onColorChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleColorBoxClick = () => {
    setShowPicker((prev) => !prev);
  };

  const handleColorSelect = (selectedColor: string) => {
    onColorChange?.(id, selectedColor);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  return (
    <div className="relative">
      <div className="flex items-center text-sm px-3 py-1 bg-gray-100 rounded-lg">
        {type === "brand" && (
          <div
            onClick={handleColorBoxClick}
            className="w-3 h-3 rounded-full mr-2 cursor-pointer"
            style={{ backgroundColor: color }}
          />
        )}
        {type === "light" && (
            <Sun className="w-4 h-4 mr-2 text-gray-700"/>
        )}
        {type === "dark" && (
            <Moon className="w-4 h-4 mr-2 text-gray-700"/>
        )}
        <span className="capitalize text-gray-700">{label}</span>
        <button onClick={() => onRemove(id)} className="ml-2 text-gray-400 hover:text-gray-600 cursor-pointer">
          <X size={14} />
        </button>
      </div>
      {showPicker && (
        <div ref={pickerRef} className="absolute z-20 mt-2 w-56">
          <ColorPicker color={color || "#3B82F6"} onColorChange={handleColorSelect} />
        </div>
      )}
    </div>
  );
};

export default Pill;
