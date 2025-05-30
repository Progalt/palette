
export interface PaletteEntry {
  name : string;
  hex : string;
  usage : string; 
}

export interface ColourPalette {
  theme : string; 
  accessibility : string; 
  mode : string; 
  remixed? : string;
  palette : PaletteEntry[];
}

