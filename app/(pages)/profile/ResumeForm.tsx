"use client";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/app/constants";
import { toast } from "react-toastify";

async function postResume({ clerkId, resume }: { clerkId: string; resume: string }) {
	const res = await axios.post(`${BASE_URL}/resume`, { clerkId, resume });
	return res.data;
}

function ResumeForm() {
	const [resume, setResume] = useState("");
	const { userId: clerkId, isLoaded } = useAuth();

	const { mutate } = useMutation({
		mutationFn: postResume,
		onSuccess: () => {
			toast.success("Resume was saved successfully");
		},
		onError: () => {
			toast.error("Failed to save resume");
		},
	});

	if (!isLoaded) return <p>Loading...</p>;

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (clerkId && resume) {
			mutate({ clerkId, resume });
		}
	}

	return (
		<form className="flex flex-col items-center gap-5" onSubmit={handleSubmit}>
			<textarea
				cols={60}
				placeholder="Copy paste your resume here"
				className="text-black p-2"
				value={resume}
				onChange={(e) => setResume(e.target.value)}
			/>
			<button type="submit">Save resume</button>
		</form>
	);
}

export default ResumeForm;
