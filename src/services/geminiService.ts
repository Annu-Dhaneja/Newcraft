import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateDivineArt(prompt: string, sourceImageBase64?: string | null) {
    try {
        let enhancedPrompt = prompt;

        // If source image is provided, use Gemini 3 Flash to analyze it and refine the prompt
        if (sourceImageBase64) {
            const base64Data = sourceImageBase64.split(',')[1];
            
            const analysisResult = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: {
                    parts: [
                        {
                            inlineData: {
                                data: base64Data,
                                mimeType: "image/jpeg"
                            }
                        },
                        { text: "Analyze this image and describe its key visual elements, colors, and spiritual mood in 3 short sentences. Focus on things that should be preserved or translated into a new AI generated artwork of Chhatarpur Wale Guruji." }
                    ]
                }
            });
            
            const analysis = analysisResult.text;
            enhancedPrompt = `Inspired by a source image with these qualities: ${analysis}. The user wants to manifest: ${prompt}.`;
        }

        // @ts-ignore - generateImages is a valid method in @google/genai for Imagen models
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-001',
            prompt: `A high-end, futuristic, spiritual digital artwork of Chhatarpur Wale Guruji. ${enhancedPrompt}. Cyber-Luxe aesthetic, high-tech interface details, cinematic lighting, 8k resolution, divine and sacred vibe.`,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '1:1',
            },
        });

        const base64 = response.generatedImages[0].image.imageBytes;
        return `data:image/jpeg;base64,${base64}`;
    } catch (error) {
        console.error("Divine manifestation failed:", error);
        throw error;
    }
}
