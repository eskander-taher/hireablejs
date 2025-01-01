import { SignIn } from "@clerk/nextjs";

function Signin() {
	return (
		<div className="h-screen w-full flex justify-center items-center">
			<SignIn routing="hash"/>
		</div>
	);
}

export default Signin;
