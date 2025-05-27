import { PromptHint } from "@/components/PromptInput";
import { db } from "@/lib/FirebaseAdmin";
import { GoogleGenAI } from "@google/genai";


 const createPrompt = (mode : string, keywords : string, hints : PromptHint[]) => {

  let considerBranding : boolean = false; 
  const brandingColours : string[] = [];

  for (let i = 0; i < hints.length; i++) {
    considerBranding = considerBranding || hints[i].type == "brand";
    if (hints[i].type == "brand") {
      brandingColours.push(hints[i].value);
    }
  }

  const brandingSystemPrompt = `
  BRANDING: 
  - You should use the branding colors ${brandingColours}
  - These branding colours should be incorperated into the color choices 
  - These colours should take the place of primary if it makes sense
  `;

  const brandingUserPrompt = `- Utilise the branding colours of ${brandingColours} in the palette`

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

${considerBranding ? brandingSystemPrompt : ""}

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
      
      user: `Create a ${mode} mode color palette inspired by these keywords: "${keywords}"

Requirements:
- Reflect the mood and aesthetic of: ${keywords}
- Optimize for ${mode} mode interfaces
- Ensure excellent contrast and readability
- Create visual harmony between all colors
- Consider the psychological impact of each color choice
${considerBranding ? brandingUserPrompt : ""}

Focus on creating a palette that captures the essence of "${keywords}" while maintaining professional design standards.`
    };
  };

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    // Parse the JSON body from the incoming request.
    const { keywords, mode, hints } = await request.json();

    // Validate 'keywords' to ensure it's a string.
    if (typeof keywords !== 'string') {
      return new Response(
        JSON.stringify({ error: 'The "keywords" parameter must be a string.' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

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

    const safeHints : PromptHint[] = hints != null ? hints : [];

    const prompts = createPrompt(mode, keywords, safeHints);

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

    const docRef = await db.collection("palettes").add(JSON.parse(combinedText));

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
    console.error('Error processing request in /api/concat-strings:', error);

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