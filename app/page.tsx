"use client";
import { SignedOut, SignedIn, SignInButton, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/constants";
import Button from "./components/ui/Button";

async function getUsers() {
	const res = await axios.get(`${BASE_URL}/users`);
	return res.data;
}

export default function Home() {
	const { user } = useUser();

	const { data: users, isSuccess } = useQuery({
		queryKey: ["users"],
		queryFn: getUsers,
	});

	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<h1 className=" text-6xl">HireableJS</h1>
			<h1>The zone for all desperate JavaScript developers</h1>

			<SignedOut>
				<h1>Join the waiting list, be one of the first to use these game changing tools</h1>
				<SignInButton>
					<Button text="Sign in" />
				</SignInButton>
			</SignedOut>
			<SignedIn>
				<h1>
					Hi <span className=" font-bold text-xl">{user?.firstName}</span>
				</h1>
				<p>You have joind the waiting list successfully</p>
				{isSuccess && (
					<p>
						Until now <span className=" font-bold text-xl">{users.length}</span>{" "}
						JavaScript developers have joined the community
					</p>
				)}
				<p>You will be notified in the near future when the website is launched</p>
			</SignedIn>
		</div>
	);
}