
import PaletteDisplay from "@/components/PaletteDisplay";

interface PalettePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PalettePage({ params } : PalettePageProps) {
    const { slug } = await params; 
    
    return (
      <div className="relative min-h-screen p-6 flex items-center justify-center">
          <div className="absolute -z-10 inset-0 h-full w-full 
            bg-[radial-gradient(circle,#73737350_1px,transparent_1px)] 
            bg-[size:10px_10px]
            [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_25%,transparent_80%)]" />
          <PaletteDisplay id={slug}/>
      </div>
    );
}