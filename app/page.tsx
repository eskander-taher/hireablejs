"use client";
import { SignedOut, SignedIn, SignInButton, useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "./constants";

async function getUserCount() {
	const res = await axios.get(`${BASE_URL}/users`);
	return res.data;
}

export default function Home() {
	const { user } = useUser();
	const { getToken, userId } = useAuth();

	const { data: count, isSuccess } = useQuery({
		queryKey: ["users"],
		queryFn: getUserCount,
	});

	const { data: profile, isSuccess: profileSuccess } = useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			const token = await getToken();
			const url = `${BASE_URL}/profile/${userId}`;
			const res = await axios.get(url, {
				headers: { Authorization: `Bearer ${token}` },
			});
			return res.data;
		},
		enabled: !!userId,
	});

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
					<p>{`Until now ${count} JavaScript developers have joined the community`}</p>
				)}
				<p>You will be notified in the near future when the website is launched</p>
			</SignedIn>
		</div>
	);
}