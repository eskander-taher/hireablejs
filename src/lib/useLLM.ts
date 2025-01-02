import { Mistral } from "@mistralai/mistralai";

const apiKey = import.meta.env.VITE_MISTRAL_LLM_KEY;

if (!apiKey) {
	throw new Error("MISTRAL_LLM_KEY is not defined in environment variables");
}

export default async function useLLM(prompt: string) {
	const client = new Mistral({ apiKey: apiKey });

	try {
		const chatResponse = await client.chat.complete({
			model: "mistral-large-latest",
			messages: [{ role: "user", content: prompt }],
		});

		if (!chatResponse.choices || chatResponse.choices.length === 0) {
			throw new Error("No choices returned from the API");
		}

		return chatResponse.choices[0].message.content;
	} catch (error) {
		console.error("Error interacting with the Mistral AI client:", error);
		throw error;
	}
}
