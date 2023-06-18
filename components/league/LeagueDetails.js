import styles from "@/styles/league/LeagueDetails.module.css";
import { xoomSportUrl } from "@/utils/api/getAxios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Form, Nav, Tab } from "react-bootstrap";
import { FaRegBell } from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import FullLeagueTable from "./FullLeagueTable";
import LeagueFixtures from "./LeagueFixtures";
import LeaguePlayerStats from "./LeaguePlayerStats";
import LeagueTeams from "./LeagueTeams";

export default function LeagueDetails({ singleLeague }) {
	const [seasonId, setSeasonId] = useState(singleLeague.current_season_id);
	const doRedFavorite = useRef(null);
	const doWhiteFavorite = useRef(null);
	const undoRedFavorite = useRef(null);
	const undoWhiteFavorite = useRef(null);

	const router = useRouter();

	const {
		isLoading,
		data: favorite,
		isError,
		error,
	} = useQuery("user_favorites", async () => {
		return await xoomSportUrl.post(`/api/v1/favorite_id`);
	});

	// Favorite Red Action (Responsive)
	const favoriteRedAction = (e, status, league, provider, id) => {
		if (Cookies.get("userToken")) {
			if (status) {
				xoomSportUrl.post("/api/v1/favorite/create", {
					provider: provider,
					data: JSON.stringify(league),
					id: id,
				});

				doRedFavorite.current.style.display = "none";
				undoRedFavorite.current.style.display = "block";
			} else {
				xoomSportUrl.post("/api/v1/favorite_destroy", {
					provider: provider,
					id: id,
				});

				doRedFavorite.current.style.display = "block";
				undoRedFavorite.current.style.display = "none";
			}
		} else {
			toast.info("Please Signin Before Add Favorites!", {
				theme: "dark",
			});
		}
	};

	// Select Red Favorite (Responsive)
	const selectRedFavorite = (id, league) => {
		if (Cookies.get("userToken")) {
			if (favorite?.data?.competitions?.data.includes(id)) {
				return (
					<>
						<div
							className={styles.mobile_top_favorite}
							ref={undoRedFavorite}
							onClick={(e) =>
								favoriteRedAction(e, 0, league, "competition", id)
							}
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
							className={styles.mobile_top_favorite}
							ref={doRedFavorite}
							onClick={(e) =>
								favoriteRedAction(e, 1, league, "competition", id)
							}
							style={{ display: "none" }}
						>
							<Image
								src="/star_red.png"
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
							className={styles.mobile_top_favorite}
							ref={undoRedFavorite}
							onClick={(e) =>
								favoriteRedAction(e, 0, league, "competition", id)
							}
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
							className={styles.mobile_top_favorite}
							ref={doRedFavorite}
							onClick={(e) =>
								favoriteRedAction(e, 1, league, "competition", id)
							}
						>
							<Image
								src="/star_red.png"
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
						className={styles.mobile_top_favorite}
						ref={undoRedFavorite}
						onClick={(e) => favoriteRedAction(e, 0, league, "competition", id)}
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
						className={styles.mobile_top_favorite}
						ref={doRedFavorite}
						onClick={(e) => favoriteRedAction(e, 1, league, "competition", id)}
					>
						<Image
							src="/star_red.png"
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

	// Favorite White Action
	const favoriteWhiteAction = (e, status, league, provider, id) => {
		if (Cookies.get("userToken")) {
			if (status) {
				xoomSportUrl.post("/api/v1/favorite/create", {
					provider: provider,
					data: JSON.stringify(league),
					id: id,
				});

				doWhiteFavorite.current.style.display = "none";
				undoWhiteFavorite.current.style.display = "block";
			} else {
				xoomSportUrl.post("/api/v1/favorite_destroy", {
					provider: provider,
					id: id,
				});

				doWhiteFavorite.current.style.display = "block";
				undoWhiteFavorite.current.style.display = "none";
			}
		} else {
			toast.info("Please Signin Before Add Favorites!", {
				theme: "dark",
			});
		}
	};

	// Select White Favorite
	const selectWhiteFavorite = (id, league) => {
		if (Cookies.get("userToken")) {
			if (favorite?.data?.competitions?.data.includes(id)) {
				return (
					<>
						<div
							className={styles.web_favorite}
							ref={undoWhiteFavorite}
							onClick={(e) =>
								favoriteWhiteAction(e, 0, league, "competition", id)
							}
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
							ref={doWhiteFavorite}
							onClick={(e) =>
								favoriteWhiteAction(e, 1, league, "competition", id)
							}
							style={{ display: "none" }}
						>
							<Image
								src="/star_white.png"
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
							ref={undoWhiteFavorite}
							onClick={(e) =>
								favoriteWhiteAction(e, 0, league, "competition", id)
							}
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
							ref={doWhiteFavorite}
							onClick={(e) =>
								favoriteWhiteAction(e, 1, league, "competition", id)
							}
						>
							<Image
								src="/star_white.png"
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
						ref={undoWhiteFavorite}
						onClick={(e) =>
							favoriteWhiteAction(e, 0, league, "competition", id)
						}
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
						ref={doWhiteFavorite}
						onClick={(e) =>
							favoriteWhiteAction(e, 1, league, "competition", id)
						}
					>
						<Image
							src="/star_white.png"
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

	return (
		<Tab.Container defaultActiveKey="league_table">
			<HiArrowLeft className="backArrowBtn" onClick={() => router.back()} />

			{selectRedFavorite(singleLeague?.id, singleLeague)}

			<FaRegBell className={styles.mobile_top_bell} />

			<div className={styles.container_clip_path_web_content}>
				<div className={styles.league_details__heading}>
					<div className={styles.league_details__content}>
						<div className={styles.league_details__text}>
							<div>
								<Image
									className={styles.league__logo}
									loader={() => singleLeague.logo_path}
									src={singleLeague.logo_path}
									alt="League Logo"
									width={0}
									height={0}
									style={{ height: "50px", width: "100%" }}
									sizes="100vw"
								/>
							</div>
							<div>
								<h6 className={styles.league__title}>{singleLeague.name}</h6>
								<span className={styles.league__country}>
									{singleLeague.country.data.name}
								</span>
							</div>
						</div>
						<div className={styles.web_top_favorite}>
							{selectWhiteFavorite(singleLeague?.id, singleLeague)}
						</div>
						<Form.Select
							size="sm"
							className={`${styles.select_style} w-auto ml-5`}
							value={seasonId}
							onChange={(e) => setSeasonId(e.target.value)}
						>
							{singleLeague.seasons.data
								.map((year) => (
									<option key={year.id} value={year.id}>
										{year.name}
									</option>
								))
								.reverse()}
						</Form.Select>
					</div>
				</div>
				<Nav className={styles.league_details_tab__heading}>
					<Nav.Item className="ms-1">
						<Nav.Link
							eventKey="league_table"
							className={styles.league_details_tab__link}
						>
							Standings
						</Nav.Link>
					</Nav.Item>
					<Nav.Item className="ms-1">
						<Nav.Link
							eventKey="fixtures"
							className={styles.league_details_tab__link}
						>
							Fixtures
						</Nav.Link>
					</Nav.Item>
					<Nav.Item className="ms-1">
						<Nav.Link
							eventKey="stats"
							className={styles.league_details_tab__link}
						>
							Player Stats
						</Nav.Link>
					</Nav.Item>
					<Nav.Item className="ms-1">
						<Nav.Link
							eventKey="teams"
							className={styles.league_details_tab__link}
						>
							Teams
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</div>

			<Tab.Content>
				<Tab.Pane eventKey="league_table">
					<FullLeagueTable season_id={seasonId} />
				</Tab.Pane>
				<Tab.Pane eventKey="fixtures">
					<LeagueFixtures season_id={singleLeague.current_season_id} />
				</Tab.Pane>
				<Tab.Pane eventKey="stats">
					<LeaguePlayerStats season_id={seasonId} />
				</Tab.Pane>
				<Tab.Pane eventKey="teams">
					<LeagueTeams season_id={seasonId} />
				</Tab.Pane>
			</Tab.Content>
		</Tab.Container>
	);
}
