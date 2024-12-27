import { GoogleGenerativeAI } from "@google/generative-ai";

export async function useLLM(prompt: string) {
	try {
		const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMENIE_API_KEY!);
		const model = genAI.getGenerativeModel({ model: "gemini-pro" });
		const result = await model.generateContent(prompt);
		const response = result.response;
		const output = response.text();
		return output;
	} catch (error) {
		console.error(error);
	}
}