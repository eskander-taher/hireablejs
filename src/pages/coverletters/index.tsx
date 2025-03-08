import useLLM from "../../lib/useLLM";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Button from "../../components/Button";
import { useUser } from "../../context/UserContext";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";

export default function CoverLetters() {
	const [jobDesc, setJobDesc] = useState("");
	const [coverletter, setCoverletter] = useState("");
	const { user } = useUser();

	const { mutate, isPending } = useMutation({
		mutationFn: async ({ coverLetterPrompt }: { coverLetterPrompt: string }) => {
			const coverLetter = await useLLM(coverLetterPrompt);
			return coverLetter as string;
		},
		onSuccess: (data) => {
			setCoverletter(data);
		},
		onError: () => {
			alert("Error generating cover letter.");
		},
	});

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (user?.CV) {
			const coverLetterPrompt = generateCoverLetterPrompt(user?.CV, jobDesc);

			mutate({ coverLetterPrompt });
		}
	}

	const handleCopy = () => {
		navigator.clipboard
			.writeText(coverletter)
			.then(() => {
				toast.success("Cover letter copied to clipboard!");
			})
			.catch((err) => {
				toast.error("Failed to copy");
				console.error(": ", err);
			});
	};

	return (
		<div className="pt-20 flex flex-col justify-center items-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900 dark:text-white">
			<form
				onSubmit={handleSubmit}
				className="max-w-2xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8"
			>
				<h2 className="text-2xl font-bold mb-4 text-center">
					Customized Cover Letter Generator
				</h2>
				<p className="mb-6">
					A customized cover letter can increase your chances of getting an interview by
					approximately 20-30% compared to a generic cover letter.
				</p>
				<textarea
					required
					minLength={200}
					className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-black dark:text-white dark:bg-gray-700"
					rows={10}
					value={jobDesc}
					onChange={(e) => setJobDesc(e.target.value)}
					placeholder="Copy and paste job description here..."
				/>
				<Button
					isLoading={isPending}
					type="submit"
					text="Generate Cover Letter"
					className="w-full py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:text-white dark:focus:ring-blue-400"
				/>
				{coverletter && (
					<div className="relative mt-4 p-4 bg-gray-200 dark:bg-gray-700 rounded-lg">
						<button
							className="absolute top-1 right-1  text-black dark:text-white"
							onClick={handleCopy}
						>
							<FaRegCopy />
						</button>
						<p className="text-lg">{coverletter}</p>
					</div>
				)}
			</form>
		</div>
	);
}

function generateCoverLetterPrompt(cv: string, jobDesc: string) {
	return `
			**Language Requirement**: The cover letter must be written in the same language as the job description.

			You are an expert in crafting professional cover letters tailored to specific job descriptions. Your task is to generate a compelling cover letter based on the provided CV and job description.

			**Instructions:**

			1. **Analyze the CV**: Extract key skills, experiences, and qualifications that align with the job description.
			2. **Review the Job Description**: Identify the main responsibilities, required skills, and company values. Note the language used in the job description.
			3. **Craft the Cover Letter**:
			- Start with a strong opening that states the position being applied for and expresses enthusiasm.
			- Highlight relevant experiences and skills from the CV that match the job requirements.
			- Emphasize how the applicant’s background aligns with the company’s values and goals.
			- Conclude with a call to action, expressing a desire for an interview and thanking the employer for their consideration.

			**Important Note**: Do not include placeholder brackets (e.g., [Name], [Company Name]) in the cover letter. If specific information is not provided in the CV or job description, simply omit those details.

			**Language Requirement**: The cover letter must be written in the same language as the job description.

			**CV**: [${cv}]

			**Job Description**: [${jobDesc}]

			**Output**: Please format the cover letter in a professional manner, including a greeting, body paragraphs, and a closing statement.

		`;
}
