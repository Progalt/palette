import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface HeroButtonProps {
    text: string;
    onClick: () => void;
    fill?: boolean;
}

const HeroButton: React.FC<HeroButtonProps> = ({ text, onClick, fill = false }) => {
    const baseClasses = "cursor-pointer px-4 h-full rounded-lg font-semibold text-lg transition-all overflow-hidden hover:shadow-[0_0_20px_rgba(99,102,241,0.6),0_0_40px_rgba(139,92,246,0.4),0_0_60px_rgba(99,102,241,0.2)]";
    
    const gradientClasses = fill 
        ? "bg-white border-2 border-transparent bg-clip-padding"
        : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white";
    
    const gradientBorderStyle = fill ? {
        background: 'linear-gradient(white, white) padding-box, linear-gradient(to right, rgb(79 70 229), rgb(139 92 246)) border-box'
    } : {};

    return (
        <>
            <motion.button
                onClick={() => onClick()}
                initial="initial"
                animate="initial"
                whileHover="hover"
                className={`${baseClasses} ${gradientClasses}`}
                style={gradientBorderStyle}
                variants={{
                    initial: { width: "auto" },
                    hover: { width: "auto" },
                }}
                transition={{ duration: 0.3 }}
            >
                {fill ? (
                    <motion.span
                        className="flex items-center justify-center gap-2 text-gray-500"
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
                            {text}
                        </motion.span>
                    </motion.span>
                ) : (
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
                            {text}
                        </motion.span>
                    </motion.span>
                )}
            </motion.button>
        </>
    );
}

export default HeroButton;