import styles from "@/styles/match/details/MatchSummary.module.css";
import axios from "@/utils/api/getAxios";
import Image from "next/image";
import { useQuery } from "react-query";
import NoDataFound from "../../NoDataFound";

export default function MatchSummaryCommentary({ match_id }) {
	const groupBy = {};
	const orderedDates = {};
	const {
		isLoading,
		data: comments,
		isError,
		error,
	} = useQuery(`comments-${match_id}`, async () => {
		return await axios.get(`fixtures/${match_id}?include=comments`);
	});

	if (isLoading || isError || comments.data.data === undefined) {
		return <NoDataFound />;
	} else {
		const orderArray = comments.data.data.comments.data;
		orderArray.sort((a, b) => b.order - a.order);
		if (!orderArray || !orderArray.length) {
			return (
				<div className="match__not_found">
					<Image
						src="/vector_matches_fav.png"
						alt="Not Found Logo"
						width={300}
						height={300}
					/>
					<p>No Commentary Available!</p>
				</div>
			);
		} else {
			return (
				<div>
					{orderArray.map((item) => (
						<>
							<div className={styles.commentary_content}>
								<span className={styles.commentary_minute}>
									{item.minute}
									{"'"}
									{item.extra_minute ? " + " + item.extra_minute : ""}{" "}
								</span>
								<span>| </span>
								<span className={styles.commentary_items}>{item.comment}</span>
							</div>
						</>
					))}
				</div>
			);
		}
	}
}
