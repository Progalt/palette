
import React from 'react';
import MenuBar from '@/components/MenuBar';
import MainPageHero from '@/components/MainPageHero';

const Home = () => {

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ">
      <div className="absolute -z-10 inset-0 h-full w-full 
        bg-[radial-gradient(circle,#73737350_1px,transparent_1px)] 
        bg-[size:10px_10px]
        [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_25%,transparent_80%)]" />
      <div className="w-full absolute top-0">
        <MenuBar />
      </div>
      
      <MainPageHero />
    
    </div>
  );
};

export default Home;