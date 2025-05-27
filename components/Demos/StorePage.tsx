"use client";

import { Star, StarHalf } from "lucide-react";
import { ColourPalette } from "../palette";
import { useState } from "react";

export interface DemoPageProps {
    palette : ColourPalette;
}

const StorePageDemo : React.FC<DemoPageProps> = ({ 
    palette
}) => {

    const [ buyHovered, setBuyHovered ] = useState(false);

    const Description : React.FC = ({}) => {
        return (
            <div className="pl-4 w-full h-full">
                <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-col">
                        <span className="text-sm" style={{ color: palette.palette[12].hex }}>New Item</span>
                        <span className="text-xl font-bold" style={{ color: palette.palette[11].hex }}>Shop Item</span>
                        <div className="flex">
                            <Star fill={palette.palette[4].hex} stroke={palette.palette[4].hex} />
                            <Star fill={palette.palette[4].hex} stroke={palette.palette[4].hex} />
                            <Star fill={palette.palette[4].hex} stroke={palette.palette[4].hex} />
                            <StarHalf fill={palette.palette[4].hex} stroke={palette.palette[4].hex} />
                        </div>
                        <div 
                            className="mt-2"
                            style={{
                            color: palette.palette[12].hex
                        }}>
                            {"Something you've always wanted! Such a useful item."} 
                        </div>
                        <div className="text-xl font-semibold text-right"
                        style={{
                            color: palette.palette[11].hex
                        }}>
                            $45.99
                        </div>
                    </div>
                    <div>
                        <div className="rounded-lg p-2 mt-3"
                            style={{
                                backgroundColor: `${palette.palette[6].hex}40`,
                                border: `1px solid ${palette.palette[6].hex}`,
                                color: palette.palette[6].hex
                            }}
                        >
                            <span className="font-bold">Oh no!</span> This item is low in stock, so be fast!
                        </div> 
                        <div
                            className="w-full text-center py-2 rounded-full text-white font-semibold mt-4"
                            style={{
                                backgroundColor: buyHovered ? palette.palette[1].hex : palette.palette[0].hex,
                            }}
                            onMouseEnter={() => setBuyHovered(true)}
                            onMouseLeave={() => setBuyHovered(false)}
                            >
                            Buy
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const similarItems = [
        { name: "Another Item", price: "$4.99" },
        { name: "Cool Gadget", price: "$8.99" },
        { name: "Rare Find", price: "$12.50" },
    ];

    const SimilarItem = ({ name, price }: { name: string, price: string }) => (
        <div className="w-[148px] p-2 rounded-lg"
            style={{
            backgroundColor: palette.palette[9].hex,
            border: `1px solid ${palette.palette[10].hex}`
            }}
        >
            <div className="w-full aspect-square rounded-lg"
            style={{
                backgroundColor: palette.palette[2].hex
            }}
            />
            <p style={{ color: palette.palette[11].hex }}>{name}</p>
            <div className="flex flex-row">
            <Star fill={palette.palette[4].hex} stroke={palette.palette[4].hex} />
            <Star fill={palette.palette[4].hex} stroke={palette.palette[4].hex} />
            <StarHalf fill={palette.palette[4].hex} stroke={palette.palette[4].hex} />
            </div>
            <p className="text-right" style={{ color: palette.palette[12].hex }}>{price}</p>
        </div>
    );

    return (
        <div className="w-full rounded-lg p-4"
            style={{
                backgroundColor: palette.palette[8].hex,
                border: `1px solid ${palette.palette[10].hex}`
            }}>
            <div className="flex flex-row h-full">
                <div className="w-[50%] h-[256px] aspect-square rounded-lg"
                    style={{
                        backgroundColor: palette.palette[3].hex
                    }}
                >
                    
                </div>
                <Description />
                
            </div>
            <div className="mt-3">
                <p className="my-3 font-semibold"
                    style={{
                        color: palette.palette[11].hex
                    }}>
                    Similar Items
                </p>
                <div className="flex flex-row gap-2">
                    {similarItems.map((item, index) => (
                    <SimilarItem key={index} name={item.name} price={item.price} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StorePageDemo;