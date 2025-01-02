import useLLM from "../../lib/useLLM";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Button from "../../components/Button";
import { useUser } from "../../context/UserContext";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";

export default function CoverLetters() {
	const [prompt, setPrompt] = useState("");
	const [coverletter, setCoverletter] = useState("");
	const [companyName, setCompanyName] = useState("");
	const { user } = useUser();

	const { mutate, isPending } = useMutation({
		mutationFn: async ({
			getCoverLetterPrompt,
			getCompanyNamePrompt,
		}: {
			getCoverLetterPrompt: string;
			getCompanyNamePrompt: string;
		}) => {
			const coverLetter = await useLLM(getCoverLetterPrompt);
			const companyName = await useLLM(getCompanyNamePrompt);
			return [coverLetter, companyName] as string[];
		},
		onSuccess: (data) => {
			setCompanyName(data[1]);
			setCoverletter(data[0]);
		},
		onError: (error) => {
			console.log(error);
			alert("Error generating cover letter.");
		},
	});

	function handleSubmit() {
		const getCoverLetterPrompt = `
      Given the following CV: ${user?.resume}, please write a customized cover letter for the job description provided: ${prompt}.

      Do not write contacts and those stuff at the end, start directly from the cover letter content. Do not use markup; return the response as a plain string.
    `;
		const getCompanyNamePrompt = `
      Given the following job description: ${prompt}, return only the name of the company. If you could not, return "unknown". Do not write any additional text.
    `;

		mutate({ getCoverLetterPrompt, getCompanyNamePrompt });
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
			<div className="max-w-2xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
				<h2 className="text-2xl font-bold mb-4 text-center">
					Customized Cover Letter Generator
				</h2>
				<p className="mb-6">
					A customized cover letter can increase your chances of getting an interview by
					approximately 20-30% compared to a generic cover letter.
				</p>
				<textarea
					className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-black dark:text-white dark:bg-gray-700"
					rows={10}
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					placeholder="Copy and paste job description here..."
				/>
				<Button
					isLoading={isPending}
					onClick={handleSubmit}
					text="Generate Cover Letter"
					className="w-full py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:text-white dark:focus:ring-blue-400"
				/>
				{companyName && <h2 className="text-3xl font-semibold mt-6">{companyName}</h2>}
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
			</div>
		</div>
	);
}
