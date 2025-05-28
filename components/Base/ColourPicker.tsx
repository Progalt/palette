import { useDebouncedEffect } from '@/lib/Debounce';
import React, { useState, useRef, useEffect, useCallback } from 'react';

interface HSV {
  h: number; // 0-360
  s: number; // 0-100
  v: number; // 0-100
}

interface RGB {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}

interface ColorPickerProps {
    onColorChange : (hex : string) => void; 
    color : string; 
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onColorChange, color }) => {
  const [selectedColor, setSelectedColor] = useState<HSV >({ h: 0, s: 100, v: 100 });
  const [hexInput, setHexInput] = useState('#FF0000');
  const [isDraggingHue, setIsDraggingHue] = useState(false);
  const [isDraggingSV, setIsDraggingSV] = useState(false);
  
  const hueRef = useRef<HTMLDivElement>(null);
  const svRef = useRef<HTMLDivElement>(null);

 

  // Color conversion utilities
  const hsvToRgb = useCallback((hsv: HSV): RGB => {
    const { h, s, v } = hsv;
    const c = (v / 100) * (s / 100);
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = (v / 100) - c;
    
    let r = 0, g = 0, b = 0;
    
    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
      r = c; g = 0; b = x;
    }
    
    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  }, []);

  const rgbToHex = useCallback((rgb: RGB): string => {
    const toHex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();
    return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
  }, []);

  const hexToRgb = useCallback((hex: string): RGB | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }, []);

  const rgbToHsv = useCallback((rgb: RGB): HSV => {
    const { r, g, b } = rgb;
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    const delta = max - min;
    
    let h = 0;
    if (delta !== 0) {
      if (max === rNorm) {
        h = ((gNorm - bNorm) / delta) % 6;
      } else if (max === gNorm) {
        h = (bNorm - rNorm) / delta + 2;
      } else {
        h = (rNorm - gNorm) / delta + 4;
      }
    }
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    
    const s = max === 0 ? 0 : Math.round((delta / max) * 100);
    const v = Math.round(max * 100);
    
    return { h, s, v };
  }, []);

  // Update hex input when color changes
  useEffect(() => {
    const rgb = hsvToRgb(selectedColor);
    const hex = rgbToHex(rgb);
    setHexInput(hex);
  }, [selectedColor, hsvToRgb, rgbToHex]);
  
   useEffect(() => {
  if (color && color.match(/^#[0-9A-Fa-f]{6}$/)) {
    const rgb = hexToRgb(color);
    if (rgb) {
      const hsv = rgbToHsv(rgb);
      setSelectedColor(hsv);
      setHexInput(color.toUpperCase());
    }
  } else {
    // Fallback to red
    setSelectedColor({ h: 0, s: 100, v: 100 });
    setHexInput('#FF0000');
  }
}, [color, hexToRgb, rgbToHsv]);

  useDebouncedEffect(() => {
    onColorChange(hexInput);
  }, [ hexInput ], 100);

  // Handle hue slider
  const handleHueMouseDown = (e: React.MouseEvent) => {
    setIsDraggingHue(true);
    updateHue(e);
  };

  const updateHue = useCallback((e: MouseEvent | React.MouseEvent) => {
    if (!hueRef.current) return;
    
    const rect = hueRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const hue = Math.round((x / rect.width) * 360);
    
    setSelectedColor(prev => ({ ...prev, h: hue }));
  }, []);

  // Handle saturation/value picker
  const handleSVMouseDown = (e: React.MouseEvent) => {
    setIsDraggingSV(true);
    updateSV(e);
  };

  const updateSV = useCallback((e: MouseEvent | React.MouseEvent) => {
    if (!svRef.current) return;
    
    const rect = svRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    
    const saturation = Math.round((x / rect.width) * 100);
    const value = Math.round(100 - (y / rect.height) * 100);
    
    setSelectedColor(prev => ({ ...prev, s: saturation, v: value }));
  }, []);

  // Handle hex input
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexInput(value);
    
    if (value.match(/^#[0-9A-Fa-f]{6}$/)) {
      const rgb = hexToRgb(value);
      if (rgb) {
        const hsv = rgbToHsv(rgb);
        setSelectedColor(hsv);
      }
    }
  };

  // Mouse event handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingHue) {
        updateHue(e);
      }
      if (isDraggingSV) {
        updateSV(e);
      }
    };

    const handleMouseUp = () => {
      setIsDraggingHue(false);
      setIsDraggingSV(false);
    };

    if (isDraggingHue || isDraggingSV) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingHue, isDraggingSV, updateHue, updateSV]);

  const currentRgb = hsvToRgb(selectedColor);
  const currentHex = rgbToHex(currentRgb);

  return (
    <div className="p-2 max-w-md mx-auto bg-white rounded-lg shadow-lg border">

      <div className="flex flex-col gap-1">

        {/* Saturation/Value Picker */}
        <div className="flex-grow">
          <div
            ref={svRef}
            className="w-full h-48 rounded cursor-crosshair relative"
            style={{
              background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${selectedColor.h}, 100%, 50%))`
            }}
            onMouseDown={handleSVMouseDown}
          >
            <div
              className="absolute w-3 h-3 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${selectedColor.s}%`,
                top: `${100 - selectedColor.v}%`,
                boxShadow: '0 0 3px rgba(0,0,0,0.5)'
              }}
            />
          </div>
        </div>
        {/* Hue Slider */}
        <div className="flex-shrink-0">
          <div
            ref={hueRef}
            className="w-full h-6 rounded-sm cursor-pointer relative"
            style={{
              background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
            }}
            onMouseDown={handleHueMouseDown}
          >
            <div
              className="absolute w-1 h-full bg-white border border-gray-400 rounded-sm transform -translate-x-0.5"
              style={{
                left: `${(selectedColor.h / 360) * 100}%`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Color Information */}
      <div className="mt-6 space-y-3">
        <div className="flex flex-row items-center gap-3">
          <label className="block text-sm font-medium text-gray-700">Hex</label>
          <input
            type="text"
            value={hexInput}
            onChange={handleHexChange}
            className="text-sm w-full px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            placeholder="#FF0000"
          />
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;