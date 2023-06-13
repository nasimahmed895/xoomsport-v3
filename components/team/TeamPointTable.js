import styles from "@/styles/team/TeamPointTable.module.css";
import axios from "@/utils/api/getAxios";
import getSlugify from "@/utils/getSlugify";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { FiChevronDown } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useQuery } from "react-query";
import NoDataFound from "../NoDataFound";
import LeagueListShimmer from "../shimmer/league/FullLeagueTableShimmer";

export default function TeamPointTable({ singleTeam }) {
	const [show, setShow] = useState(false);
	const [seasonId, setSeasonId] = useState(singleTeam.current_season_id);
	const [season, setSeason] = useState(singleTeam.activeSeasons.data[0].name);
	const [leagueName, setLeagueName] = useState(
		singleTeam.activeSeasons.data[0].league.data.name
	);
	const [leagueLogo, setLeagueLogo] = useState(
		singleTeam.activeSeasons.data[0].league.data.logo_path
	);
	const [leagueId, setLeagueId] = useState(
		singleTeam.activeSeasons.data[0].league.data.id
	);

	const color = ["#00ff00", "#FFDD00", "#0000FF", "#FF0000"];
	const resultColor = new Map();
	let colorArr = [];

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSeason = (
		season_id,
		season_name,
		league_name,
		league_logo,
		league_id
	) => {
		setSeasonId(season_id);
		setSeason(season_name);
		setLeagueName(league_name);
		setLeagueLogo(league_logo);
		setLeagueId(league_id);
		setShow(false);
	};

	const {
		isLoading,
		data: teamPointTable,
		isError,
		error,
	} = useQuery(`league-table-${seasonId}`, async () => {
		return await axios.get(
			`standings/season/${seasonId}?include=standings.team`
		);
	});

	if (!isLoading) {
		console.log(singleTeam);

		var name = [];
		if (teamPointTable?.data?.data.length > 0) {
			var leaguetable = teamPointTable.data.data[0].standings.data;
			let i = 0;
			if (leaguetable.length > 0) {
				for (let index = 0; index < leaguetable.length; index++) {
					if (
						leaguetable[index].result != null &&
						!name.includes(leaguetable[index].result)
					) {
						name.push(leaguetable[index].result);
						resultColor.set(
							leaguetable[index].result,
							leaguetable[index].result == "Relegation" ? "red" : color[i]
						);
						i++;
					}
				}
			}
			colorArr = [...resultColor.entries()];
		}
	}

	const getColor = (name) => {
		for (let i = 0; i < colorArr.length; i++) {
			if (colorArr[i][0] === name) {
				return colorArr[i][1];
			}
		}
		return null;
	};

	if (teamPointTable == undefined) {
		return <NoDataFound />;
	} else {
		if (isLoading) {
			return <LeagueListShimmer />;
		} else {
			if (teamPointTable?.data?.data.length == 0) {
				return (
					<>
						<div className={styles.league_details__wrapper}>
							<div>
								<Link
									href={`/league/${getSlugify(leagueName)}/${leagueId}`}
									className={`${styles.league_details__text} text-dec-none`}
								>
									<div>
										<Image
											className={styles.league__logo}
											loader={() => leagueLogo}
											src={leagueLogo}
											alt="League Logo"
											width={35}
											height={35}
										/>
									</div>
									<div>
										<h6 className={styles.league__title}>{leagueName}</h6>
										<span className={styles.league__country}>{season}</span>
									</div>
								</Link>
							</div>
							<div className="season_list">
								<FiChevronDown
									className={styles.season_list__icon}
									onClick={handleShow}
								/>
							</div>
						</div>

						<div className={styles.match__not_found}>
							<Image
								src="/vector_matches_fav.png"
								alt="Not Found Logo"
								width={300}
								height={300}
							/>
							<p>Unfortunately, there are no table data at the moment!</p>
						</div>

						<Modal show={show} onHide={() => setShow(false)} centered>
							<Modal.Header closeButton className={styles.modal__header}>
								<Modal.Title className={styles.modal__title}>
									Choose Season
								</Modal.Title>
								<IoClose
									onClick={handleClose}
									className={styles.modal_cross__btn}
								/>
							</Modal.Header>
							<Modal.Body>
								{singleTeam?.activeSeasons?.data.map((season) => (
									<div
										onClick={() =>
											handleSeason(
												season?.id,
												season?.name,
												season?.league?.data?.name,
												season?.league?.data?.logo_path,
												season?.league?.data?.id
											)
										}
										key={season?.id}
										className={styles.season_league_details__text}
									>
										<div>
											<Image
												className={styles.league__logo}
												loader={() => season?.league?.data?.logo_path}
												src={season?.league?.data?.logo_path}
												alt="League Logo"
												width={35}
												height={35}
											/>
										</div>
										<div>
											<h6 className={styles.league__title}>
												{season?.league?.data?.name}
											</h6>
											<span className={styles.league__country}>
												{season?.name}
											</span>
										</div>
									</div>
								))}
							</Modal.Body>
						</Modal>
					</>
				);
			} else {
				if (teamPointTable?.data?.data[0].name.includes("Group")) {
					return (
						<>
							<div className={styles.league_details__wrapper}>
								<div>
									<Link
										href={`/league/${getSlugify(leagueName)}/${leagueId}`}
										className={`${styles.league_details__text} text-dec-none`}
									>
										<div>
											<Image
												className={styles.league__logo}
												loader={() => leagueLogo}
												src={leagueLogo}
												alt="League Logo"
												width={35}
												height={35}
											/>
										</div>
										<div>
											<h6 className={styles.league__title}>{leagueName}</h6>
											<span className={styles.league__country}>{season}</span>
										</div>
									</Link>
								</div>
								<div className="season_list">
									<FiChevronDown
										className={styles.season_list__icon}
										onClick={handleShow}
									/>
								</div>
							</div>
							{teamPointTable.data.data.map((group) => (
								<div key={group.id} className="league__container">
									<h6 className="m-3">{group.name}</h6>
									<div className={styles.table_content}>
										<Table className={styles.main__table}>
											<thead className={styles.league__list}>
												<tr className={styles.table_content_wreaper}>
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
											<tbody className="align-middle">
												{group.standings.data.map((item, index) => (
													<tr
														key={item?.position}
														className={`${styles.table_border} ${styles.table_content_wreaper}`}
													>
														<td>
															<td>
																<span
																	style={{
																		color: getColor(item.result),
																		marginRight: "5px",
																	}}
																>
																	{getColor(item?.result) ? "|" : ""}
																</span>
																{item?.position}
															</td>
														</td>
														<td>
															<Link
																className="text-dec-none"
																href={`/team/${getSlugify(
																	item?.team?.data?.name
																)}/${item?.team?.data?.id}`}
															>
																<span className={styles.team_tabele_content}>
																	<Image
																		className={styles.league__logo}
																		loader={() => item?.team?.data?.logo_path}
																		src={item?.team?.data?.logo_path}
																		alt="League Logo"
																		width={40}
																		height={40}
																	/>
																	<span>{item?.team_name}</span>
																</span>
															</Link>
														</td>
														<td>{item?.overall?.games_played}</td>
														<td>{item?.overall?.won}</td>
														<td>{item?.overall?.draw}</td>
														<td>{item?.overall?.lost}</td>
														<td>{item?.overall?.goals_scored}</td>
														<td>{item?.overall?.goals_against}</td>
														<td>
															{item?.overall?.goals_scored -
																item?.overall?.goals_against}
														</td>
														<td>{item?.overall?.points}</td>
													</tr>
												))}
											</tbody>
										</Table>
									</div>
								</div>
							))}
							<div>
								{colorArr.map((item, index) => (
									<div key={index} className="color_div">
										<div
											className="color_border"
											style={{
												backgroundColor: item[1],
											}}
										></div>
										<span className="color_text"> {item[0]}</span>
									</div>
								))}
							</div>

							<Modal show={show} onHide={() => setShow(false)} centered>
								<Modal.Header closeButton className={styles.modal__header}>
									<Modal.Title className={styles.modal__title}>
										Choose Season
									</Modal.Title>
									<IoClose
										onClick={handleClose}
										className={styles.modal_cross__btn}
									/>
								</Modal.Header>
								<Modal.Body>
									{singleTeam.activeSeasons.data.map((season) => (
										<div
											onClick={() =>
												handleSeason(
													season.id,
													season.name,
													season.league.data.name,
													season.league.data.logo_path,
													season.league.data.id
												)
											}
											key={season.id}
											className={styles.season_league_details__text}
										>
											<div>
												<Image
													className={styles.league__logo}
													loader={() => season.league.data.logo_path}
													src={season.league.data.logo_path}
													alt="League Logo"
													width={30}
													height={30}
												/>
											</div>
											<div>
												<h6 className={styles.league__title}>
													{season.league.data.name}
												</h6>
												<span className={styles.league__country}>
													{season.name}
												</span>
											</div>
										</div>
									))}
								</Modal.Body>
							</Modal>
						</>
					);
				} else {
					return (
						<div className="league__container">
							<div className={styles.league_details__wrapper}>
								<div>
									<Link
										href={`/league/${getSlugify(leagueName)}/${leagueId}`}
										className={`${styles.league_details__text} text-dec-none`}
									>
										<div>
											<Image
												className={styles.league__logo2}
												loader={() => leagueLogo}
												src={leagueLogo}
												alt="League Logo"
												width={35}
												height={35}
											/>
										</div>
										<div>
											<h6 className={styles.league__title}>{leagueName}</h6>
											<span className={styles.league__country}>{season}</span>
										</div>
									</Link>
								</div>
								<div className="season_list">
									<FiChevronDown
										className={styles.season_list__icon}
										onClick={handleShow}
									/>
								</div>
							</div>

							<div className={styles.table_content}>
								<Table className={styles.main__table}>
									<thead className={styles.league__list}>
										<tr className={styles.table_content_wreaper}>
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
									<tbody className="align-middle">
										{teamPointTable.data.data[0].standings.data.map((item) => (
											<tr
												key={item.position}
												className={`${styles.table_border} ${styles.table_content_wreaper}`}
											>
												<td>
													<span
														style={{
															color: getColor(item.result),
															marginRight: "5px",
														}}
													>
														{getColor(item.result) ? "|" : ""}
													</span>
													{item.position}
												</td>
												<td>
													<Link
														className="text-dec-none"
														href={`/team/${getSlugify(item.team.data?.name)}/${
															item.team.data?.id
														}`}
													>
														<span className={styles.team_tabele_content}>
															<Image
																className={styles.league__logo}
																loader={() => item.team.data.logo_path}
																src={item.team.data.logo_path}
																alt="League Logo"
																width={40}
																height={40}
															/>
															<span>{item.team_name}</span>
														</span>
													</Link>
												</td>
												<td>{item.overall.games_played}</td>
												<td>{item.overall.won}</td>
												<td>{item.overall.draw}</td>
												<td>{item.overall.lost}</td>
												<td>{item.overall.goals_scored}</td>
												<td>{item.overall.goals_against}</td>
												<td>
													{item.overall.goals_scored -
														item.overall.goals_against}
												</td>
												<td>{item.overall.points}</td>
											</tr>
										))}
									</tbody>
								</Table>

								<div className={styles.color__table}>
									{colorArr.map((item, index) => (
										<div key={index} className="color_div">
											<div
												className="color_border"
												style={{
													backgroundColor: item[1],
												}}
											></div>
											<span className="color_text"> {item[0]}</span>
										</div>
									))}
								</div>
							</div>

							<Modal show={show} onHide={() => setShow(false)} centered>
								<Modal.Header closeButton className={styles.modal__header}>
									<Modal.Title className={styles.modal__title}>
										Choose Season
									</Modal.Title>
									<IoClose
										onClick={handleClose}
										className={styles.modal_cross__btn}
									/>
								</Modal.Header>
								<Modal.Body>
									{singleTeam.activeSeasons.data.map((season) => (
										<div
											onClick={() =>
												handleSeason(
													season.id,
													season.name,
													season.league.data.name,
													season.league.data.logo_path,
													season.league.data.id
												)
											}
											key={season.id}
											className={styles.season_league_details__text}
										>
											<div>
												<Image
													className={styles.league__logo}
													loader={() => season.league.data.logo_path}
													src={season.league.data.logo_path}
													alt="League Logo"
													width={30}
													height={30}
												/>
											</div>
											<div>
												<h6 className={styles.league__title}>
													{season.league.data.name}
												</h6>
												<span className={styles.league__country}>
													{season.name}
												</span>
											</div>
										</div>
									))}
								</Modal.Body>
							</Modal>
						</div>
					);
				}
			}
		}
	}
}
