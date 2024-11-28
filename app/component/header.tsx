"use client";
import { SignedIn, UserButton } from "@clerk/nextjs";
// import { useUser } from "@clerk/nextjs";
// import Link from "next/link";

export default function Header() {
	// const { user } = useUser();
	return (
		<header className="absolute w-full bg-slate-900 flex justify-end items-center gap-10 px-10 py-4">
			<SignedIn>
				{/* <Link href="/">Home</Link>
				<Link href="/profile">Profile</Link>
				<span>Hi {user?.firstName}</span> */}
				<UserButton />
			</SignedIn>
		</header>
	);
}
