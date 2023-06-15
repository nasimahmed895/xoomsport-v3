import Layout from "@/components/Layout";
import WatchList from "@/components/watch/WatchList";
import axios from "axios";
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

	const res = await axios.post(`https://xoomsport.com/api/v1/news`, {
		method: "POST",
		api_key: process.env.NEXT_PUBLIC_XOOMSPORT_API_TOKEN,
	});

	const highlights = await axios.post(
		`https://xoomsport.com/api/v1/highlights`,
		{
			method: "POST",
			api_key: process.env.NEXT_PUBLIC_XOOMSPORT_API_TOKEN,
		}
	);

	const live = await axios.post(`https://xoomsport.com/api/v1/live_matches`, {
		method: "POST",
		api_key: process.env.NEXT_PUBLIC_XOOMSPORT_API_TOKEN,
	});
	return {
		props: {
			trendingNewsPost: res.data.news,
			liveMatches: live.data,
			highlights: highlights.data,
			userToken: userToken ?? null,
		},
	};
}
