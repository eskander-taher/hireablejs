"use client";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { toast } from "react-toastify";
import Button from "@/app/components/ui/Button";
import { useQueryClient } from "@tanstack/react-query";

async function postResume({ clerkId, resume }: { clerkId: string; resume: string }) {
	const res = await axios.post(`${BASE_URL}/resume`, { clerkId, resume });
	return res.data;
}

function ResumeForm() {
	const [resume, setResume] = useState("");
	const { userId: clerkId, isLoaded } = useAuth();
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: postResume,
		onSuccess: () => {
			toast.success("Resume was saved successfully");
			queryClient.invalidateQueries({ queryKey: ["users", clerkId] });
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
			setResume("");
		}
	}

	return (
		<form className="flex flex-col items-center gap-5 w-full" onSubmit={handleSubmit}>
			<h2 className="text-2xl">
				You need to add your cv to start using HireableJS amazing tools
			</h2>
			<textarea
				required
				placeholder="Copy paste your resume here"
				className="text-black p-2 w-full md:w-1/2"
				value={resume}
				onChange={(e) => setResume(e.target.value)}
			/>
			<Button type="submit" isLoading={isPending} text="Save resume" />
		</form>
	);
}

export default ResumeForm;
