import styles from "@/styles/league/FullLeagueTable.module.css";
import axios from "@/utils/api/getAxios";
import getSlugify from "@/utils/getSlugify";
import Image from "next/image";
import Link from "next/link";
import { Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import NoDataFound from "../NoDataFound";
import LeagueListShimmer from "../shimmer/league/FullLeagueTableShimmer";

export default function FullLeagueTable({ season_id }) {
	const color = ["#00ff00", "#FFDD00", "#0000FF", "#FF0000"];
	const resultColor = new Map();
	let colorArr = [];
	const {
		isLoading,
		data: leagueTable,
		isError,
	} = useQuery(`league-table-${season_id}`, async () => {
		return await axios.get(
			`standings/season/${season_id}?include=standings.team`
		);
	});

	if (!isLoading) {
		if (leagueTable.data.data.length > 0) {
			var name = [];
			var leaguetable = leagueTable?.data?.data[0]?.standings?.data;
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
		}
		colorArr = [...resultColor.entries()];
	}

	const getColor = (name) => {
		for (let i = 0; i < colorArr.length; i++) {
			if (colorArr[i][0] === name) {
				return colorArr[i][1];
			}
		}
		return null;
	};
	if (isError) {
		toast.info("Please check your internet connetion or try again!", {
			theme: "dark",
		});
	}

	if (isLoading || isError || leagueTable.data.data === undefined) {
		return <LeagueListShimmer />;
	} else {
		if (leagueTable.data.data.length == 0) {
			return (
				<div className={styles.match__not_found}>
					<Image
						src="/vector_matches_fav.png"
						alt="Not Found Logo"
						width={300}
						height={300}
					/>
					<p>Unfortunately, there are no table data at the moment!</p>
				</div>
			);
		} else {
			if (leagueTable.data.data[0].name.includes("Group")) {
				return leagueTable === undefined ? (
					<NoDataFound />
				) : (
					<>
						{leagueTable.data.data.map((group) => (
							<div
								key={group.id}
								className="league__container overflow_991_max"
							>
								<h6 className={`m-3 ${styles.group_name}`}>{group.name}</h6>
								<div>
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
										<tbody className="align-middle">
											{group.standings.data.map((item, index) => (
												<tr key={item.position} className={styles.table_border}>
													<td>
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
													</td>
													<td>
														<Link
															href={`/team/${getSlugify(item.team.data.name)}/${
																item.team.data.id
															}`}
															className="text_black overflow_576_max"
														>
															<Image
																className={styles.league__logo}
																loader={() => item.team.data.logo_path}
																src={item.team.data.logo_path}
																alt="League Logo"
																width={40}
																height={40}
															/>
															<span>{item.team_name}</span>
														</Link>
													</td>
													<td>{item?.overall?.games_played}</td>
													<td> {item?.overall?.won}</td>
													<td> {item?.overall?.draw}</td>
													<td> {item?.overall?.lost}</td>
													<td> {item?.overall?.goals_scored}</td>
													<td> {item?.overall?.goals_against}</td>
													<td>
														{item?.overall?.goals_scored -
															item?.overall?.goals_against}
													</td>
													<td> {item?.overall?.points}</td>
												</tr>
											))}
										</tbody>
									</Table>
								</div>
							</div>
						))}
						<div>
							{colorArr.map((item, index) => (
								<div className="color_div" key={index}>
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
					</>
				);
			} else {
				return leagueTable === undefined ? (
					<NoDataFound />
				) : (
					<div className="league__container overflow_991_max">
						{leagueTable.data.data[0].standings.data[0].overall ===
						undefined ? (
							<NoDataFound />
						) : (
							<div>
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
									<tbody className="align-middle">
										{leagueTable.data.data[0].standings.data.map((item) => (
											<tr key={item.position} className={styles.table_border}>
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
														href={`/team/${getSlugify(item?.team?.data.name)}/${
															item?.team?.data.id
														}`}
														className="text_black overflow_576_max"
													>
														<Image
															className={styles.league__logo}
															loader={() => item.team.data.logo_path}
															src={item?.team?.data?.logo_path}
															alt="League Logo"
															width={40}
															height={40}
														/>
														<span>{item?.team_name}</span>
													</Link>
												</td>
												<td>{item?.overall?.games_played}</td>
												<td> {item?.overall?.won}</td>
												<td> {item?.overall?.draw}</td>
												<td> {item?.overall?.lost}</td>
												<td> {item?.overall?.goals_scored}</td>
												<td> {item?.overall?.goals_against}</td>
												<td>
													{item?.overall?.goals_scored -
														item?.overall?.goals_against}
												</td>
												<td> {item?.overall?.points}</td>
											</tr>
										))}
									</tbody>
								</Table>

								<div className={styles.color__table}>
									{colorArr.map((item, index) => (
										<div className="color_div" key={index}>
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
						)}
					</div>
				);
			}
		}
	}
}
