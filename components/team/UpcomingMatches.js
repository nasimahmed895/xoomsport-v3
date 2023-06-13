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

export default function UpcomingMatches({ singleTeam }) {
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
			toast.warn("Please Signin Before Add Favorites!", {
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

	return (
		<div className={styles.up_coming_match__wrapper}>
			{singleTeam.upcoming.data.length > 0 ? (
				singleTeam.upcoming.data.map((match) => (
					<div key={match.id} className={styles.up_coming_match__fixture}>
						<div className={styles.up_coming_match__date}>
							<span className="text-uppercase">
								{moment
									.utc(match.time.starting_at.date_time)
									.local()
									.format("ddd, DD MMMM")}
							</span>
						</div>
						<div className=" m-auto pb-3 position-relative">
							<Link
								href={`/match/preview/${getSlugify(
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
										<div>
											<div className={styles.match__timestamp}>
												<span className={styles.match__time}>
													{moment
														.utc(match.time.starting_at.date_time)
														.local()
														.format("HH:mm")}
												</span>
											</div>
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
				<NoDataFound data="No Upcoming Match Available!" />
			)}
		</div>
	);
}
