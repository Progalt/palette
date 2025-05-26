import React from 'react';
import { ColourPalette } from './palette';



interface EmbeddablePaletteDemoProps {
  palette: ColourPalette;
}

const EmbeddablePaletteDemo: React.FC<EmbeddablePaletteDemoProps> = ({ palette }) => {

  return (
    <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Live Preview</h3>
        <div 
        className="rounded-xl shadow-lg overflow-hidden border"
        style={{ 
            backgroundColor: palette.palette[8].hex,
            borderColor: palette.palette[10].hex
        }}
        >
        {/* Header */}
        <div 
            className="px-6 py-4 border-b flex items-center justify-between"
            style={{ 
            backgroundColor: palette.palette[9].hex,
            borderColor: palette.palette[10].hex
            }}
        >
            <h2 
            className="text-xl font-bold"
            style={{ color: palette.palette[11].hex }}
            >
            Your App
            </h2>
            <div className="flex gap-2">
            <button 
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-90"
                style={{ 
                backgroundColor: palette.palette[0].hex,
                color: palette.palette[8].hex 
                }}
                // onMouseEnter={(e) => e.target.style.backgroundColor = palette.palette[1].hex}
                // onMouseLeave={(e) => e.target.style.backgroundColor = palette.palette[0].hex}
            >
                Sign In
            </button>
            <button 
                className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:opacity-80"
                style={{ 
                borderColor: palette.palette[10].hex,
                color: palette.palette[11].hex,
                backgroundColor: 'transparent'
                }}
            >
                Learn More
            </button>
            </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
            {/* Main Content */}
            <div>
                <h3 
                className="text-2xl font-bold mb-3"
                style={{ color: palette.palette[11].hex }}
                >
                Welcome to {palette.theme}
                </h3>
                <p 
                className="mb-4 leading-relaxed"
                style={{ color: palette.palette[12].hex }}
                >
                Experience the perfect blend of design and functionality with our carefully crafted color palette. Every element is designed to create harmony and enhance user experience.
                </p>
                <div className="flex gap-3 mb-6">
                <button 
                    className="px-6 py-3 rounded-lg font-medium shadow-md transition-transform hover:scale-105"
                    style={{ 
                    backgroundColor: palette.palette[0].hex,
                    color: palette.palette[8].hex 
                    }}
                >
                    Get Started
                </button>
                <button 
                    className="px-6 py-3 rounded-lg font-medium border"
                    style={{ 
                    backgroundColor: palette.palette[2].hex,
                    color: palette.palette[11].hex,
                    borderColor: palette.palette[10].hex
                    }}
                >
                    Secondary
                </button>
                </div>

                {/* Status Examples */}
                <div className="space-y-2">
                <div 
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                    style={{ 
                    backgroundColor: palette.palette[5].hex + '20',
                    color: palette.palette[5].hex,
                    border: `1px solid ${palette.palette[5].hex}40`
                    }}
                >
                    ✓ Success: Account created successfully
                </div>
                <div 
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                    style={{ 
                    backgroundColor: palette.palette[6].hex + '20',
                    color: palette.palette[6].hex,
                    border: `1px solid ${palette.palette[6].hex}40`
                    }}
                >
                    ⚠ Warning: Please verify your email
                </div>
                <div 
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                    style={{ 
                    backgroundColor: palette.palette[7].hex + '20',
                    color: palette.palette[7].hex,
                    border: `1px solid ${palette.palette[7].hex}40`
                    }}
                >
                    ✕ Error: Invalid credentials
                </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
                {/* Card */}
                <div 
                className="p-4 rounded-lg border"
                style={{ 
                    backgroundColor: palette.palette[9].hex,
                    borderColor: palette.palette[10].hex
                }}
                >
                <div className="flex items-center gap-3 mb-3">
                    <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: palette.palette[4].hex }}
                    ></div>
                    <h4 
                    className="font-semibold"
                    style={{ color: palette.palette[11].hex }}
                    >
                    Feature Highlight
                    </h4>
                </div>
                <p 
                    className="text-sm mb-3"
                    style={{ color: palette.palette[12].hex }}
                >
                    This comprehensive palette includes hover states, status colors, and semantic meanings for complete UI coverage.
                </p>
                <p 
                    className="text-xs"
                    style={{ color: palette.palette[13].hex }}
                >
                    Muted text example for captions and metadata
                </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                <div 
                    className="p-3 rounded-lg text-center border"
                    style={{ 
                    backgroundColor: palette.palette[4].hex + '20',
                    borderColor: palette.palette[4].hex + '40'
                    }}
                >
                    <div 
                    className="text-lg font-bold"
                    style={{ color: palette.palette[0].hex }}
                    >
                    14
                    </div>
                    <div 
                    className="text-xs"
                    style={{ color: palette.palette[12].hex }}
                    >
                    Colors
                    </div>
                </div>
                <div 
                    className="p-3 rounded-lg text-center border"
                    style={{ 
                    backgroundColor: palette.palette[2].hex + '20',
                    borderColor: palette.palette[2].hex + '40'
                    }}
                >
                    <div 
                    className="text-lg font-bold"
                    style={{ color: palette.palette[0].hex }}
                    >
                    AAA
                    </div>
                    <div 
                    className="text-xs"
                    style={{ color: palette.palette[12].hex }}
                    >
                    Accessible
                    </div>
                </div>
                </div>

                {/* Form Example */}
                <div 
                className="p-4 rounded-lg border"
                style={{ 
                    backgroundColor: palette.palette[9].hex,
                    borderColor: palette.palette[10].hex
                }}
                >
                <h5 
                    className="font-medium mb-3 text-sm"
                    style={{ color: palette.palette[11].hex }}
                >
                    Quick Form
                </h5>
                <input 
                    type="text" 
                    placeholder="Enter your email..."
                    className="w-full px-3 py-2 rounded-lg text-sm mb-3 border"
                    style={{ 
                    backgroundColor: palette.palette[8].hex,
                    borderColor: palette.palette[10].hex,
                    color: palette.palette[11].hex
                    }}
                />
                <button 
                    className="w-full py-2 rounded-lg text-sm font-medium"
                    style={{ 
                    backgroundColor: palette.palette[0].hex,
                    color: palette.palette[8].hex 
                    }}
                >
                    Subscribe
                </button>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default EmbeddablePaletteDemo;