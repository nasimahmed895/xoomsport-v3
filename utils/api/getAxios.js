import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
	baseURL: "https://soccer.sportmonks.com/api/v2.0/",
	timeout: 15000,
	headers: { "content-type": "application/json", Accept: "application/json" },
	params: {
		api_token: process.env.NEXT_PUBLIC_SPORTMONKS_API_TOKEN,
	},
});

const xoomSportUrl = axios.create({
	baseURL: process.env.NEXT_PUBLIC_XOOMSPORT_URL,
	timeout: 15000,
	headers: {
		"content-type": "application/json",
		Accept: "application/json",
		"X-Requested-With": "XMLHttpRequest",
	},
	withCredentials: true,
	params: {
		api_key: process.env.NEXT_PUBLIC_XOOMSPORT_API_TOKEN,
	},
});

xoomSportUrl.interceptors.request.use((config) => {
	let token = null;

	if (Cookies.get("userToken")) {
		token = Cookies.get("userToken");
	} else if (Cookies.get("tempToken")) {
		token = Cookies.get("tempToken");
	}

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// xoomSportUrl.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	(error) => {
// 		try {
// 			const { response } = error;
// 			if (response.status === 401) {
// 				localStorage.removeItem("access_token");
// 			}
// 		} catch (err) {
// 			console.log(err);
// 		}

// 		throw error;
// 	}
// );

export { xoomSportUrl };

export default instance;
