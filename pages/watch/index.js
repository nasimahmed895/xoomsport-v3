import Layout from "@/components/Layout";
import WatchList from "@/components/watch/WatchList";
import { xoomSportUrl } from "@/utils/api/getAxios";
import cookie from "cookie";

export default function Watch({
	trendingNewsPost,
	liveMatches,
	highlights,
	userToken,
}) {
	return (
		<Layout
			title="WATCH VIDEOS"
			trendingNewsPost={trendingNewsPost}
			userToken={userToken}
		>
			<WatchList liveMatches={liveMatches} highlights={highlights} />
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

	const highlights = await xoomSportUrl
		.post("/api/v1/highlights")
		.then((res) => res?.data?.data);

	const liveMatches = await xoomSportUrl
		.post("/api/v1/live_matches")
		.then((res) => res?.data?.data);

	return {
		props: {
			trendingNewsPost,
			liveMatches,
			highlights,
			userToken: userToken ?? null,
		},
	};
}
