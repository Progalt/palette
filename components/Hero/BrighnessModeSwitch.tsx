
import { Moon, Sun } from "lucide-react";
import Tooltip from "../Base/Tooltip";

interface BrightnessModeSwitchProps {
    mode : string; 
    onChange : (newMode : string) => void; 
}

const BrightnessModeSwitch : React.FC<BrightnessModeSwitchProps> = ({ mode, onChange }) => {
    return (
        <div className="inline-flex flex-row gap-2 items-center rounded-md p-1 ">
            <Tooltip text="Light">
                <button
                className={`group flex items-center justify-center ${mode == "light" ? "" : "cursor-pointer"}`}
                    onClick={() => onChange("light")}
                >
                    <Sun className={`w-6 h-6 transition-all duration-300 ${mode == "light" ? "scale-100 text-gray-600" : "scale-75 text-gray-300 group-hover:text-gray-400"}`}/>
                </button>
            </Tooltip>
            <Tooltip text="Dark">
                 <button
                    className={`group flex items-center justify-center ${mode == "dark" ? "" : "cursor-pointer"}`}
                    onClick={() => onChange("dark")}
                 >
                    <Moon className={`w-6 h-6 transition-all duration-300 ${mode == "dark" ? "scale-100 text-gray-600" : "scale-75 text-gray-300 group-hover:text-gray-400"}`}/>
                </button>
            </Tooltip>
        </div>
    );
}

export default BrightnessModeSwitch;