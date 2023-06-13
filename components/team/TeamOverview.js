import styles from "@/styles/team/TeamOverview.module.css";
import axios, { xoomSportUrl } from "@/utils/api/getAxios";
import getSlugify from "@/utils/getSlugify";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import LeagueListShimmer from "../shimmer/league/FullLeagueTableShimmer";
import TeamOverviewShimmer from "../shimmer/team/TeamOverviewShimmer";

export default function TeamOverview({ singleTeam, userToken }) {
	const doBlackFavorite = useRef(null);
	const undoBlackFavorite = useRef(null);

	const {
		isLoading: isLoading1,
		data: favorite,
		isError: isError1,
		error: error1,
	} = useQuery(`favorite_select_id`, async () => {
		return await xoomSportUrl.post(`/api/v1/favorite_id`);
	});

	// Favorite Black Action
	const favoriteBlackAction = (status, league, provider, id) => {
		if (userToken) {
			if (status) {
				xoomSportUrl.post("/api/v1/favorite/create", {
					provider: provider,
					data: JSON.stringify(league),
					id: id,
				});

				doBlackFavorite.current.style.display = "none";
				undoBlackFavorite.current.style.display = "block";
			} else {
				xoomSportUrl.post("/api/v1/favorite_destroy", {
					provider: provider,
					id: id,
				});

				doBlackFavorite.current.style.display = "block";
				undoBlackFavorite.current.style.display = "none";
			}
		} else {
			toast.warn("Please Signin Before Add Favorites!", {
				theme: "dark",
			});
		}
	};

	// Select Black Favorite
	const selectBlackFavorite = (id, league) => {
		if (userToken) {
			if (favorite?.data?.competitions?.data.includes(id)) {
				return (
					<>
						<div
							className={styles.web_favorite}
							ref={undoBlackFavorite}
							onClick={(e) => favoriteBlackAction(e, 0, league, "matches", id)}
						>
							<Image
								src="/star_full_red.png"
								alt="Favorite Logo"
								width={0}
								height={0}
								title="Add to favorite"
								sizes="100vw"
								style={{ height: "20px", width: "20px" }}
							/>
						</div>
						<div
							className={styles.web_favorite}
							ref={doBlackFavorite}
							onClick={(e) => favoriteBlackAction(e, 1, league, "matches", id)}
							style={{ display: "none" }}
						>
							<Image
								src="/star_black.png"
								alt="Favorite Logo"
								width={0}
								height={0}
								title="Add to favorite"
								sizes="100vw"
								style={{ height: "20px", width: "20px" }}
							/>
						</div>
					</>
				);
			} else {
				return (
					<>
						<div
							className={styles.web_favorite}
							ref={undoBlackFavorite}
							onClick={(e) => favoriteBlackAction(e, 0, league, "matches", id)}
							style={{ display: "none" }}
						>
							<Image
								src="/star_full_red.png"
								alt="Favorite Logo"
								width={0}
								height={0}
								title="Add to favorite"
								sizes="100vw"
								style={{ height: "20px", width: "20px" }}
							/>
						</div>
						<div
							className={styles.web_favorite}
							ref={doBlackFavorite}
							onClick={(e) => favoriteBlackAction(e, 1, league, "matches", id)}
						>
							<Image
								src="/star_black.png"
								alt="Favorite Logo"
								width={0}
								height={0}
								title="Add to favorite"
								sizes="100vw"
								style={{ height: "20px", width: "20px" }}
							/>
						</div>
					</>
				);
			}
		} else {
			return (
				<>
					<div
						className={styles.web_favorite}
						ref={undoBlackFavorite}
						onClick={(e) => favoriteBlackAction(e, 0, league, "matches", id)}
						style={{ display: "none" }}
					>
						<Image
							src="/star_full_red.png"
							alt="Favorite Logo"
							width={0}
							height={0}
							title="Add to favorite"
							sizes="100vw"
							style={{ height: "20px", width: "20px" }}
						/>
					</div>
					<div
						className={styles.web_favorite}
						ref={doBlackFavorite}
						onClick={(e) => favoriteBlackAction(e, 1, league, "matches", id)}
					>
						<Image
							src="/star_black.png"
							alt="Favorite Logo"
							width={0}
							height={0}
							title="Add to favorite"
							sizes="100vw"
							style={{ height: "20px", width: "20px" }}
						/>
					</div>
				</>
			);
		}
	};

	const {
		isLoading,
		data: shortStandings,
		isError,
		error,
	} = useQuery(
		`short-standings-table-${singleTeam.current_season_id}`,
		async () => {
			return await axios.get(
				`standings/season/${singleTeam.current_season_id}?include=standings.team,season.league.country`
			);
		}
	);

	let position_serial_start;

	if (!isLoading) {
		let team_position = shortStandings?.data?.data[0]?.standings?.data.filter(
			(team) => {
				return singleTeam.name == team.team_name;
			}
		)[0].position;

		if (team_position == 1) {
			position_serial_start = 1;
		} else {
			position_serial_start = team_position - 1;
		}
	}

	if (singleTeam === undefined) {
		return (
			<div>
				<TeamOverviewShimmer />
				<LeagueListShimmer />
			</div>
		);
	} else {
		return (
			<div className="team_overview__container">
				{singleTeam?.upcoming?.data.length > 0 && (
					<div className={styles.up_coming_match__container}>
						<div className={styles.up_coming_match__heading}>
							<div className={styles.up_coming_match__date}>
								<h5 className="m-0">Next Match</h5>
								<span className="text-uppercase">
									{moment
										.utc(
											singleTeam?.upcoming?.data[0]?.time?.starting_at
												?.date_time
										)
										.local()
										.format("ddd, DD MMMM")}
								</span>
							</div>
							<div className={styles.up_coming_match__league}>
								<span>{singleTeam?.upcoming?.data[0]?.league?.data?.name}</span>
							</div>
						</div>

						<div className={styles.fixtures__wrapper}>
							<Link
								href={`/match/details/${getSlugify(
									singleTeam?.upcoming?.data[0]?.localTeam?.data?.name
								)}-vs-${getSlugify(
									singleTeam?.upcoming?.data[0]?.visitorTeam?.data?.name
								)}/${singleTeam?.upcoming?.data[0]?.id}`}
								className="text-dec-none"
							>
								<Row className={styles.league_fixtures_container}>
									<Col
										lg={5}
										md={5}
										sm={5}
										xs={5}
										className={`d-flex align-items-center brack_word`}
									>
										<span className={styles.league__status}>
											{singleTeam?.upcoming?.data[0]?.time?.status}
										</span>

										<Image
											className={styles.league__logo}
											loader={() =>
												singleTeam?.upcoming?.data[0]?.localTeam?.data
													?.logo_path
											}
											src={
												singleTeam?.upcoming?.data[0]?.localTeam?.data
													?.logo_path
											}
											alt="Team Logo"
											width={40}
											height={40}
										/>
										<span className={styles.league__title}>
											{singleTeam?.upcoming?.data[0]?.localTeam?.data?.name}
										</span>
									</Col>
									<Col
										lg={2}
										md={2}
										sm={2}
										xs={2}
										className={`p-0 align-items-center brack_word justify-content-center  d-flex`}
									>
										<div className={styles.match__timestamp}>
											<span className={styles.match__date}>
												{moment
													.utc(
														singleTeam?.upcoming?.data[0]?.time?.starting_at
															?.date_time
													)
													.local()
													.format("DD MMM")}
											</span>
											<span className={styles.match__time}>
												{moment
													.utc(
														singleTeam?.upcoming?.data[0]?.time?.starting_at
															?.date_time
													)
													.local()
													.format("HH:mm")}
											</span>
										</div>
									</Col>
									<Col
										lg={5}
										md={5}
										sm={5}
										xs={5}
										className={`align-items-center brack_word justify-content-start d-flex`}
									>
										<Image
											className={styles.league__logo}
											loader={() =>
												singleTeam?.upcoming?.data[0]?.visitorTeam?.data
													?.logo_path
											}
											src={
												singleTeam?.upcoming?.data[0]?.visitorTeam?.data
													?.logo_path
											}
											alt="Team Logo"
											width={40}
											height={40}
										/>
										<span className={styles.league__title}>
											{singleTeam?.upcoming?.data[0]?.visitorTeam?.data?.name}
										</span>
									</Col>
								</Row>
							</Link>
							<div className={styles.favorite_icon__design}>
								{selectBlackFavorite(
									singleTeam?.upcoming?.data[0]?.id,
									singleTeam?.upcoming?.data[0]
								)}
							</div>
						</div>
					</div>
				)}

				<div className={styles.last_match__container}>
					<div className={styles.last_match__heading}>
						<h5 className={`m-0 ${styles.last_match}`}>Last 5 Matches</h5>
					</div>
					<div className={styles.last_match__list}>
						{singleTeam?.latest?.data
							.map((match) => (
								<div key={match.id} className={styles.content_wreaper_matchess}>
									{singleTeam.id == match?.localTeam?.data?.id ? (
										<div className={styles.contrent_wreaper}>
											<div
												className={`${styles.last_match__score} ${
													match?.scores?.localteam_score ==
													match?.scores?.visitorteam_score
														? styles.match_draw__bg
														: match?.scores?.localteam_score >
														  match?.scores?.visitorteam_score
														? styles.match_win__bg
														: styles.match_loss__bg
												}`}
											>
												{match?.scores?.localteam_score} -{" "}
												{match?.scores?.visitorteam_score}
											</div>
											<div className={styles.last_match__opponent}>
												<Image
													className={styles.league__logo}
													loader={() => match?.visitorTeam?.data?.logo_path}
													src={match?.visitorTeam?.data?.logo_path}
													alt="Team Logo"
													width={40}
													height={40}
												/>
											</div>
										</div>
									) : (
										<>
											<div
												className={`${styles.last_match__score} ${
													match?.scores?.localteam_score ==
													match?.scores?.visitorteam_score
														? styles.match_draw__bg
														: match?.scores?.visitorteam_score >
														  match?.scores?.localteam_score
														? styles.match_win__bg
														: styles.match_loss__bg
												}`}
											>
												{match?.scores?.visitorteam_score} -{" "}
												{match?.scores?.localteam_score}
											</div>
											<div className={styles.last_match__opponent}>
												<Image
													className={styles.league__logo}
													loader={() => match?.localTeam?.data?.logo_path}
													src={match?.localTeam?.data?.logo_path}
													alt="Team Logo"
													width={40}
													height={40}
												/>
											</div>
										</>
									)}
								</div>
							))
							.slice(0, 5)}
					</div>
				</div>

				<div className={styles.short__table}>
					{isLoading || isError ? (
						""
					) : (
						<>
							<div className={styles.league_details__text}>
								<div>
									<Link
										href={`/league/${getSlugify(
											shortStandings?.data?.data[0]?.season?.data?.league?.data
												?.name
										)}/${
											shortStandings?.data?.data[0]?.season?.data?.league?.data
												?.id
										}`}
										className="text-dec-none"
									>
										<Image
											className={styles.league__logo2}
											loader={() =>
												shortStandings?.data?.data[0]?.season?.data?.league
													?.data?.logo_path
											}
											src={
												shortStandings?.data?.data[0]?.season?.data?.league
													?.data?.logo_path
											}
											alt="League Logo"
											width={0}
											height={0}
											sizes="100vw"
										/>
									</Link>
								</div>
								<div>
									<Link
										href={`/league/${getSlugify(
											shortStandings?.data?.data[0]?.season?.data?.league?.data
												?.name
										)}/${
											shortStandings?.data?.data[0]?.season?.data?.league?.data
												?.id
										}`}
										className="text-dec-none"
									>
										<h6 className={styles.league__title_table}>
											{
												shortStandings?.data?.data[0]?.season?.data?.league
													?.data?.name
											}
										</h6>
										<span className={styles.league__country}>
											{
												shortStandings?.data?.data[0]?.season?.data?.league
													?.data?.country?.data?.name
											}
										</span>
									</Link>
								</div>
							</div>

							<div className="overflow-scroll">
								<Table className={styles.main__table}>
									<thead className={styles.league__list}>
										<tr>
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
												{shortStandings?.data?.data?.map((group, index) => {
													group.standings.data?.map((row) => {
														<tr key={row.position}>
															<td>{row.position}</td>
															<td className="d-flex align-items-center">
																<span className={styles.team_tabele_content}>
																	<Image
																		className={styles.league__logo}
																		loader={() => row?.team?.data?.logo_path}
																		src={row?.team?.data?.logo_path}
																		alt="Team Logo"
																		width={25}
																		height={25}
																	/>
																	<span className={styles.table_team__title}>
																		{row?.team?.data?.name}
																	</span>
																</span>
															</td>
															<td>{row?.overall?.games_played}</td>
															<td>{row?.overall?.won}</td>
															<td>{row?.overall?.draw}</td>
															<td>{row?.overall?.lost}</td>
															<td>{row?.overall?.goals_scored}</td>
															<td>{row?.overall?.goals_against}</td>
															<td>
																{row?.overall?.goals_scored -
																	row?.overall?.goals_against}
															</td>
															<td>{row?.overall?.points}</td>
														</tr>;
													});
												})}
											</>
										) : (
											<>
												{shortStandings?.data?.data[0]?.standings?.data?.map(
													(row) => {
														if (
															position_serial_start == row.position ||
															position_serial_start + 1 == row.position ||
															position_serial_start + 2 == row.position
														) {
															return (
																<tr key={row.position}>
																	<td>{row.position}</td>
																	<td className="d-flex align-items-center">
																		<Link
																			className="text-dec-none"
																			href={`/team/${getSlugify(
																				row?.team?.data?.name
																			)}/${row?.team?.data?.id}`}
																		>
																			<Image
																				className={styles.league__logo}
																				loader={() =>
																					row?.team?.data?.logo_path
																				}
																				src={row?.team?.data?.logo_path}
																				alt="Team Logo"
																				width={25}
																				height={25}
																			/>
																		</Link>
																		<span className={styles.table_team__title}>
																			<Link
																				className="text-dec-none"
																				href={`/team/${getSlugify(
																					row?.team?.data?.name
																				)}/${row?.team?.data?.id}`}
																			>
																				{row?.team?.data?.name}
																			</Link>
																		</span>
																	</td>
																	<td>{row?.overall?.games_played}</td>
																	<td>{row?.overall?.won}</td>
																	<td>{row?.overall?.draw}</td>
																	<td>{row?.overall?.lost}</td>
																	<td>{row?.overall?.goals_scored}</td>
																	<td>{row?.overall?.goals_against}</td>
																	<td>
																		{row?.overall?.goals_scored -
																			row?.overall?.goals_against}
																	</td>
																	<td>{row?.overall?.points}</td>
																</tr>
															);
														}
													}
												)}
											</>
										)}
									</tbody>
								</Table>
							</div>
						</>
					)}
				</div>
			</div>
		);
	}
}
