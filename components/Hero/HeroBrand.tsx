import { Plus, Trash2 } from "lucide-react";
import Tooltip from "../Base/Tooltip";
import { RefObject, useEffect, useRef, useState } from "react";
import ColorPicker from "../Base/ColourPicker";
import { motion, AnimatePresence } from 'framer-motion';

const useClickOutside = (ref: RefObject<HTMLElement | null>, callback: () => void) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};


interface HeroBrandColoursProps {
    colours? : string[];
    addNewBrandColour : () => void; 
    modifyColours : (index : number, newColour : string) => void;
    deleteColour : (index : number) => void;
}

const HeroBrandColours : React.FC<HeroBrandColoursProps> = ({ colours, addNewBrandColour, modifyColours, deleteColour }) => {

    const [ showColourPicker, setShowColourPicker ] = useState<boolean>(false);
    const [ activeColour, setActiveColour ] = useState<number>(0);

    const [pickerPosition, setPickerPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const colourRefs = useRef<(HTMLDivElement | null)[]>([]);

    const colorPickerRef = useRef<HTMLDivElement>(null);
    useClickOutside(colorPickerRef, () => setShowColourPicker(false));

    return (
        <>
            <div className="flex flex-row gap-1">
                { colours ? 
                    <>
                        {colours.map((colour, index) => {
                            return (<div
                                ref={(el) => { colourRefs.current[index] = el; }}
                                onClick={() => {

                                    setActiveColour(index);
                                    setShowColourPicker(true);

                                    const rect = colourRefs.current[index]?.getBoundingClientRect();
                                    if (rect) {
                                        setPickerPosition({ top: rect.bottom + window.scrollY + 4, left: rect.left + window.scrollX });
                                    }
                                }}
                                key={`brand${index}`}
                                className="h-6 w-6 transition-all duration-200 rounded-md hover:scale-110"
                                style={{
                                    backgroundColor: colour
                                }}
                            >
                                
                            </div>);
                        })}
                    </> :
                    <></>
                }
                <Tooltip text="Add brand colour">
                    <button className="flex items-center cursor-pointer transition-all duration-300 group"
                        onClick={() => addNewBrandColour()}>
                        <Plus className="text-gray-500 group-hover:text-gray-600"/>
                    </button>
                </Tooltip>
            </div>
           <AnimatePresence>
                {showColourPicker && colours && (
                    <motion.div
                        ref={colorPickerRef}
                        className="fixed z-[9999] inline-flex flex-col  bg-white p-2 rounded-md border-2 border-gray-300 overflow-visible"
                        style={{ top: pickerPosition.top + 4, left: pickerPosition.left - 12 }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ 
                            type: "spring", 
                            stiffness: 400, 
                            damping: 30,
                            duration: 0.15
                        }}
                    >  
                        <svg
                            width="16"
                            height="8"
                            viewBox="0 0 16 8"
                            className="absolute -top-2 left-6 -translate-x-1/2 z-10 pointer-events-none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="
                                M1 8
                                C1 8, 6 1, 8 1
                                C10 1, 15 8, 15 8
                                "
                                fill="white"
                                stroke="#D1D5DB"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <button 
                            onClick={() => { 
                                deleteColour(activeColour);
                                setShowColourPicker(false);
                            }}
                            className="p-1 rounded-md hover:bg-red-400/20 w-fit mb-1">
                            <Trash2 className="text-red-400"/>
                        </button>
                 
                        <ColorPicker
                            color={colours[activeColour]}
                            onColorChange={(hex) => {
                                modifyColours(activeColour, hex);
                            }}
                           
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default HeroBrandColours;