import styles from "@/styles/league/LeaguePlayerStats.module.css";
import axios from "@/utils/api/getAxios";
import getShortName from "@/utils/getShortName";
import getSlugify from "@/utils/getSlugify";
import Image from "next/image";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import LeagueTeamsShimmer from "../shimmer/league/LeagueTeamsShimmer";

export default function LeagueTeams({ season_id }) {
	const {
		isLoading,
		data: leagueTeams,
		isError,
		error,
	} = useQuery(`league-teams-${season_id}`, async () => {
		return await axios.get(
			`teams/season/${season_id}?include=country,stats&seasons=${season_id}`
		);
	});
	if (isError) {
		toast.info("Please check your internet connetion or try again!", {
			theme: "dark",
		});
	}

	if (isLoading || isError || leagueTeams.data.data === undefined) {
		return <LeagueTeamsShimmer />;
	} else {
		return (
			<div>
				<Row>
					<Col sm={12} lg={4} className="mb-3">
						<div className={`${styles.league_player_bg} mt__3`}>
							<div className={styles.league__title}>TOP GOALS</div>

							{leagueTeams.data.data.length <= 0 ? (
								<div className={styles.match__not_found}>
									<Image
										src="/vector_matches_fav.png"
										alt="Not Found Logo"
										width={300}
										height={300}
									/>
									<p>No Data Found!</p>
								</div>
							) : (
								leagueTeams.data.data
									.sort(
										(a, b) =>
											b?.stats?.data[0]?.goals_for?.total -
											a?.stats?.data[0]?.goals_for?.total
									)
									.slice(0, 25)
									.map((team) => (
										<Link
											key={team.id}
											href={`/team/${getSlugify(team?.name)}/${team.id}`}
										>
											<div className={`${styles.league_player_stats}`}>
												<div className="left">
													<Image
														className={styles.league__logo}
														src={team.logo_path}
														loader={() => team.logo_path}
														alt="Team Logo"
														width={25}
														height={25}
													/>
													<span className={styles.league_team_name}>
														{getShortName(team?.name)}
													</span>
												</div>
												<div className="right">
													<span className={styles.league_team_name}>
														{team?.stats?.data[0]?.goals_for?.total}
													</span>
												</div>
											</div>
										</Link>
									))
							)}
						</div>
					</Col>

					<Col sm={12} lg={4} className="mb-3">
						<div className={`${styles.league_player_bg} mt__6`}>
							<div
								className={styles.league__title}
								style={{ paddingBottom: "12px" }}
							>
								GOALS PER MATCH
							</div>
							{leagueTeams.data.data.length <= 0 ? (
								<div className={styles.match__not_found}>
									<Image
										src="/vector_matches_fav.png"
										alt="Not Found Logo"
										width={300}
										height={300}
									/>
									<p>No Data Found!</p>
								</div>
							) : (
								leagueTeams.data.data
									.sort(
										(a, b) =>
											b?.stats?.data[0]?.avg_goals_per_game_scored?.total -
											a?.stats?.data[0]?.avg_goals_per_game_scored?.total
									)
									.slice(0, 25)
									.map((team) => (
										<Link
											key={team.id}
											href={`/team/${getSlugify(team?.name)}/${team.id}`}
										>
											<div className={`${styles.league_player_stats}`}>
												<div className="left">
													<Image
														className={styles.league__logo}
														src={team.logo_path}
														loader={() => team.logo_path}
														alt="Team Logo"
														width={25}
														height={25}
													/>
													<span className={styles.league_team_name}>
														{getShortName(team?.name)}
													</span>
												</div>
												<div className="right">
													<span className={styles.league_team_name}>
														{
															team?.stats?.data[0]?.avg_goals_per_game_scored
																?.total
														}
													</span>
												</div>
											</div>
										</Link>
									))
							)}
						</div>
					</Col>

					<Col sm={12} lg={4} className="mb-3">
						<div className={`${styles.league_player_bg} mt__10`}>
							<div
								className={styles.league__title}
								style={{ paddingBottom: "16px" }}
							>
								MOST CLEAN SHEETS
							</div>
							{leagueTeams.data.data.length <= 0 ? (
								<div className={styles.match__not_found}>
									<Image
										src="/vector_matches_fav.png"
										alt="Not Found Logo"
										width={300}
										height={300}
									/>
									<p>No Data Found!</p>
								</div>
							) : (
								leagueTeams.data.data
									.sort(
										(a, b) =>
											b?.stats?.data[0]?.clean_sheet?.total -
											a?.stats?.data[0]?.clean_sheet?.total
									)
									.slice(0, 25)
									.map((team) => (
										<Link
											key={team.id}
											href={`/team/${getSlugify(team?.name)}/${team.id}`}
										>
											<div className={styles.league_player_stats}>
												<div className="left">
													<Image
														className={styles.league__logo}
														src={team.logo_path}
														loader={() => team.logo_path}
														alt="Team Logo"
														width={25}
														height={25}
													/>
													<span className={styles.league_team_name}>
														{getShortName(team?.name)}
													</span>
												</div>
												<div className="right">
													<span className={styles.league_team_name}>
														{team.stats?.data[0]?.clean_sheet?.total}
													</span>
												</div>
											</div>
										</Link>
									))
							)}
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}
