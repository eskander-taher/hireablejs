import Button from "../../components/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { myAxios } from "../../constants";
import { toast } from "react-toastify";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

interface IFormInput {
	username: string;
	password: string;
}

export default function Signin() {
	const navigate = useNavigate();
	const { setUser } = useUser();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IFormInput>();

	const { mutate, isPending } = useMutation({
		mutationFn: async (data: IFormInput) => {
			const res = await myAxios.post("/sign-in", data);
			return res.data;
		},
		onSuccess: (data) => {
			setUser(data.user);
			reset();
			navigate("/CV");
		},
		onError: (error) => {
			console.log(error);
			toast.error("Sign up failed");
		},
	});

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		mutate(data);
	};

	return (
		<div className="flex-center dark:bg-gray-900 dark:text-white">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md"
			>
				<h2 className="text-black dark:text-white text-2xl font-bold mb-6 text-center">
					Sign in
				</h2>
				<div className="mb-4">
					<label htmlFor="username" className="block text-gray-700 dark:text-gray-300">
						Username
					</label>
					<input
						type="text"
						id="username"
						{...register("username", { required: "Username is required" })}
						className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-400"
					/>
					{errors.username && (
						<p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
					)}
				</div>
				<div className="mb-4">
					<label htmlFor="password" className="block text-gray-700 dark:text-gray-300">
						Password
					</label>
					<input
						type="password"
						id="password"
						{...register("password", { required: "Password is required" })}
						className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-400"
					/>
					{errors.password && (
						<p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
					)}
				</div>

				<Button
					isLoading={isPending}
					text="Sign in"
					type="submit"
					className="w-full py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:text-white dark:focus:ring-blue-400"
				/>
				<p className="text-gray-700 dark:text-gray-300 text-center p-2">
					Don't have an account,{" "}
					<span
						onClick={() => navigate("/signup")}
						className="cursor-pointer text-blue-500 dark:text-blue-400"
					>
						Sign up
					</span>
				</p>
			</form>
		</div>
	);
}
