"use client";
import ProtectContent from "@/app/components/ProtectContent";
import ResumeForm from "./ResumeForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { BASE_URL } from "@/constants";
import Loader from "@/app/components/Loader";

async function getUser(userId: string) {
	const res = await axios.get(`${BASE_URL}/users/${userId}`);
	return res.data;
}

export default function Profile() {
	const { userId, isLoaded } = useAuth();

	const { data: user, isLoading } = useQuery({
		queryKey: ["users", userId],
		queryFn: async () => getUser(userId!),
		enabled: !!userId,
	});

	if (!isLoaded || isLoading) {
		return <Loader />;
	}

	function Tools() {
		return (
			<div className="flex flex-col justify-center items-center">
				<h1>Strat using the tools.</h1>
				<p>
					Right now the tools are being developed, whenever a new tool is launched you
					will be the first to know about.
				</p>
			</div>
		);
	}

	return (
		<div className="h-screen flex flex-col justify-center items-center">
			<ProtectContent>{!user?.resume ? <ResumeForm /> : <Tools />}</ProtectContent>
		</div>
	);
}

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
