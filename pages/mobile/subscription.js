import Layout from "@/components/Layout";
import PremiumPlans from "@/components/subscription/PremiumPlans";
import axios from "axios";
import cookie from "cookie";

export default function Subscription({ trendingNewsPost, userToken }) {
	return (
		<Layout
			title="PREMIUM"
			trendingNewsPost={trendingNewsPost}
			userToken={userToken}
		>
			<PremiumPlans />
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const cookies = context.req.headers.cookie;
	let userToken = null;

	if (cookies !== undefined) {
		userToken = cookie.parse(cookies).userToken ?? null;
	}

	const res = await axios.post(`https://xoomsport.com/api/v1/news`, {
		method: "POST",
		api_key: process.env.NEXT_PUBLIC_XOOMSPORT_API_TOKEN,
	});

	return {
		props: {
			trendingNewsPost: res.data.news,
			userToken: userToken ?? null,
		},
	};
}
