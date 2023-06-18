import styles from "@/styles/home/Fixture.module.css";
import { xoomSportUrl } from "@/utils/api/getAxios";
import getMonth from "@/utils/getMonth";
import getShortForm from "@/utils/getShortForm";
import getSlugify from "@/utils/getSlugify";
import Cookies from "js-cookie";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { FiChevronRight } from "react-icons/fi";
import NoFavoriteFound from "../NoFavoriteFound";

export default function FavoriteMatches({ matches }) {
	const userFavoritesRefs = useRef([]);

	// Handle User favorite
	const handleUserfavorite = (
		i,
		status = "",
		id = "",
		provider = "",
		team = ""
	) => {
		if (Cookies.get("userToken")) {
			console.log(status);
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

	const live_status = ["LIVE", "HT", "ET", "BREAK"];
	const finishe_status = ["FT", "AET", "FT_PEN"];
	const all_status = [...live_status, ...finishe_status];

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

	if (matches == 0) {
		return (
			<NoFavoriteFound
				item="matches"
				data="You haven't any matches in your favorite"
			/>
		);
	} else {
		return (
			<div>
				{matches.map((item) => (
					<div key={item}>
						<Link
							href={`/league/${getSlugify(item?.league?.data?.name)}/${
								item?.league?.data?.id
							}`}
							className="text-dec-none"
						>
							<div className={`${styles.fixture__heading} rotate_main`}>
								<h6 className={styles.fixture__title}>
									{item?.league?.data?.name}
								</h6>
								<FiChevronRight className={styles.right_arrow__icon} />
							</div>
						</Link>
						<div className={styles.fixtures__wrapper}>
							<Link
								href={`/match/${
									all_status.includes(item?.time?.status)
										? "details"
										: "preview"
								}/${getSlugify(item?.localTeam?.data?.name)}-vs-${getSlugify(
									item?.visitorTeam?.data?.name
								)}/${item?.id}`}
								className="text-dec-none"
							>
								<div className="pt-2 pb-2">
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
												{getShortForm(item?.time?.status)}
											</span>

											<Image
												className={styles.league__logo}
												loader={() => item?.localTeam?.data?.logo_path}
												src={item?.localTeam?.data?.logo_path}
												alt="League Logo"
												width={25}
												height={25}
												unoptimized={true}
											/>
											<span
												className={`${styles.team__title} font-helvetica-medium`}
											>
												{item?.localTeam?.data?.name}
											</span>
										</Col>

										<Col lg={3} md={3} sm={3} xs={2} className="p-0">
											<div className={styles.match__timestamp}>
												{matchTimeStamp(
													item?.time?.status,
													item?.scores?.localteam_score,
													item?.scores?.visitorteam_score,
													item?.time?.minute,
													item?.time?.starting_at?.date,
													item?.time?.starting_at?.date_time
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
												loader={() => item?.visitorTeam?.data?.logo_path}
												src={item?.visitorTeam?.data?.logo_path}
												alt="League Logo"
												width={25}
												height={25}
												unoptimized={true}
											/>
											<span
												className={`${styles.team__title} font-helvetica-medium`}
											>
												{item?.visitorTeam?.data?.name}
											</span>
										</Col>
									</Row>
								</div>
							</Link>
							<div
								data-status="active"
								className={styles.favorite_icon__design}
								ref={(el) =>
									(userFavoritesRefs.current[item.id + "active"] = el)
								}
								onClick={() =>
									handleUserfavorite(item.id, 0, item.id, "matches", item)
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
									(userFavoritesRefs.current[item.id + "inactive"] = el)
								}
								onClick={() =>
									handleUserfavorite(item.id, 1, item.id, "matches", item)
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
						</div>
					</div>
				))}
			</div>
		);
	}
}
