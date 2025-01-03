import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";

import Button from "../../components/Button";
import { useMutation } from "@tanstack/react-query";
import { myAxios } from "../../constants";
import { toast } from "react-toastify";

function ResumeForm() {
	const { user, setUser } = useUser();

	const [resume, setResume] = useState("");

	const { mutate, isPending } = useMutation({
		mutationFn: async (resume: string) => {
			const res = await myAxios.put(`/users/${user?.id}`, { resume });
			return res.data;
		},
		onSuccess: (data) => {
			if (user) {
				setUser({ ...user, resume: data.user.resume });
			}
			toast.success("Resume was saved successfully.");
		},
		onError: (error) => {
			console.log(error);
			toast.error("Failed to save resume.");
		},
	});

	useEffect(() => {
		if (user?.resume) {
			setResume(user.resume);
		}
	}, [user]);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		mutate(resume);
	}

	return (
		<form
			className="flex flex-col items-center gap-5 w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
			onSubmit={handleSubmit}
		>
			<h2 className="text-2xl font-bold text-center text-black dark:text-white">
				{user?.resume
					? "You can edit your resume anytime"
					: "You need to add your CV to start using HireableJS amazing tools"}
			</h2>
			<textarea
				required
				minLength={200}
				placeholder="Copy and paste your resume here"
				className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-black dark:text-white dark:bg-gray-700"
				rows={10}
				value={resume}
				onChange={(e) => setResume(e.target.value)}
			/>
			<Button
				isLoading={isPending}
				type="submit"
				text="Save Resume"
				className="w-full py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:text-white dark:focus:ring-blue-400"
			/>
		</form>
	);
}

export default ResumeForm;
