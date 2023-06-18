import styles from "@/styles/team/TeamMatches.module.css";
import { xoomSportUrl } from "@/utils/api/getAxios";
import getShortForm from "@/utils/getShortForm";
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
import NoDataFound from "../NoDataFound";

export default function RecentMatches({ singleTeam }) {
	const userFavoritesRefs = useRef([]);

	const {
		isLoading,
		data: favorite,
		isError,
		error,
	} = useQuery(`favorite_select_id`, async () => {
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

	const detectClickedElement = (e, team, provider, id) => {
		if (Cookies.get("userToken")) {
			const data = e.target.getAttribute("data-status");
			if (data == "active") {
				xoomSportUrl
					.post("/api/v1/favorite_destroy", {
						provider: provider,
						id: id,
					})
					.then((res) =>
						toast.success(res.data.message, {
							theme: "dark",
						})
					);
				event.target.setAttribute("data-status", "inactive");
				e.target.style =
					"filter: invert(8%) sepia(9%) saturate(7%) hue-rotate(314deg) brightness(103%) contrast(100%);";
			} else {
				xoomSportUrl
					.post("/api/v1/favorite/create", {
						provider: provider,
						data: JSON.stringify(team),
						id: id,
					})
					.then((res) =>
						toast.success(res.data.message, {
							theme: "dark",
						})
					);
				event.target.setAttribute("data-status", "active");
				e.target.style =
					"filter: invert(35%) sepia(92%) saturate(5572%) hue-rotate(349deg) brightness(87%) contrast(136%)";
			}
		} else {
			toast.info("Please Login then Add to Favorite!", {
				theme: "dark",
			});
		}
	};

	function selectFavoriteList(id, team) {
		if (Cookies.get("userToken")) {
			if (favorite?.data?.matches?.data.includes(id)) {
				return (
					<div
						data-status="active"
						className={styles.favorite_icon__design}
						onClick={(e) => detectClickedElement(e, team, "matches", id)}
					>
						<Image
							src="/static/Icons/star_red.png"
							alt="Not Found Logo"
							width={200}
							height={200}
							data-status="active"
							className="star"
						/>
					</div>
				);
			} else {
				return (
					<div
						data-status="inactive"
						className={styles.favorite_icon__design}
						onClick={(e) => detectClickedElement(e, team, "matches", id)}
					>
						<Image
							src="/static/Icons/star.png"
							alt="Not Found Logo"
							width={200}
							height={200}
							data-status="inactive"
							className="star"
						/>
					</div>
				);
			}
		} else {
			return (
				<div
					data-status="inactive"
					className={styles.favorite_icon__design}
					onClick={(e) => detectClickedElement(e, team, "matches", id)}
				>
					<Image
						src="/static/Icons/star.png"
						alt="Not Found Logo"
						width={200}
						height={200}
						data-status="inactive"
						className="star"
					/>
				</div>
			);
		}
	}

	return (
		<div className={styles.up_coming_match__wrapper}>
			{singleTeam?.latest?.data.length > 0 ? (
				singleTeam?.latest?.data.map((match) => (
					<div key={match.id} className={styles.up_coming_match__fixture}>
						<div className={styles.up_coming_match__date}>
							<span className="text-uppercase">
								{moment
									.utc(match.time.starting_at.date_time)
									.local()
									.format("ddd, DD MMMM")}
							</span>
						</div>
						<div className="m-auto pb-3 position-relative">
							<Link
								href={`/match/details/${getSlugify(
									match.localTeam.data.name
								)}-vs-${getSlugify(match.visitorTeam.data.name)}/${match.id}`}
								className="text-dec-none"
							>
								<Row className="align-items-center">
									<Col md={5} className="col-5">
										<div className="d-flex align-items-center">
											<span className={styles.league__status}>
												{getShortForm(match?.time?.status)}
											</span>

											<div className="d-flex align-items-center">
												<Image
													className={styles.league__logo}
													loader={() => match.localTeam.data.logo_path}
													src={match.localTeam.data.logo_path}
													alt="Team Logo"
													width={40}
													height={40}
												/>
												<span className={styles.league__title}>
													{getShortName(
														match?.localTeam?.data?.name,
														match?.localTeam?.data?.short_code
													)}
												</span>
											</div>
										</div>
									</Col>
									<Col md={2} className="col-2">
										<div
											className={`${styles.match__timestamp}  ${
												match.scores.localteam_score ==
												match.scores.visitorteam_score
													? styles.match_draw__bg
													: singleTeam.id == match.localTeam.data.id
													? match.scores.localteam_score >
													  match.scores.visitorteam_score
														? styles.match_win__bg
														: styles.match_loss__bg
													: match.scores.visitorteam_score >
													  match.scores.localteam_score
													? styles.match_win__bg
													: styles.match_loss__bg
											}`}
										>
											<span className={`${styles.match__time}`}>
												{match.scores.localteam_score} -{" "}
												{match.scores.visitorteam_score}
											</span>
										</div>
									</Col>
									<Col md={5} className="col-5">
										<div className="d-flex align-items-center">
											<Image
												className={styles.league__logo}
												loader={() => match.visitorTeam.data.logo_path}
												src={match.visitorTeam.data.logo_path}
												alt="Team Logo"
												width={40}
												height={40}
											/>
											<span className={styles.league__title}>
												{getShortName(
													match?.visitorTeam?.data?.name,
													match?.visitorTeam?.data?.short_code
												)}
											</span>
										</div>
									</Col>
								</Row>
							</Link>
							<div id="Favorite_item" className={styles.favorite_icon}>
								{checkUserFavorite(match?.id, match)}
							</div>
						</div>
					</div>
				))
			) : (
				<NoDataFound data="No Recent Match Available!" />
			)}
		</div>
	);
}
