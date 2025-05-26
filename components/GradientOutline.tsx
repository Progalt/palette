import React, { ReactNode, CSSProperties } from 'react';
import { Heart, Star, Home, User, Settings, ArrowRight, Check } from 'lucide-react';


interface GradientOutlineProps {
  children: ReactNode;
  speed?: number;
  strokeWidth?: number;
  colors?: string[];
  className?: string;
}

const GradientOutline: React.FC<GradientOutlineProps> = ({ 
  children, 
  speed = 3, 
  strokeWidth = 2,
  colors = [
    'transparent',
    '#ff6b6b',
    '#4ecdc4', 
    '#45b7d1',
    '#96ceb4',
    '#ffeaa7',
    '#fd79a8',
    'transparent'
  ],
  className = ''
}) => {
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;
  const colorString = colors.join(';');
  
  // Check if children contains ONLY Lucide icons (no mixed content)
  const childArray = React.Children.toArray(children);
  const hasOnlyIcons = childArray.length === 1 && 
    childArray.every(child => 
      React.isValidElement(child) && 
      typeof child.type === 'function' && 
      child.props && 
      typeof child.props === 'object' &&
      child.props !== null &&
      ('className' in child.props || 'size' in child.props)
    );
  
  if (hasOnlyIcons) {
    // Icon wrapper with padding to prevent stroke clipping
    const iconPadding = Math.ceil(strokeWidth / 2);
    return (
      <div 
        className={`inline-block ${className}`}
        style={{ padding: `${iconPadding}px` }}
      >
        <style jsx>{`
          .gradient-icon-stroke-${gradientId} svg {
            stroke: url(#${gradientId});
            stroke-width: ${strokeWidth};
            fill: currentColor;
            overflow: visible;
          }
        `}</style>
        
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              {colors.map((color: string, index: number) => (
                <stop key={index} offset={`${(index * 100) / (colors.length - 1)}%`} stopColor={color}>
                  <animate 
                    attributeName="stop-color" 
                    values={colorString}
                    dur={`${speed}s`}
                    repeatCount="indefinite" 
                  />
                </stop>
              ))}
              <animateTransform 
                attributeName="gradientTransform" 
                type="translate" 
                values="-200 0;200 0;-200 0" 
                dur={`${speed}s`}
                repeatCount="indefinite" 
              />
            </linearGradient>
          </defs>
        </svg>
        
        <div className={`gradient-icon-stroke-${gradientId}`}>
          {children}
        </div>
      </div>
    );
  } else {
    // Text wrapper with padding to prevent stroke clipping
    const textPadding = Math.ceil(strokeWidth / 2);
    const textStyles: CSSProperties = {
      background: `linear-gradient(90deg, ${colors.join(', ')})`,
      backgroundSize: '200% 100%',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextStroke: `${strokeWidth}px transparent`,
      animation: `gradient-sweep-${gradientId} ${speed}s linear infinite`,
      color: 'currentColor',
      padding: `${textPadding}px`,
      display: 'flex flex-row'
    };

    return (
      <span 
        className={` ${className}`}
        style={textStyles}
      >
        <style jsx>{`
          @keyframes gradient-sweep-${gradientId} {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
        `}</style>
        {children}
      </span>
    );
  }
};


export default GradientOutline;