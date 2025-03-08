import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";

import Button from "../../components/Button";
import { useMutation } from "@tanstack/react-query";
import { myAxios } from "../../constants";
import { toast } from "react-toastify";

function CVForm() {
	const { user, setUser } = useUser();

	const [CV, setCV] = useState("");

	const { mutate, isPending } = useMutation({
		mutationFn: async (CV: string) => {
			const res = await myAxios.put(`/users/${user?.id}`, { CV });
			return res.data;
		},
		onSuccess: (data) => {
			if (user) {
				setUser({ ...user, CV: data.user.CV });
			}
			toast.success("CV was saved successfully.");
		},
		onError: (error) => {
			console.log(error);
			toast.error("Failed to save CV.");
		},
	});

	useEffect(() => {
		if (user?.CV) {
			setCV(user.CV);
		}
	}, [user]);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		mutate(CV);
	}

	return (
		<form
			className="flex flex-col items-center gap-5 w-full max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
			onSubmit={handleSubmit}
		>
			<h2 className="text-2xl font-bold text-center text-black dark:text-white">
				{user?.CV
					? "You can edit your CV anytime"
					: "You need to add your CV to start using HireableJS amazing tools"}
			</h2>
			<textarea
				required
				minLength={200}
				placeholder="Copy and paste your CV here"
				className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-black dark:text-white dark:bg-gray-700"
				rows={10}
				value={CV}
				onChange={(e) => setCV(e.target.value)}
			/>
			<Button
				isLoading={isPending}
				type="submit"
				text="Save CV"
				className="w-full py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:text-white dark:focus:ring-blue-400"
			/>
		</form>
	);
}

export default CVForm;
