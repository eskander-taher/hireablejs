import ProtectContent from "@/app/component/ProtectContent";
import ResumeForm from "./ResumeForm";

export default function Profile() {
	return (
		<div className="h-screen flex flex-col justify-center items-center">
			<ProtectContent>
				<ResumeForm />
			</ProtectContent>
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