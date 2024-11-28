import ProtectContent from "@/app/component/protect-content";
export default function Profile() {
	return (
		<div className="h-screen flex flex-col justify-center items-center">
			<ProtectContent>
				<h1>profile</h1>
			</ProtectContent>
		</div>
	);
}
