import Layout from "@/components/Layout";
import AdsRightSide from "@/components/news/AdsRightSide";
import NewsDetails from "@/components/news/NewsDetails";
import axios from "axios";

export default function SingleNews({ newsDetailsPost }) {
	console.log(newsDetailsPost);
	return (
		<Layout fullScreen title="News Details">
			<NewsDetails newsDetailsPost={newsDetailsPost} />
			<div m-2>
				AdsterraBanner300
				<AdsRightSide />
			</div>
		</Layout>
	);
}



export async function getServerSideProps(context) {
	const res = await axios.post(
		`https://xoomsport.com/api/v1/news_details`,
		{
			method: "POST",
			api_key: process.env.NEXT_PUBLIC_XOOMSPORT_API_TOKEN,
			url: `https://www.90min.com/posts/${context.params.news_title}?utm_source=RSS`,
		}
	);
	try {
		return {
			props: {
				newsDetailsPost: res.data["news-dtls"],
			},
		};
	} catch (error) {
		console.log("Server Error...");
	}
}
