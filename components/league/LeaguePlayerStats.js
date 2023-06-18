import styles from "@/styles/league/LeaguePlayerStats.module.css";
import axios from "@/utils/api/getAxios";
import getSlugify from "@/utils/getSlugify";
import Image from "next/image";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import NoDataFound from "../NoDataFound";
import LeaguePlayerStatsShimmer from "../shimmer/league/LeaguePlayerStatsShimmer";

export default function LeaguePlayerStats({ season_id }) {
	const groupByGoalScorers = {};
	const groupByAssistScorers = {};

	const {
		isLoading,
		data: leaguePlayerStats,
		isError,
		error,
	} = useQuery(`league-player-stats-${season_id}`, async () => {
		return await axios.get(
			`seasons/${season_id}?include=goalscorers.player.team,cardscorers.player.team,assistscorers.player.team`
		);
	});

	const goalsScorersMap = new Map();
	const assistScorersMap = new Map();
	let topScorer = [];
	let topAssist = [];

	if (!isLoading) {
		// Group By Player ID (Goal Scorers)
		for (
			let i = 0;
			i < leaguePlayerStats?.data?.data?.goalscorers?.data?.length;
			i++
		) {
			let make = leaguePlayerStats?.data?.data?.goalscorers?.data[i]?.player_id;
			if (groupByGoalScorers[make] == null) groupByGoalScorers[make] = [];
			groupByGoalScorers[make].push(
				leaguePlayerStats?.data?.data?.goalscorers?.data[i]
			);
		}

		// Group By Player ID (Assist Scorers)
		for (
			let i = 0;
			i < leaguePlayerStats?.data?.data?.assistscorers?.data?.length;
			i++
		) {
			let make =
				leaguePlayerStats?.data?.data?.assistscorers?.data[i]?.player_id;
			if (groupByAssistScorers[make] == null) groupByAssistScorers[make] = [];
			groupByAssistScorers[make].push(
				leaguePlayerStats?.data?.data?.assistscorers?.data[i]
			);
		}

		// Goal Scorers Sum
		Object.keys(groupByGoalScorers).map((item, i) => {
			let sum = 0;
			groupByGoalScorers[item].map((team, index) => {
				sum += team.goals;
			});
			goalsScorersMap.set(groupByGoalScorers[item][0], sum);
		});

		// Assist Scorers Sum
		Object.keys(groupByAssistScorers).map((item, i) => {
			let sum = 0;
			groupByAssistScorers[item].map((team, index) => {
				sum += team.assists;
			});
			assistScorersMap.set(groupByAssistScorers[item][0], sum);
		});

		// Sort By Goal
		const sortedGoalsScorersMap = new Map(
			[...goalsScorersMap.entries()].sort((a, b) => b[1] - a[1])
		);
		const sortedAssistScorersMap = new Map(
			[...assistScorersMap.entries()].sort((a, b) => b[1] - a[1])
		);
		topScorer = [...sortedGoalsScorersMap.entries()].slice(0, 25);
		topAssist = [...sortedAssistScorersMap.entries()].slice(0, 25);
	}

	if (isError) {
		toast.info("Please check your internet connetion or try again!", {
			theme: "dark",
		});
	}

	if (isLoading || isError || leaguePlayerStats.data.data === undefined) {
		return <LeaguePlayerStatsShimmer />;
	} else {
		return (
			<Row>
				<Col sm={12} lg={6}>
					<div className={`${styles.curved1} ${styles.league_player_bg}`}>
						<div className={styles.league__title}>TOP SCORER</div>
						{topScorer.length == 0 ? (
							<NoDataFound />
						) : (
							topScorer.map((item, index) => {
								return (
									<div key={index} className={styles.league_player_stats}>
										<div className={styles.left}>
											<Link
												href={`/player/${getSlugify(
													item[0].player.data.display_name
												)}/${item[0].player.data.player_id}`}
											>
												<Image
													className={styles.league__logo}
													src={item[0]?.player?.data?.image_path}
													loader={() => item[0]?.player?.data?.image_path}
													alt="Player Image"
													width={25}
													height={25}
												/>
												<span className={styles.league_team_name}>
													{item[0].player.data.display_name}
												</span>
											</Link>
										</div>
										<div>
											<Link
												href={`/team/${getSlugify(
													item[0]?.player?.data?.team?.data?.name
												)}/${item[0]?.player?.data?.team?.data?.id}`}
												className={styles.league_player_stats__right}
											>
												{item[0]?.player?.data?.team_id != null ? (
													<Image
														className={styles.league__logo}
														src={item[0]?.player?.data?.team?.data?.logo_path}
														loader={() =>
															item[0]?.player?.data?.team?.data?.logo_path
														}
														alt="Team Image"
														width={25}
														height={25}
													/>
												) : (
													<Image
														className={styles.league__logo}
														src="/team_placeholder.png"
														alt="Team Image"
														width={25}
														height={25}
													/>
												)}
												<span className={styles.league_team__goal}>
													{item[1]}
												</span>
											</Link>
										</div>
									</div>
								);
							})
						)}
					</div>
				</Col>

				<Col sm={12} lg={6}>
					<div className={`${styles.curved2} ${styles.league_player_bg}`}>
						<div
							className={styles.league__title}
							style={{ paddingBottom: "14px" }}
						>
							TOP ASSIST
						</div>
						{topAssist.length == 0 ? (
							<NoDataFound />
						) : (
							topAssist.map((item, index) => (
								<div key={index} className={`${styles.league_player_stats}`}>
									<div className={styles.left}>
										<Link
											key={index}
											href={`/player/${getSlugify(
												item[0].player.data.display_name
											)}/${item[0].player.data.player_id}`}
										>
											<Image
												className={styles.league__logo}
												src={item[0]?.player?.data?.image_path}
												loader={() => item[0]?.player?.data?.image_path}
												alt="Player Image"
												width={25}
												height={25}
											/>
											<span className={styles.league_team_name}>
												{item[0].player.data.display_name}
											</span>
										</Link>
									</div>
									<div>
										<Link
											href={`/team/${getSlugify(
												item[0]?.player?.data?.team?.data?.name
											)}/${item[0]?.player?.data?.team?.data?.id}`}
											className={styles.league_player_stats__right}
										>
											{item[0]?.player?.data?.team_id != null ? (
												<Image
													className={styles.league__logo}
													src={item[0]?.player?.data?.team?.data?.logo_path}
													loader={() =>
														item[0]?.player?.data?.team?.data?.logo_path
													}
													alt="Team Image"
													width={25}
													height={25}
												/>
											) : (
												<Image
													className={styles.league__logo}
													src="/team_placeholder.png"
													alt="Team Image"
													width={25}
													height={25}
												/>
											)}
											<span className={styles.league_team__goal}>
												{item[1]}
											</span>
										</Link>
									</div>
								</div>
							))
						)}
					</div>
				</Col>
			</Row>
		);
	}
}
