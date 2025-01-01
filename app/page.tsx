import axios from "axios";
import { BASE_URL } from "@/constants";

export default async function Home() {
	const res = await axios.get(`${BASE_URL}/users`);

	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<h1 className=" text-6xl">HireableJS</h1>
			<h1>The zone for all desperate JavaScript developers</h1>

			{res.data && (
				<p>
					Until now <span className=" font-bold text-xl">{res.data.length}</span>{" "}
					JavaScript developers have joined the community
				</p>
			)}
		</div>
	);
}
