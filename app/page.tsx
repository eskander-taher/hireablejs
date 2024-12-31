"use client";
import { SignedOut, SignedIn, SignInButton, useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { BASE_URL } from "./constants";
import { useState } from "react";

async function getUsers() {
	const res = await axios.get(`${BASE_URL}/users`);
	return res.data;
}
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
			alert("resume was posted successfully");
		},
		onError: () => {
			alert("failed to post resume");
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
			<textarea value={resume} onChange={(e) => setResume(e.target.value)} />
			<input type="submit" />
		</form>
	);
}

export default function Home() {
	const { user } = useUser();

	const { data: users, isSuccess } = useQuery({
		queryKey: ["users"],
		queryFn: getUsers,
	});

	// const { getToken, userId } = useAuth();
	// const { data: profile, isSuccess: profileSuccess } = useQuery({
	// 	queryKey: ["profile"],
	// 	queryFn: async () => {
	// 		const token = await getToken();
	// 		const url = `${BASE_URL}/profile/${userId}`;
	// 		const res = await axios.get(url, {
	// 			headers: { Authorization: `Bearer ${token}` },
	// 		});
	// 		return res.data;
	// 	},
	// 	enabled: !!userId,
	// });

	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<h1 className=" text-6xl">HireableJS</h1>
			<h1>The zone for all desperate JavaScript developers</h1>

			<SignedOut>
				<h1>Join the waiting list, be one of the first to use these game changing tools</h1>
				<SignInButton />
			</SignedOut>
			<SignedIn>
				<h1>
					Hi <span className=" font-bold text-xl">{user?.firstName}</span>
				</h1>
				<p>You have joind the waiting list successfully</p>
				{isSuccess && (
					<p>{`Until now ${users.length} JavaScript developers have joined the community`}</p>
				)}
				<p>You will be notified in the near future when the website is launched</p>
				<ResumeForm />
			</SignedIn>
		</div>
	);
}