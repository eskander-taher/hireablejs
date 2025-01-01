export const BASE_URL =
	process.env.NODE_ENV == "development"
		? "http://localhost:5000/api"
		: "https://hireablejs-server.vercel.app/api";
