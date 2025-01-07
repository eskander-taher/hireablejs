import { useState } from "react";
import Button from "../../components/Button";
import { useMutation } from "@tanstack/react-query";
import { myAxios } from "../../constants";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

export default function Home() {
	const [email, setEmail] = useState("");

	const { mutate, isPending } = useMutation({
		mutationFn: async (email: string) => {
			const res = await myAxios.post("/emails", { email });
			return res.data;
		},
		onSuccess: () => {
			setEmail("");
			toast.success("You have joined the community successfully");
		},
		onError: (error) => {
			console.log(error);
			toast.error("Failed to save email");
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		mutate(email);
	};

	return (
		<>
			<Helmet>
				<title>HireableJS</title>
				<meta name="description" content="The zone for all desperate JavaScript developers" />
				<meta name="keywords" content="JavaScript, JS jobs, developer jobs, job search, programming, web development, frontend development, backend development, developer community, coding, hireable, newsletter, tech jobs" />
			</Helmet>
			<div className="flex flex-col justify-center items-center h-screen p-6 bg-gray-100 dark:bg-gray-900 dark:text-white">
				<h1 className="text-6xl dark:text-white mb-4">HireableJS</h1>
				<h2 className="text-2xl dark:text-gray-300 mb-2">The zone for all desperate JavaScript developers.</h2>
				<p className="dark:text-gray-400 mb-6">All the tools you need to land your first JS job ASAP in one place.</p>

				<form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md">
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter your email"
						className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-black dark:text-white dark:bg-gray-700"
						required
					/>
					<Button isLoading={isPending} type="submit" text="Join the Newsletter" />
				</form>
			</div>
		</>
	);
}
