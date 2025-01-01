import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="h-screen w-full flex flex-col justify-center items-center">
			<SignIn />
		</div>
	);
}
