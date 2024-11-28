import { Protect, SignInButton } from "@clerk/nextjs";

function FallBack() {
	return (
		<div className="h-full w-full flex flex-col justify-center items-center">
			<h1>You need to sign in first to view this content</h1>
			<SignInButton />
		</div>
	);
}

export default function ProtectContent({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <Protect fallback={<FallBack />}>{children}</Protect>;
}
