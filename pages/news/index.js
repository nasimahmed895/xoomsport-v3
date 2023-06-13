import Layout from "@/components/Layout";
import NewsList from "@/components/news/NewsList";
// import axios from "axios";
import NewsShimmer from "@/components/shimmer/news/NewsShimmer";
import axios, { xoomSportUrl } from "@/utils/api/getAxios";
import cookie from "cookie";
import { useQuery } from "react-query";
export default function News({ allNews, userToken }) {
	const {
		isLoading: isLoading,
		data: allNews_list,
		isError: isError,
	} = useQuery("allNews_list", async () => {
		return await xoomSportUrl.post(`/api/v1/news`);
	});
	return (
		<Layout
			title="Latest News"
			trendingNewsPost={allNews}
			userToken={userToken}
		>
			{isLoading ? (
				<NewsShimmer />
			) : (
				<>
					<NewsList allNews={allNews_list?.data?.news} />
				</>
			)}
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
			allNews: res.data.news,
			userToken: userToken ?? null,
		},
	};
}
