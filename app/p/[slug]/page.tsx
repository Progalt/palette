
import PaletteDisplay from "@/components/PaletteDisplay";

interface PalettePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PalettePage({ params } : PalettePageProps) {
    const { slug } = await params; 
    
    return (
       <PaletteDisplay id={slug}/>
    );
}