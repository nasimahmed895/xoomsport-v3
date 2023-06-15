import styles from "@/styles/home/Fixture.module.css";
import axios, { xoomSportUrl } from "@/utils/api/getAxios";
import getMonth from "@/utils/getMonth";
import getShortForm from "@/utils/getShortForm";
import getShortName from "@/utils/getShortName";
import getSlugify from "@/utils/getSlugify";
import Cookies from "js-cookie";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FiChevronRight } from "react-icons/fi";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import FixtureListShimmer from "../shimmer/home/FixtureListShimmer";
import MobilePopUp from "./MobilePopUp";

export default function FixtureList({ pickrDate }) {
	const [toaste, setToaste] = useState(false);
	const [loading, setLoading] = useState(true);
	const [fixtureList, setFixtureList] = useState([]);
	const userFavoritesRefs = useRef([]);

	const { isLoading, data: favorite } = useQuery("user-favorites", async () => {
		return await xoomSportUrl.post(`/api/v1/favorite_id`);
	});

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
			// toast.warn("Please Signin Before Add Favorites!", {
			// 	theme: "dark",
			// });
			setToaste(true);
			setTimeout(() => setToaste(false), 4000);
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

	useEffect(() => {
		setLoading(true);

		if (pickrDate) {
			axios
				.get(
					`fixtures/date/${pickrDate}?include=localTeam,visitorTeam,league,venue,referee`
				)
				.then((res) => {
					setFixtureList(res?.data?.data);
					setLoading(false);
				})
				.catch((err) => {
					setLoading(true);
					toast.warn("Please check your internet connetion or try again!", {
						theme: "dark",
					});
				});
		} else {
			axios
				.get(`livescores?include=localTeam,visitorTeam,league,venue,referee`)
				.then((res) => {
					setFixtureList(res?.data?.data);
					setLoading(false);
				})
				.catch((err) => {
					setLoading(true);
					toast.warn("Please check your internet connetion or try again!", {
						theme: "dark",
					});
				});
		}
	}, [pickrDate]);

	const live_status = ["LIVE", "HT", "ET", "BREAK"];
	const finishe_status = ["FT", "AET", "FT_PEN"];
	const all_status = [...live_status, ...finishe_status];
	let groupBy = {};
	if (fixtureList !== undefined) {
		const live_matches = fixtureList.filter((match) =>
			live_status.includes(match?.time?.status)
		);

		if (pickrDate) {
			for (let i = 0; i < fixtureList.length; i++) {
				let make = fixtureList[i].league_id;
				if (groupBy[make] == null) groupBy[make] = [];
				groupBy[make].push(fixtureList[i]);
			}
		} else {
			for (let i = 0; i < live_matches.length; i++) {
				let make = live_matches[i].league_id;
				if (groupBy[make] == null) groupBy[make] = [];
				groupBy[make].push(live_matches[i]);
			}
		}
	} else {
		toast.warn("Please check your internet connetion or try again!", {
			theme: "dark",
		});
	}

	const matchTimeStamp = (
		status,
		lc = "",
		vc = "",
		minute = "",
		date = "",
		datetime = ""
	) => {
		if (finishe_status.includes(status)) {
			return (
				<span className={styles.match__score}>
					{lc} - {vc}
				</span>
			);
		} else if (live_status.includes(status)) {
			return (
				<>
					<span className={styles.match__date}>
						{minute}
						<span className={styles.live__indicator}>{'"'}</span>
					</span>
					<span className={styles.match__time}>
						{lc} - {vc}
					</span>
				</>
			);
		} else {
			return (
				<>
					<span className={styles.match__date}>
						{date.slice(8, 10)} {getMonth(date)}
					</span>
					<span className={styles.match__time}>
						{moment.utc(datetime).local().format("HH:mm")}
					</span>
				</>
			);
		}
	};

	if (loading || fixtureList == undefined) {
		return <FixtureListShimmer />;
	} else {
		if (JSON.stringify(groupBy) === "{}") {
			return (
				<div className={styles.match__not_found}>
					<Image
						src="/vector_matches_fav.png"
						alt="Not Found Logo"
						width={300}
						height={300}
					/>
					<p>
						Unfortunately, there are no live matches happening at the moment.
						Please check back later. See you soon!
					</p>
				</div>
			);
		} else {
			return (
				<>
					{toaste ? (
						<MobilePopUp
							text={"To Add Favorite, please login or register first."}
						/>
					) : (
						""
					)}
					{Object.keys(groupBy).map((item, i) => {
						return (
							<div key={i}>
								<Link
									href={`/league/${getSlugify(
										groupBy[item][0]?.league?.data?.name
									)}/${groupBy[item][0]?.league?.data?.id}`}
									className="text-dec-none"
								>
									<div className={`${styles.fixture__heading} rotate_main`}>
										<h6 className={styles.fixture__title}>
											{groupBy[item][0]?.league?.data?.name}
										</h6>
										<FiChevronRight className={styles.right_arrow__icon} />
									</div>
								</Link>
								{groupBy[item].map((team, index) => (
									<div key={team.id} className={styles.fixtures__wrapper}>
										<Link
											href={`/match/${all_status.includes(groupBy[item][index]?.time?.status)
													? "details"
													: "preview"
												}/${getSlugify(
													team?.localTeam?.data?.name
												)}-vs-${getSlugify(team?.visitorTeam?.data?.name)}/${team?.id
												}`}
											key={team?.id}
											className="text-dec-none"
										>
											<div
												className={`${styles.fixture__content} rotate_main ${index > 0 ? "mt-1" : ""
													}`}
											>
												<Row
													className={`w-100 align-items-center ${styles.fixture__content_row} ${styles.rotate_main_row}`}
												>
													<Col
														lg={4}
														md={4}
														sm={4}
														xs={5}
														className="d-flex align-items-center"
													>
														<span
															className={`${styles.match__status} font-helvetica-medium`}
														>
															{getShortForm(team?.time?.status)}
														</span>

														<Image
															className={styles.league__logo}
															loader={() => team?.localTeam?.data?.logo_path}
															src={team?.localTeam?.data?.logo_path}
															alt="League Logo"
															width={25}
															height={25}
															unoptimized={true}
														/>
														<span
															className={`${styles.team__title} font-helvetica-medium`}
														>
															{getShortName(
																team?.localTeam?.data?.name,
																team?.localTeam?.data?.short_code
															)}
														</span>
													</Col>

													<Col lg={3} md={3} sm={3} xs={2} className="p-0">
														<div className={styles.match__timestamp}>
															{matchTimeStamp(
																groupBy[item][index]?.time?.status,
																groupBy[item][index]?.scores?.localteam_score,
																groupBy[item][index]?.scores?.visitorteam_score,
																groupBy[item][index]?.time?.minute,
																groupBy[item][index]?.time?.starting_at?.date,
																groupBy[item][index]?.time?.starting_at
																	?.date_time
															)}
														</div>
													</Col>

													<Col
														lg={4}
														md={4}
														sm={4}
														xs={5}
														className="d-flex align-items-center"
													>
														<Image
															className={styles.league__logo}
															loader={() => team?.visitorTeam?.data?.logo_path}
															src={team?.visitorTeam?.data?.logo_path}
															alt="League Logo"
															width={25}
															height={25}
															unoptimized={true}
														/>
														<span
															className={`${styles.team__title} font-helvetica-medium`}
														>
															{getShortName(
																team?.visitorTeam?.data?.name,
																team?.visitorTeam?.data?.short_code
															)}
														</span>
													</Col>
												</Row>
											</div>
										</Link>
										<div id="Favorite_item">
											{checkUserFavorite(team?.id, team)}
										</div>
									</div>
								))}
							</div>
						);
					})}
					<Script
						async="async"
						data-cfasync="false"
						src="//pl19705711.highrevenuegate.com/adc776e4feb8fe47f8b01cad883134cf/invoke.js"
					></Script>
					<div id="container-adc776e4feb8fe47f8b01cad883134cf"></div>
					<div className="responsive_bottom"></div>
				</>
			);
		}
	}
}
