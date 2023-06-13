import Layout from "@/components/Layout";
import Fixtures from "@/components/home/Fixtures";
import axios from "axios";
import cookie from "cookie";

export default function Home({ trendingNewsPost, userToken, userInfo }) {
	return (
		<Layout
			title="HOME"
			trendingNewsPost={trendingNewsPost}
			userToken={userToken}
			userInfo={userInfo}
		>
			<Fixtures />
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const cookies = context.req.headers.cookie;
	let userToken = null;
	let userInfo = null;

	if (cookies !== undefined) {
		userToken = cookie.parse(cookies).userToken ?? null;
		userInfo = cookie.parse(cookies).userInfo ?? null;
	}

	const res = await axios.post(`https://xoomsport.com/api/v1/news`, {
		method: "POST",
		api_key: process.env.NEXT_PUBLIC_XOOMSPORT_API_TOKEN,
	});

	return {
		props: {
			trendingNewsPost: res.data.news,
			userToken: userToken ?? null,
			userInfo: userInfo ?? null,
		},
	};
}
