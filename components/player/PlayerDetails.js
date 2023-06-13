import styles from "@/styles/player/PlayerDetails.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { Nav, Tab } from "react-bootstrap";
import { HiArrowLeft } from "react-icons/hi";
import PlayerMatches from "./PlayerMatches";
import PlayerProfile from "./PlayerProfile";
import PlayerStats from "./PlayerStats";
import PlayerTransfers from "./PlayerTransfers";

export default function PlayerDetails({ singlePlayer }) {
	const router = useRouter();
	return (
		<Tab.Container defaultActiveKey="profile">
			<HiArrowLeft className="backArrowBtn" onClick={() => router.back()} />
			<div className={styles.container_clip_path_web_content1}>
				<div className={styles.player_details__heading}>
					<div className={styles.league_details__content}>
						<div className={styles.league_details__text}>
							<div>
								<Image
									className={styles.league__logo}
									loader={() => singlePlayer?.image_path}
									src={singlePlayer?.image_path}
									alt="Player Image"
									width={40}
									height={40}
								/>
							</div>
							<div>
								<h6 className={styles.league__title}>
									{singlePlayer?.display_name}
								</h6>
								<span className={styles.league__country}>
									{singlePlayer?.team.data.name}
								</span>
							</div>
						</div>
					</div>
				</div>

				<Nav className={styles.player_details_tab__heading}>
					<Nav.Item className="ms-1">
						<Nav.Link
							eventKey="profile"
							className={styles.league_details_tab__link}
						>
							Profile
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
							eventKey="stats"
							className={styles.league_details_tab__link}
						>
							Stats
						</Nav.Link>
					</Nav.Item>
					<Nav.Item className="ms-1">
						<Nav.Link
							eventKey="transfers"
							className={styles.league_details_tab__link}
						>
							Transfers
						</Nav.Link>
					</Nav.Item>
				</Nav>
			</div>

			<Tab.Content>
				<Tab.Pane eventKey="profile">
					<PlayerProfile singlePlayer={singlePlayer} />
				</Tab.Pane>
				<Tab.Pane eventKey="matches">
					<PlayerMatches singlePlayer={singlePlayer} />
				</Tab.Pane>
				<Tab.Pane eventKey="stats">
					<PlayerStats singlePlayer={singlePlayer} />
				</Tab.Pane>
				<Tab.Pane eventKey="transfers">
					<PlayerTransfers singlePlayer={singlePlayer} />
				</Tab.Pane>
			</Tab.Content>
		</Tab.Container>
	);
}
