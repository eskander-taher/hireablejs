"use client";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { BASE_URL } from "@/constants";
import { useEffect, useState } from "react";
import { SignInButton, SignUpButton, SignedOut } from "@clerk/nextjs";

async function getUser(userId: string) {
	const res = await axios.get(`${BASE_URL}/users/${userId}`);
	return res.data;
}

export default function Header() {
	const { userId } = useAuth();
	const [showResumeLink, setShowResumeLink] = useState(false);

	const { data: user } = useQuery({
		queryKey: ["users", userId],
		queryFn: async () => getUser(userId!),
		enabled: !!userId,
	});

	useEffect(() => {
		if (user && user.resume) {
			setShowResumeLink(true);
		}
	}, [user]);

	return (
		<header className="absolute w-full bg-slate-900 flex justify-end items-center gap-10 px-10 py-4">
			<Link href="/">Home</Link>
			<SignedOut>
				<SignInButton />
				<SignUpButton />
			</SignedOut>
			<SignedIn>
				{showResumeLink && <Link href="/my-resume">My Resume</Link>}
				<Link href="/dashboard">Dashboard</Link>
			</SignedIn>
			<UserButton />
		</header>
	);
}
