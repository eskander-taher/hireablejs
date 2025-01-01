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
			toast.success("resume was posted successfully");
		},
		onError: () => {
			toast.error("failed to post resume");
		},
	});

	if (!isLoaded) return <p>Loading...</p>;

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (clerkId) {
			mutate({ clerkId, resume });
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<h1>Copy paste your resume here</h1>
			<textarea
				className="text-black"
				value={resume}
				onChange={(e) => setResume(e.target.value)}
			/>
			<input type="submit" />
		</form>
	);
}

export default ResumeForm;
