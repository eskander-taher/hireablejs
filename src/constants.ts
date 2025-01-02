import axios from "axios";

export const BASE_URL = import.meta.env.DEV
	? "http://localhost:5000/api"
	: "https://hireablejs-server.vercel.app/api";

export const myAxios = axios.create({ baseURL: BASE_URL });
