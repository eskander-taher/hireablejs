"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { toast } from "react-toastify";
import Button from "@/app/components/ui/Button";
import { useQueryClient } from "@tanstack/react-query";

async function postResume({ userId, resume }: { userId: string; resume: string }) {
	const res = await axios.post(`${BASE_URL}/resume`, { clerkId: userId, resume });
	return res.data;
}

async function getUser(userId: string) {
	const res = await axios.get(`${BASE_URL}/users/${userId}`);
	return res.data;
}

export default function Resume() {
	const [resume, setResume] = useState("");
	const { userId, isLoaded } = useAuth();
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: postResume,
		onSuccess: () => {
			toast.success("Resume was saved successfully");
			queryClient.invalidateQueries({ queryKey: ["users", userId] });
		},
		onError: () => {
			toast.error("Failed to save resume");
		},
	});

	const { data: user, isSuccess } = useQuery({
		queryKey: ["users", userId],
		queryFn: async () => getUser(userId!),
		enabled: !!userId,
	});

	useEffect(() => {
		if (user && user.resume) {
			setResume(user.resume);
		}
	}, [isSuccess]);

	if (!isLoaded) return <p>Loading...</p>;

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (userId && resume) {
			mutate({ userId, resume });
		}
	}

	return (
		<div className="h-screen w-full flex flex-col justify-center items-center">
			<form className="flex flex-col items-center gap-5" onSubmit={handleSubmit}>
				<textarea
					required
					cols={60}
					rows={20}
					placeholder="Copy paste your resume here"
					className="text-black p-2"
					value={resume}
					onChange={(e) => setResume(e.target.value)}
				/>
				<Button type="submit" isLoading={isPending} text="Save resume" />
			</form>
		</div>
	);
}
