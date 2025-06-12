import { useEffect, useRef, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

interface GlowBorderProps {
  children?: React.ReactElement;
  borderSize?: number;
  className? : string; 
}

const GlowBorder: React.FC<GlowBorderProps> = ({
  children,
  borderSize = 2,
  className
}) => {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [isNear, setIsNear] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate distance from card edges (including padding for "near" detection)
        const padding = 100; // How far outside the card to still show glow
        const isWithinRange =
          mouseX >= -padding &&
          mouseX <= rect.width + padding &&
          mouseY >= -padding &&
          mouseY <= rect.height + padding;

        setMousePos({ x: mouseX, y: mouseY });
        setIsNear(isWithinRange);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div>
      <div
        ref={cardRef}
        className="relative bg-gray-300 rounded-lg overflow-hidden"
        style={
          {
            padding: `${borderSize}px`,

            "--mouse-x": `${mousePos.x}px`,
            "--mouse-y": `${mousePos.y}px`,
          } as React.CSSProperties
        }
      >
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            isNear ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-indigo-500 rounded-full blur-3xl opacity-30"
            style={{
              left: "var(--mouse-x)",
              top: "var(--mouse-y)",
            }}
          />
        </div>
        <div
          className={`absolute inset-[1px] bg-gray-300 rounded-lg transition-opacity duration-300 ${
            isNear ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute w-32 h-32 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full blur-xl opacity-50"
            style={{
              left: "var(--mouse-x)",
              top: "var(--mouse-y)",
            }}
          />
        </div>
        <div className={`relative z-10 ${className}`}>{children}</div>
      </div>
    </div>
  );
};

export default GlowBorder;
