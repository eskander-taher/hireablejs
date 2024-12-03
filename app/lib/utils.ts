import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateLLMContent(prompt: string) {
  try {
    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMENIE_API_KEY!
    );
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const output = response.text();
    return output;
  } catch (error) {
    console.error(error);
  }
}

export async function generateCoverLetter(input: string, cvText: string | null = null) {
  let prompt = `Generate a cover letter for the following job/project: ${input}.`;
  if (cvText) {
    prompt += `\nCV Content: ${cvText}`;
  }
  return await generateLLMContent(prompt);
}

// Function to generate a project proposal using the Gemini model
export async function generateProposal(input: string, cvText: string | null = null) {
  let prompt = `Generate a project proposal for the following description: ${input}.`;
  if (cvText) {
    prompt += `\nCV Content: ${cvText}`;
  }
  return await generateLLMContent(prompt);
}