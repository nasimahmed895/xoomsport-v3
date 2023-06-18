import FavoriteList from "@/components/favorites/FavoriteList";
import Layout from "@/components/Layout";
import { xoomSportUrl } from "@/utils/api/getAxios";
import cookie from "cookie";

export default function Favorites({ trendingNewsPost, userToken }) {
	return (
		<Layout
			title="FAVORITES"
			trendingNewsPost={trendingNewsPost}
			userToken={userToken}
		>
			<FavoriteList userToken={userToken} />
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const cookies = context.req.headers.cookie;
	let userToken = null;

	if (cookies !== undefined) {
		userToken = cookie.parse(cookies).userToken;
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
