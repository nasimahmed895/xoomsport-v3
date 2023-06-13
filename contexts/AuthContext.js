import { xoomSportUrl } from "@/utils/api/getAxios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [userToken, setUserToken] = useState(() =>
		Cookies.get("userToken") ? Cookies.get("userToken") : null
	);

	// Get User Information
	const getUser = () => {
		xoomSportUrl.post("/api/v1/user").then((res) => setUser(res.data?.data));
	};

	useEffect(() => {
		if (Cookies.get("userToken")) {
			getUser();
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				userToken,
				setUserToken,
				getUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default function useAuthContext() {
	return useContext(AuthContext);
}
