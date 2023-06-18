import styles from "@/styles/match/MatchHeadToHead.module.css";
import axios, { xoomSportUrl } from "@/utils/api/getAxios";
import getSlugify from "@/utils/getSlugify";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import NoDataFound from "../NoDataFound";

export default function MatchHeadToHead({ local_id, visitor_id }) {
	const userFavoritesRefs = useRef([]);

	const {
		isLoading,
		data: headtohead,
		isError,
		error,
	} = useQuery(`head2head-${local_id}-${visitor_id}`, async () => {
		return await axios.get(
			`head2head/${local_id}/${visitor_id}?include=localTeam,visitorTeam,league,venue,referee`
		);
	});

	const { isLoading: isLoading1, data: favorite } = useQuery(
		"user-favorites",
		async () => {
			return await xoomSportUrl.post(`/api/v1/favorite_id`);
		}
	);

	// Handle User favorite
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

	if (
		isLoading ||
		isError ||
		headtohead.data.data.length == 0 ||
		headtohead.data.data === undefined
	) {
		return <NoDataFound />;
	} else {
		return (
			<div className={`${styles.league_fixtures__container}`}>
				<div className={`${styles.fixture_title__heading}`}>
					<div className={styles.league_fixtures_container}>
						<h6 className={styles.fixture__title}>Recent Encounters</h6>
					</div>
				</div>
				<div>
					<div className="league_fixtures_by__date">
						{headtohead.data.data.map((item) => (
							<>
								<div className={`${styles.fixture_date__heading}`}>
									<div className={styles.league_fixtures_container}>
										<h6 className={styles.fixture_date__title}>
											{item.time.starting_at.date}
										</h6>
									</div>
								</div>
								<div className={styles.fixtures__wrapper}>
									<Link
										href={`/match/details/${getSlugify(
											item.localTeam.data.name
										)}-vs-${getSlugify(item.visitorTeam.data.name)}/${item.id}`}
										className="text-dec-none"
									>
										<div className={`${styles.fextures_table} py-2`}>
											<Row className={styles.league_fixtures_container}>
												<Col
													lg={5}
													md={5}
													sm={5}
													xs={5}
													className={`align-items-center brack_word  d-flex `}
												>
													<span className={styles.league__status}>
														{item.time.status}
													</span>

													<Image
														className={styles.league__logo}
														loader={() => item.localTeam.data.logo_path}
														src={item.localTeam.data.logo_path}
														alt="League Logo"
														width={25}
														height={25}
													/>
													<span className={styles.league__title}>
														{item.localTeam.data.name}
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
														<span className={styles.match__score}>
															{item.scores.localteam_score} -{" "}
															{item.scores.visitorteam_score}
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
														loader={() => item.visitorTeam.data.logo_path}
														src={item.visitorTeam.data.logo_path}
														alt="League Logo"
														width={25}
														height={25}
													/>
													<span className={styles.league__title}>
														{item.visitorTeam.data.name}
													</span>
												</Col>
											</Row>
										</div>
									</Link>
									<div className={styles.favorite_icon__design}>
										{checkUserFavorite(item?.id, item)}
									</div>
								</div>
							</>
						))}
					</div>
				</div>
			</div>
		);
	}
}
