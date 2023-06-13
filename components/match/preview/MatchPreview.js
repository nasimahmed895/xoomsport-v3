import styles from "@/styles/match/preview/MatchPreview.module.css";
import axios from "@/utils/api/getAxios";
import getSlugify from "@/utils/getSlugify";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Table } from "react-bootstrap";
import { useQuery } from "react-query";
import LeagueListShimmer from "../../shimmer/league/FullLeagueTableShimmer";
import MatchPreviewShimmer from "../../shimmer/match/MatchPreviewShimmer";

export default function MatchPreview({
	local_id,
	visitor_id,
	season_id,
	league_name,
	league_id,
	country_name,
	logo_path,
	datetime,
	capacity,
}) {
	const {
		isLoading: isLoading1,
		data: singleTeam1,
		isError: isError1,
		error: error1,
	} = useQuery(`team-${local_id}`, async () => {
		return await axios.get(
			`teams/${local_id}?include=latest.localTeam,latest.visitorTeam,latest.league`
		);
	});

	const {
		isLoading: isLoading2,
		data: singleTeam2,
		isError: isError2,
		error: error2,
	} = useQuery(`team-${visitor_id}`, async () => {
		return await axios.get(
			`teams/${visitor_id}?include=latest.localTeam,latest.visitorTeam,latest.league`
		);
	});

	const {
		isLoading: isLoading3,
		data: shortStandings,
		isError: isError3,
		error: error3,
	} = useQuery(`short-standings-table-${season_id}`, async () => {
		return await axios.get(
			`standings/season/${season_id}?include=standings.team,country`
		);
	});

	let group_team_short_standings;

	if (!isLoading3) {
		group_team_short_standings = shortStandings?.data?.data[0]?.name.includes(
			"Group"
		)
			? shortStandings?.data?.data?.map((group) => {
					return group.standings.data?.filter((team) => {
						return team.team_id == local_id || team.team_id == visitor_id;
					});
			  })
			: [];
	}

	return (
		<div className={`preview__container`}>
			<div className={styles.date_and_seat}>
				<div className={styles.preview__date}>
					<Image
						src="/static/images/calendar_black.png"
						alt="logo"
						width={20}
						height={20}
					/>
					<span className={styles.match__date}>
						{moment.utc(datetime).local().format("DD MMMM YYYY, HH:mm")}
					</span>
				</div>
				<div className={styles.preview__date}>
					<Image
						src="/static/images/users.png"
						alt="logo"
						width={20}
						height={20}
					/>
					<span className={styles.match__date}>{capacity}</span>
				</div>
			</div>

			{singleTeam1?.data?.data?.latest.data.length != 0 ? (
				isLoading1 || isError1 || singleTeam1?.data?.data === undefined ? (
					<MatchPreviewShimmer />
				) : (
					!isLoading1 && (
						<div className={`${styles.previous_match__result} mt-4`}>
							<div className="previous_match_with__team ">
								<div className={styles.team__heading}>
									<div className="team__name">
										<span className={styles.team_title}>
											{singleTeam1.data.data.name}
										</span>
									</div>
									<div className={styles.result_status_all}>
										{singleTeam1.data.data.latest.data
											.map((item) => {
												if (local_id == item.localteam_id) {
													if (
														item.scores.localteam_score >
														item.scores.visitorteam_score
													) {
														return (
															<div
																key={item.id}
																className={`${styles.result_status} ${styles.wildcard_w}`}
															>
																W
															</div>
														);
													} else if (
														item.scores.localteam_score <
														item.scores.visitorteam_score
													) {
														return (
															<div
																key={item.id}
																className={`${styles.result_status} ${styles.wildcard_l}`}
															>
																L
															</div>
														);
													} else {
														return (
															<div
																key={item.id}
																className={`${styles.result_status} ${styles.wildcard_d}`}
															>
																D
															</div>
														);
													}
												} else {
													if (
														item.scores.visitorteam_score >
														item.scores.localteam_score
													) {
														return (
															<div
																key={item.id}
																className={`${styles.result_status} ${styles.wildcard_w}`}
															>
																W
															</div>
														);
													} else if (
														item.scores.visitorteam_score <
														item.scores.localteam_score
													) {
														return (
															<div
																key={item.id}
																className={`${styles.result_status} ${styles.wildcard_l}`}
															>
																L
															</div>
														);
													} else {
														return (
															<div
																key={item.id}
																className={`${styles.result_status} ${styles.wildcard_d}`}
															>
																D
															</div>
														);
													}
												}
											})
											.slice(0, 7)}
									</div>
								</div>

								<div className={styles.team__result}>
									{singleTeam1.data.data.latest.data
										.map((item) => (
											<div key={item} className={styles.single_match__result}>
												<Link
													href={`/match/details/${getSlugify(
														item?.localTeam?.data?.name
													)}-vs-${getSlugify(item?.visitorTeam?.data?.name)}/${
														item.id
													}`}
													className="text-dec-none"
												>
													<Image
														className={styles.league__logo}
														loader={() => item?.localTeam?.data?.logo_path}
														src={item?.localTeam?.data?.logo_path}
														alt="League Logo"
														width={30}
														height={30}
													/>
													<span className={styles.goal_result__text}>
														{item.scores.localteam_score} -{" "}
														{item.scores.visitorteam_score}
													</span>
													<Image
														className={styles.league__logo}
														loader={() => item?.visitorTeam?.data?.logo_path}
														src={item?.visitorTeam?.data?.logo_path}
														alt="League Logo"
														width={30}
														height={30}
													/>
												</Link>
											</div>
										))
										.slice(0, 7)}
								</div>
							</div>
						</div>
					)
				)
			) : (
				""
			)}

			{singleTeam2?.data?.data?.latest?.data?.length != 0 ? (
				isLoading1 || isError1 || singleTeam1?.data?.data === undefined ? (
					<MatchPreviewShimmer />
				) : (
					!isLoading2 && (
						<div className={`${styles.previous_match__result} mt-4`}>
							<div className="previous_match_with__team">
								<div className={styles.team__heading}>
									<div className="team__name">
										<span className={styles.team_title}>
											{singleTeam2.data.data.name}
										</span>
									</div>
									<div className={styles.result_status_all}>
										{singleTeam2.data.data.latest.data
											.map((item) => {
												if (visitor_id == item.localteam_id) {
													if (
														item.scores.localteam_score >
														item.scores.visitorteam_score
													) {
														return (
															<div
																key={item.id}
																className={`${styles.result_status} ${styles.wildcard_w}`}
															>
																W
															</div>
														);
													} else if (
														item.scores.localteam_score <
														item.scores.visitorteam_score
													) {
														return (
															<div
																key={item.id}
																className={`${styles.result_status} ${styles.wildcard_l}`}
															>
																L
															</div>
														);
													} else {
														return (
															<div
																key={item.id}
																className={`${styles.result_status} ${styles.wildcard_d}`}
															>
																D
															</div>
														);
													}
												} else {
													if (
														item.scores.visitorteam_score >
														item.scores.localteam_score
													) {
														return (
															<div
																key={item.id}
																className={`${styles.result_status} ${styles.wildcard_w}`}
															>
																W
															</div>
														);
													} else if (
														item.scores.visitorteam_score <
														item.scores.localteam_score
													) {
														return (
															<div
																key={item.id}
																className={`${styles.result_status} ${styles.wildcard_l}`}
															>
																L
															</div>
														);
													} else {
														return (
															<div
																key={item.id}
																className={`${styles.result_status} ${styles.wildcard_d}`}
															>
																D
															</div>
														);
													}
												}
											})
											.slice(0, 7)}
									</div>
								</div>
								<div className={styles.team__result}>
									{singleTeam2.data.data.latest.data
										.map((item) => (
											<div key={item} className={styles.single_match__result}>
												<Link
													href={`/match/details/${getSlugify(
														item?.localTeam?.data?.name
													)}-vs-${getSlugify(item?.visitorTeam?.data?.name)}/${
														item.id
													}`}
													className="text-dec-none"
												>
													<Image
														className={styles.league__logo}
														loader={() => item?.localTeam?.data?.logo_path}
														src={item?.localTeam?.data?.logo_path}
														alt="Team Logo"
														width={30}
														height={30}
													/>
													<span className={styles.goal_result__text}>
														{item.scores.localteam_score} -{" "}
														{item.scores.visitorteam_score}
													</span>
													<Image
														className={styles.league__logo}
														loader={() => item?.visitorTeam?.data?.logo_path}
														src={item?.visitorTeam?.data?.logo_path}
														alt="Team Logo"
														width={30}
														height={30}
													/>
												</Link>
											</div>
										))
										.slice(0, 7)}
								</div>
							</div>
						</div>
					)
				)
			) : (
				""
			)}

			<div className={styles.short__table}>
				<div className={styles.short_table__heading}>
					<span>Standings</span>
				</div>
				<div className={styles.league_details__text}>
					<div>
						<Link
							href={`/league/${getSlugify(league_name)}/${league_id}`}
							className="text-dec-none"
						>
							<Image
								className={styles.league__logo2}
								loader={() => logo_path}
								src={logo_path}
								alt="League Logo"
								width={0}
								height={0}
								sizes="100vw"
							/>
						</Link>
					</div>
					<div>
						<Link
							href={`/league/${getSlugify(league_name)}/${league_id}`}
							className="text-dec-none"
						>
							<h6 className={styles.league__title}>{league_name}</h6>
							<span className={styles.league__country}>{country_name}</span>
						</Link>
					</div>
				</div>
				<div className="table-responsive">
					{isLoading3 ||
					isError3 ||
					shortStandings?.data?.data === undefined ? (
						<LeagueListShimmer />
					) : (
						<Table className={styles.main__table}>
							<thead className={styles.league__list}>
								<tr className={styles.overflow_scroll}>
									<th style={{ width: "5%" }}>#</th>
									<th style={{ width: "20%" }}>TEAM</th>
									<th style={{ width: "5%" }}>GP</th>
									<th style={{ width: "5%" }}>W</th>
									<th style={{ width: "5%" }}>D</th>
									<th style={{ width: "5%" }}>L</th>
									<th style={{ width: "5%" }}>GF</th>
									<th style={{ width: "5%" }}>GA</th>
									<th style={{ width: "5%" }}>GD</th>
									<th style={{ width: "5%" }}>PTS</th>
								</tr>
							</thead>
							<tbody>
								{shortStandings?.data?.data[0]?.name.includes("Group") ? (
									<>
										{group_team_short_standings.map((arr, index) => {
											if (arr.length > 0) {
												return (
													<tr key={index} className={styles.overflow_scroll}>
														<td>{arr[0]?.position}</td>
														<td className="d-flex align-items-center">
															<Image
																className={styles.league__logo}
																loader={() => arr[0]?.team?.data?.logo_path}
																src={arr[0]?.team?.data?.logo_path}
																alt="Team Logo"
																width={25}
																height={25}
															/>
															<span className={styles.table_team__title}>
																{arr[0]?.team?.data?.name}
															</span>
														</td>
														<td>{arr[0]?.overall?.games_played}</td>
														<td> {arr[0]?.overall?.won}</td>
														<td> {arr[0]?.overall?.draw}</td>
														<td> {arr[0]?.overall?.lost}</td>
														<td> {arr[0]?.overall?.goals_scored}</td>
														<td> {arr[0]?.overall?.goals_against}</td>
														<td>
															{arr[0]?.overall?.goals_scored -
																arr[0]?.overall?.goals_against}
														</td>
														<td> {arr[0]?.overall?.points}</td>
													</tr>
												);
											}
										})}
									</>
								) : (
									<>
										{shortStandings?.data?.data[0]?.standings?.data?.map(
											(row) => {
												if (
													row.team_id === local_id ||
													row.team_id === visitor_id
												) {
													return (
														<tr key={row.position}>
															<td>{row.position}</td>
															<td className="d-flex align-items-center">
																<Link
																	href={`/team/${getSlugify(
																		row.team.data.name
																	)}/${row.team.data.id}`}
																>
																	<Image
																		className={styles.league__logo}
																		loader={() => row.team.data.logo_path}
																		src={row.team.data.logo_path}
																		alt="Team Logo"
																		width={25}
																		height={25}
																	/>
																	<span className={styles.table_team__title}>
																		{row.team.data.name}
																	</span>
																</Link>
															</td>
															<td>{row.overall.games_played}</td>
															<td> {row.overall.won}</td>
															<td> {row.overall.draw}</td>
															<td> {row.overall.lost}</td>
															<td> {row.overall.goals_scored}</td>
															<td> {row.overall.goals_against}</td>
															<td>
																{row.overall.goals_scored -
																	row.overall.goals_against}
															</td>
															<td> {row.overall.points}</td>
														</tr>
													);
												}
											}
										)}
									</>
								)}
							</tbody>
						</Table>
					)}
				</div>
			</div>
		</div>
	);
}
