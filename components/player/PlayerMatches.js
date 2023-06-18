import styles from "@/styles/player/PlayerMatches.module.css";
import axios, { xoomSportUrl } from "@/utils/api/getAxios";
import getShortName from "@/utils/getShortName";
import getSlugify from "@/utils/getSlugify";
import Cookies from "js-cookie";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import FixtureListShimmer from "../shimmer/home/FixtureListShimmer";

export default function PlayerMatches({ singlePlayer }) {
	const userFavoritesRefs = useRef([]);

	const live_status = ["LIVE", "HT", "ET", "BREAK"];
	const finishe_status = ["FT", "AET", "FT_PEN"];
	const all_status = [...live_status, ...finishe_status];

	const fixtures_ids = singlePlayer?.lineups?.data
		.slice(0)
		.reverse()
		.map((team) => team.fixture_id)
		.slice(0, 30);

	const {
		isLoading,
		data: playerFixtures,
		isError,
		error,
	} = useQuery(`player-fixtures-${singlePlayer?.player_id}`, async () => {
		return await axios.get(
			`fixtures/multi/${fixtures_ids}?include=localTeam.country,visitorTeam.country,league.country,lineup.player`
		);
	});

	const { isLoading: isLoading1, data: favorite } = useQuery(
		"user-favorites",
		async () => {
			return await xoomSportUrl.post(`/api/v1/favorite_id`);
		}
	);

	const getData = (arr, goals = 0, rating = 0, min = 0) => {
		const [data] = arr.filter(
			(team) => team.player_id == singlePlayer?.player_id
		);

		if (goals) {
			return data?.stats?.goals?.scored;
		}
		if (rating) {
			return data?.stats?.rating;
		}
		if (min) {
			return data?.stats?.other?.minutes_played;
		}
	};

	// Handle User Favorite
	const handleUserfavorite = (
		i,
		status = "",
		id = "",
		provider = "",
		team = ""
	) => {
		if (Cookies.get("userToken")) {
			if (status) {
				userFavoritesRefs.current[i + "inactive"].style.display = "none";
				userFavoritesRefs.current[i + "active"].style.display = "block";
				xoomSportUrl.post("/api/v1/favorite/create", {
					provider: provider,
					data: JSON.stringify(team),
					id: id,
				});
			} else {
				userFavoritesRefs.current[i + "inactive"].style.display = "block";
				userFavoritesRefs.current[i + "active"].style.display = "none";
				xoomSportUrl.post("/api/v1/favorite_destroy", {
					provider: provider,
					id: id,
				});
			}
		} else {
			toast.info("Please Signin Before Add Favorites!", {
				theme: "dark",
			});
		}
	};

	// Render User Favorite Icon
	const checkUserFavorite = (id, team) => {
		if (Cookies.get("userToken")) {
			if (!isLoading) {
				if (favorite?.data?.matches?.data.includes(id)) {
					return (
						<>
							<div
								data-status="active"
								className={styles.favorite_icon__design}
								ref={(el) =>
									(userFavoritesRefs.current[team.id + "active"] = el)
								}
								onClick={() =>
									handleUserfavorite(team.id, 0, id, "matches", team)
								}
							>
								<Image
									src="/star_full_red.png"
									alt="Favorite Logo"
									width={200}
									height={200}
									className="star"
								/>
							</div>
							<div
								data-status="inactive"
								className={`${styles.favorite_icon__design} ${styles.inactive_favorite}`}
								ref={(el) =>
									(userFavoritesRefs.current[team.id + "inactive"] = el)
								}
								onClick={() =>
									handleUserfavorite(team.id, 1, id, "matches", team)
								}
							>
								<Image
									src="/star_black.png"
									alt="Favorite Logo"
									width={200}
									height={200}
									className="star"
								/>
							</div>
						</>
					);
				} else {
					return (
						<>
							<div
								data-status="active"
								className={`${styles.favorite_icon__design} ${styles.inactive_favorite}`}
								ref={(el) =>
									(userFavoritesRefs.current[team.id + "active"] = el)
								}
								onClick={() =>
									handleUserfavorite(team.id, 0, id, "matches", team)
								}
							>
								<Image
									src="/star_full_red.png"
									alt="Favorite Logo"
									width={200}
									height={200}
									className="star"
								/>
							</div>
							<div
								data-status="inactive"
								className={styles.favorite_icon__design}
								ref={(el) =>
									(userFavoritesRefs.current[team.id + "inactive"] = el)
								}
								onClick={() =>
									handleUserfavorite(team.id, 1, id, "matches", team)
								}
							>
								<Image
									src="/star_black.png"
									alt="Favorite Logo"
									width={200}
									height={200}
									className="star"
								/>
							</div>
						</>
					);
				}
			}
		} else {
			return (
				<div
					data-status="unauthenticate"
					className={styles.favorite_icon__design}
					onClick={() => handleUserfavorite(team.id, "", "", "", "")}
				>
					<Image
						src="/star_black.png"
						alt="Favorite Logo"
						width={300}
						height={300}
						className="star"
					/>
				</div>
			);
		}
	};

	if (isLoading) {
		return <FixtureListShimmer />;
	} else {
		return (
			<div className="player_matches__container ">
				{playerFixtures.data.data
					.sort(
						(a, b) =>
							new Date(b?.time?.starting_at?.date) -
							new Date(a?.time?.starting_at?.date)
					)
					.map((fixture) => (
						<div key={fixture?.id} className="single__match">
							<div className={styles.league_details__wrapper}>
								<div className={styles.league_details__text}>
									<div>
										<Image
											className={styles.league__logo}
											loader={() => fixture?.league?.data?.logo_path}
											src={fixture?.league?.data?.logo_path}
											alt="League Logo"
											width={30}
											height={30}
											unoptimized={true}
										/>
									</div>
									<div>
										<Link
											href={`/league/${getSlugify(
												fixture?.league?.data?.name
											)}/${fixture?.league?.data?.id}`}
											className="text-dec-none"
										>
											<h6 className={styles.league__title}>
												{fixture?.league?.data?.name}
											</h6>
										</Link>
									</div>
								</div>
								<div className={styles.season_list}>
									<span>
										{moment
											.utc(fixture?.time?.starting_at?.date_time)
											.local()
											.format("DD-MMM-YYYY")}
									</span>
								</div>
							</div>
							<div className={styles.fixtures__wrapper}>
								<Link
									href={`/match/${
										all_status.includes(fixture?.time?.status)
											? "details"
											: "preview"
									}/${getSlugify(
										fixture?.localTeam?.data?.name
									)}-vs-${getSlugify(fixture?.visitorTeam?.data?.name)}/${
										fixture?.id
									}`}
									className="text-dec-none "
								>
									<div className={`${styles.fextures_table} py-2 mb-3`}>
										<Row className={styles.league_fixtures_container}>
											<Col
												lg={5}
												md={5}
												sm={5}
												xs={5}
												className="d-flex align-items-center justify-content-center"
											>
												<span className={styles.league__status}>
													{fixture?.time?.status}
												</span>

												<Image
													className={styles.league__logo}
													loader={() => fixture?.localTeam?.data?.logo_path}
													src={fixture?.localTeam?.data?.logo_path}
													alt="Team Logo"
													width={30}
													height={30}
													unoptimized={true}
												/>
												<span className={styles.team__title}>
													{getShortName(
														fixture?.localTeam?.data?.name,
														fixture?.localTeam?.data?.short_code
													)}
												</span>
											</Col>
											<Col lg={2} md={2} sm={2} xs={2} className="p-0">
												<div className={styles.match__timestamp}>
													<span className={styles.match__score}>
														{fixture.scores.localteam_score} -{" "}
														{fixture.scores.visitorteam_score}
													</span>
												</div>
											</Col>
											<Col
												lg={5}
												md={5}
												sm={5}
												xs={5}
												className="align-items-center d-flex"
											>
												<Image
													className={styles.league__logo}
													loader={() => fixture.visitorTeam.data.logo_path}
													src={fixture.visitorTeam.data.logo_path}
													alt="Team Logo"
													width={30}
													height={30}
												/>
												<span className={styles.team__title}>
													{getShortName(
														fixture?.visitorTeam?.data?.name,
														fixture?.visitorTeam?.data?.short_code
													)}
												</span>
											</Col>
										</Row>
									</div>
								</Link>
								<div className={styles.favorite_icon__design}>
									{checkUserFavorite(fixture?.id, fixture)}
								</div>
								<div className={styles.goal__rating}>
									<div className={styles.goal__icon}>
										<Image
											src="/ball_logo.png"
											alt="Ball Logo"
											width={30}
											height={30}
										/>
										<span>
											{getData(fixture.lineup.data, 1)
												? getData(fixture.lineup.data, 1)
												: 0}
										</span>
									</div>
									<div className={styles.rating__wrapper}>
										<div className={styles.minute__status}>
											<span className="minute__key">Min</span>
											<span className="minute__value">
												{getData(fixture.lineup.data, 0, 0, 1)
													? getData(fixture.lineup.data, 0, 0, 1) + "'"
													: "-"}
											</span>
										</div>
										<div
											className={`${styles.rating__status} ${styles.single_activity__rating}`}
										>
											<span className="rating__value">
												{getData(fixture.lineup.data, 0, 1)
													? getData(fixture.lineup.data, 0, 1)
													: "-"}
											</span>
											<span className="rating__key">Rating</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
			</div>
		);
	}
}
