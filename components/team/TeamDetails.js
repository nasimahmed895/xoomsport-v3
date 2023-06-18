import NoDataFound from "@/components/NoDataFound";
import styles from "@/styles/team/TeamDetails.module.css";
import { xoomSportUrl } from "@/utils/api/getAxios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";
import { Nav, Tab } from "react-bootstrap";
import { FaRegBell } from "react-icons/fa";
import { HiArrowLeft } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import TeamMatches from "./TeamMatches";
import TeamOverview from "./TeamOverview";
import TeamPointTable from "./TeamPointTable";
import TeamSquad from "./TeamSquad";
import TeamStats from "./TeamStats";
import TeamTrophies from "./TeamTrophies";

export default function TeamDetails({ singleTeam, userToken }) {
	const router = useRouter();
	const doRedFavorite = useRef(null);
	const doWhiteFavorite = useRef(null);
	const undoRedFavorite = useRef(null);
	const undoWhiteFavorite = useRef(null);

	const {
		isLoading,
		data: favorite,
		isError,
		error,
	} = useQuery(`favorite_select_team`, async () => {
		return await xoomSportUrl.post(`/api/v1/favorite_id`);
	});

	// Favorite Red Action (Responsive)
	const favoriteRedAction = (e, status, league, provider, id) => {
		if (userToken) {
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
	const selectRedFavorite = (id, team) => {
		if (userToken) {
			if (favorite?.data?.teams?.data.includes(id)) {
				return (
					<>
						<div
							className={styles.mobile_top_favorite}
							ref={undoRedFavorite}
							onClick={(e) => favoriteRedAction(e, 0, team, "team", id)}
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
							onClick={(e) => favoriteRedAction(e, 1, team, "team", id)}
							style={{ display: "none" }}
						>
							<Image
								src="/star_red.png"
								alt="Not Found Logo"
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
							onClick={(e) => favoriteRedAction(e, 0, team, "team", id)}
							style={{ display: "none" }}
						>
							<Image
								src="/star_full_red.png"
								alt="Not Found Logo"
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
							onClick={(e) => favoriteRedAction(e, 1, team, "team", id)}
						>
							<Image
								src="/star_red.png"
								alt="Not Found Logo"
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
						onClick={(e) => favoriteRedAction(e, 0, team, "team", id)}
						style={{ display: "none" }}
					>
						<Image
							src="/star_full_red.png"
							alt="Not Found Logo"
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
						onClick={(e) => favoriteRedAction(e, 1, team, "team", id)}
					>
						<Image
							src="/star_red.png"
							alt="Not Found Logo"
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
							onClick={(e) => favoriteWhiteAction(e, 0, league, "team", id)}
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
							onClick={(e) => favoriteWhiteAction(e, 1, league, "team", id)}
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
							onClick={(e) => favoriteWhiteAction(e, 0, league, "team", id)}
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
							onClick={(e) => favoriteWhiteAction(e, 1, league, "team", id)}
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
						onClick={(e) => favoriteWhiteAction(e, 0, league, "team", id)}
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
						onClick={(e) => favoriteWhiteAction(e, 1, league, "team", id)}
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

	if (singleTeam.length == 0 || singleTeam == undefined) {
		return <NoDataFound />;
	} else {
		return (
			<Tab.Container defaultActiveKey="overview">
				<div className={styles.top__nav}>
					<div>
						<HiArrowLeft
							className="backArrowBtn"
							onClick={() => router.back()}
						/>
					</div>
					<div className="d-flex align-items-center me-3">
						<FaRegBell className={styles.notification_icon_mobile} />
						{selectRedFavorite(singleTeam?.id, singleTeam)}
					</div>
				</div>

				<div className="container_clip_path_web_content1">
					<div className={styles.league_details__heading}>
						<div className={styles.league_details__content}>
							<div className={styles.league_details__text}>
								<div>
									<Image
										className={styles.league__logo}
										loader={() => singleTeam.logo_path}
										src={singleTeam.logo_path}
										alt="League Logo"
										width={40}
										height={40}
									/>
								</div>
								<div>
									<h6 className={styles.league__title}>{singleTeam.name}</h6>
									<span className={styles.league__country}>
										{singleTeam.country.data.name}
									</span>
								</div>
							</div>
							<div className="d-flex align-items-center">
								<div className={styles.web_favorite_icon}>
									{selectWhiteFavorite(singleTeam?.id, singleTeam)}
								</div>
								<IoNotificationsOutline
									className={styles.notification_icon_web}
								/>
							</div>
						</div>
					</div>

					<Nav className={styles.league_details_tab__heading}>
						<Nav.Item className="ms-1">
							<Nav.Link
								eventKey="overview"
								className={styles.league_details_tab__link}
							>
								Overview
							</Nav.Link>
						</Nav.Item>
						<Nav.Item className="ms-1">
							<Nav.Link
								eventKey="matches"
								className={styles.league_details_tab__link}
							>
								Matches
							</Nav.Link>
						</Nav.Item>
						<Nav.Item className="ms-1">
							<Nav.Link
								eventKey="table"
								className={styles.league_details_tab__link}
							>
								Table
							</Nav.Link>
						</Nav.Item>
						<Nav.Item className="ms-1">
							<Nav.Link
								eventKey="stats"
								className={styles.league_details_tab__link}
							>
								Stats
							</Nav.Link>
						</Nav.Item>
						<Nav.Item className="ms-1">
							<Nav.Link
								eventKey="trophies"
								className={styles.league_details_tab__link}
							>
								Trophies
							</Nav.Link>
						</Nav.Item>
						<Nav.Item className="ms-1">
							<Nav.Link
								eventKey="squad"
								className={styles.league_details_tab__link}
							>
								Squad
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</div>

				<Tab.Content>
					<Tab.Pane eventKey="overview">
						<TeamOverview singleTeam={singleTeam} userToken={userToken} />
					</Tab.Pane>
					<Tab.Pane eventKey="matches">
						<TeamMatches singleTeam={singleTeam} />
					</Tab.Pane>
					<Tab.Pane eventKey="table">
						<TeamPointTable singleTeam={singleTeam} />
					</Tab.Pane>
					<Tab.Pane eventKey="stats">
						<TeamStats singleTeam={singleTeam} />
					</Tab.Pane>
					<Tab.Pane eventKey="trophies">
						<TeamTrophies team_id={singleTeam.id} />
					</Tab.Pane>
					<Tab.Pane eventKey="squad">
						<TeamSquad singleTeam={singleTeam} />
					</Tab.Pane>
				</Tab.Content>
			</Tab.Container>
		);
	}
}
