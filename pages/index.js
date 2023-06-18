import Layout from "@/components/Layout";
import Fixtures from "@/components/home/Fixtures";
import { xoomSportUrl } from "@/utils/api/getAxios";
import cookie from "cookie";

export default function Home({ trendingNewsPost, userToken }) {
	return (
		<Layout
			title="HOME"
			trendingNewsPost={trendingNewsPost}
			userToken={userToken}
		>
			<Fixtures />
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const cookies = context.req.headers.cookie;
	let userToken = null;

	if (cookies !== undefined) {
		userToken = cookie.parse(cookies).userToken ?? null;
	}

	const trendingNewsPost = await xoomSportUrl
		.post("/api/v1/news")
		.then((res) => res?.data?.news);

	return {
		props: {
			trendingNewsPost,
			userToken: userToken ?? null,
		},
	};
}
