import styles from "@/styles/match/details/MatchLineUp.module.css";
import axios from "@/utils/api/getAxios";
import { Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import NoDataFound from "../../NoDataFound";

export default function MatchStats({ singleMatch }) {
	const {
		isLoading,
		data: stats,
		isError,
		error,
	} = useQuery(`stats-${singleMatch.id}`, async () => {
		return await axios.get(`fixtures/${singleMatch.id}?include=stats`);
	});

	var data = "";
	function statsComponents(t1, t2, text) {
		return (
			<div>
				<div className={`${styles.line}`}>
					<Row>
						<Col col={6}>
							<div className={styles.Progressleft}>
								<div
									className={styles.Barleft}
									style={{
										width: t1 ? (100 * t1) / (t1 + t2) + "%" : "0",
										backgroundColor: t1 == t2 ? "#151515" : "",
									}}
								></div>
							</div>
						</Col>
						<Col col={6}>
							<div className={styles.Progressright}>
								<div
									className={styles.Barright}
									style={{ width: t2 ? (100 * t2) / (t1 + t2) + "%" : "0" }}
								></div>
							</div>
						</Col>
						<div className="d-flex justify-content-between mt-2">
							<div className="font-helvetica-medium">{t1 ? t1 : "0"}</div>
							<div>{text}</div>
							<div className="font-helvetica-medium">{t2 ? t2 : "0"}</div>
						</div>
					</Row>
				</div>
			</div>
		);
	}
	if (isLoading || isError || stats.data.data === undefined) {
		return <NoDataFound />;
	} else {
		data = stats.data.data.stats.data;
		return (
			<>
				{statsComponents(
					data[0]?.possessiontime,
					data[1]?.possessiontime,
					"Possession (%)"
				)}
				{statsComponents(
					data[0]?.shots.total,
					data[1]?.shots.total,
					"Total Shots"
				)}
				{statsComponents(
					data[0]?.goal_attempts,
					data[1]?.goal_attempts,
					"Shots on Target"
				)}
				{statsComponents(data[0]?.fouls, data[1]?.fouls, "Fouls")}
				{statsComponents(data[0]?.offsides, data[1]?.offsides, "Offsides")}
				{statsComponents(data[0]?.corners, data[1]?.corners, "Corners Kicks")}
				{statsComponents(
					data[0]?.yellowcards,
					data[1]?.yellowcards,
					"Yellow Cards"
				)}
				{statsComponents(data[0]?.redcards, data[1]?.redcards, "Red Cards")}
			</>
		);
	}
}
