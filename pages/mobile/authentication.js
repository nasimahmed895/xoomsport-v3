import MobileAuth from "@/components/auth/MobileAuth";
import cookie from "cookie";

export default function Authentication() {
	return <MobileAuth />;
}

export async function getServerSideProps(context) {
	const cookies = context.req.headers.cookie;
	let userToken = null;

	if (cookies !== undefined) {
		userToken = cookie.parse(cookies).userToken;
	}

	if (userToken) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {}, // will be passed to the page component as props
	};
}
