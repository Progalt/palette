import React from 'react';
import MenuBar from '@/components/MenuBar';
import MainPageHero from '@/components/MainPageHero';

import { Caveat_Brush } from 'next/font/google'
const caveat = Caveat_Brush({ 
  subsets: ['latin'],
  weight: ['400' ] 
})

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col ">
       {/* Dot pattern with purple overlay */}
       <div className="absolute -z-10 inset-0 h-full w-full">
        {/* Base gray dot pattern - visible everywhere */}
        <div className="absolute inset-0 -z-5
          bg-[radial-gradient(circle,#73737350_1px,transparent_1px)]
          bg-[size:10px_10px]
          [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_25%,transparent_80%)]" />
        
        <div className="absolute inset-0 -z-10
          bg-radial-[at_50%_0%] from-indigo-300 to-violet-100 to-70%
        " />
      </div>
      <div className="w-full">
        <MenuBar />
      </div>
      
      {/* Flexible container that fills remaining space */}
      <div className="flex-1 flex flex-col items-center">
        {/* Title section - centered between top and hero */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <h1 className="text-center text-6xl font-medium">
            From Concept to 
            <span className=
            {`font-black bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent`}
            > Color Palette </span>
            <br /> in <span className={``}>Seconds</span>
          </h1>
          <h3 className="text-xl text-center text-gray-700 font-medium">
            Jump start your design process with <br />stunning coherent UI theming and color palettes with just a prompt
          </h3>
        </div>
        
        {/* Hero section - centered in screen (slightly off-center due to title space) */}
        <div className="flex-1 flex flex-col items-center justify-center">
         
          <MainPageHero />
        </div>
        
        {/* Empty spacer to balance the layout */}
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default Home;