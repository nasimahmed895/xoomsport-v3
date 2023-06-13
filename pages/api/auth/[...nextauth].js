import { xoomSportUrl } from "@/utils/api/getAxios";
import getRandomStr from "@/utils/getRandomStr";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	pages: {
		signIn: "/",
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXT_SECRET,
	callbacks: {
		async signIn({ user, account, profile }) {
			const password = getRandomStr(6);
			const result = await xoomSportUrl.post("/api/v1/signup", {
				name: user?.name,
				email: user?.email,
				password,
				password_confirmation: password,
				provider: account.provider,
				device_token: password,
			});
			console.log(result?.data?.access_token);
			return user;
		},
		// async session({ session, token, user }) {
		// 	session.accessToken = token.accessToken;
		// 	console.log(session);
		// 	return session;
		// },
	},
};

export default NextAuth(authOptions);
