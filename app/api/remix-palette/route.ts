
import { ColourPalette } from "@/components/palette";
import { db } from "@/lib/FirebaseAdmin";
import { GoogleGenAI } from "@google/genai";

const createPrompt = (prompt : string, mode : string, oldPalette : string) => {

     let parsedOldPalette: ColourPalette | null = null;
  if (oldPalette) {
    try {
      parsedOldPalette = typeof oldPalette === 'string' ? JSON.parse(oldPalette) : oldPalette;
    } catch (e) {
      console.warn('Failed to parse old palette:', e);
    }
  }

  console.log(parsedOldPalette);

    return {
      system: `You are an expert color theorist and designer with deep knowledge of:

COLOR THEORY FUNDAMENTALS:
- Color harmony principles (complementary, analogous, triadic, split-complementary)
- Color temperature and emotional associations
- Saturation, brightness, and hue relationships
- Visual hierarchy through color contrast

ACCESSIBILITY STANDARDS:
- WCAG AA compliance (4.5:1 contrast ratio minimum)
- Color blindness considerations (8% of men, 0.5% of women affected)
- Ensure sufficient contrast for text readability

PSYCHOLOGY & ASSOCIATIONS:
- Warm colors: energy, comfort, excitement (reds, oranges, yellows)
- Cool colors: calm, trust, professionalism (blues, greens, purples)
- Neutrals: balance, sophistication, timelessness
- Cultural and contextual color meanings

MODERN DESIGN PRINCIPLES:
- ${mode === 'light' ? 'Light mode: bright backgrounds, darker text, subtle shadows, hover colors are darker' : 'Dark mode: dark backgrounds, light text, elevated surfaces, hover colors are lighter'}
- Contemporary color trends and digital-first palettes
- Brand-appropriate color psychology
- When prompted with Warm, grey values should be warm not cool
- When prompted with Cool, grey values should be cool not warm
- Secondary colors should be more muted and less saturated


COLORS TO GENERATE: 
- Primary
- Primary Hover
- Secondary
- Secondary Hover
- Accent
- Success
- Warning 
- Error
- Background 
- Surface
- Border
- Text Primary
- Text Secondary 
- Text Muted

CRITICAL REMIX RULES:
1. You MUST start with the exact colors from the original palette
2. You MUST keep colors unchanged unless the modification prompt specifically mentions them
3. When a color is mentioned for change, only modify that specific color
4. All other colors should remain EXACTLY the same hex values
5. Only adjust colors that are explicitly requested to be changed
6. If a colour has another state like Hover adjust that to match the main colour

ORIGINAL PALETTE (PRESERVE THESE UNLESS EXPLICITLY TOLD TO CHANGE):
${parsedOldPalette?.palette.map(color => `${color.name}: ${color.hex}`).join('\n')}

MODIFICATION ANALYSIS:
- Read the modification prompt carefully
- Identify which specific colors (if any) need to be changed
- Keep all other colors at their original hex values
- If the prompt is vague (like "make it brighter"), only adjust saturation/lightness by small amounts (5-15%)
Generate a cohesive color palette optimized for ${mode} mode interfaces. Return ONLY valid JSON, without newlines, in this exact format:
{
  "palette": [
    {
      "name": "name of color here",
      "hex": "#000000",
      "usage": "what the color is used for"
    },
    
  ],
  "theme": "descriptive short theme name",
  "accessibility": "WCAG compliance notes"
}`,
      
      user: `MODIFY this specific palette based on: "${prompt}"

STARTING PALETTE (preserve unless explicitly changing):
${parsedOldPalette?.palette.map(color => `${color.name}: ${color.hex} (${color.usage})`).join('\n')}

INSTRUCTIONS:
1. Copy the original palette exactly
2. Analyze the modification request: "${prompt}"
3. Only change colors that are specifically mentioned or clearly implied
4. For example:
   - "make primary red" = change only primary color to red
   - "darker background" = darken only background color
   - "more vibrant" = increase saturation slightly on accent colors only
   - "warmer" = adjust temperature on main colors only
5. Other color states should change if their base is referenced
6. For Example: 
    - If Primary is changed also change Primary Hover
7. Take the current name and change it if needed to reflect the new palette: ${parsedOldPalette?.theme}

PRESERVE these exact hex values unless explicitly modifying them:
${parsedOldPalette?.palette.map(color => color.hex).join(', ')}

Return the modified palette with preserved colors kept at their original hex values.
`
    };
  };

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    // Parse the JSON body from the incoming request.
    const { oldPalette, prompt, mode, originalID } = await request.json();


    // Validate 'mode' to ensure it's either "light" or "dark".
    if (typeof mode !== 'string' || (mode !== 'light' && mode !== 'dark')) {
      return new Response(
        JSON.stringify({ error: 'The "mode" parameter must be either "light" or "dark".' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

     const prompts = createPrompt(prompt, mode, oldPalette);

    const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        config: {
            systemInstruction: prompts.system,
            responseMimeType: "application/json"
        },
        contents: prompts.user
    });

    let combinedText = "";

    if (response && response.candidates && response.candidates.length > 0) {
        const candidate = response.candidates[0]; // Usually, you work with the first candidate
        if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
            for (const part of candidate.content.parts) {
                if (part.text) {
                    combinedText += part.text;
                }
                
            }
        } 
    } 


    const finalJSON = JSON.parse(combinedText);
    finalJSON.mode = mode; 
    finalJSON.remixed = originalID;

    const docRef = await db.collection("palettes").add(finalJSON);

    return new Response(
      JSON.stringify({ result: docRef.id }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error : unknown) { 
    console.error('Error processing request in /api/remix-palette:', error);

    return new Response(
      JSON.stringify({ error: 'Internal Server Error', details: error }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}