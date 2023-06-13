import styles from "@/styles/player/PlayerProfile.module.css";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import PlayerProfileShimmer from "../shimmer/player/PlayerProfileShimmer";

export default function PlayerProfile({ singlePlayer }) {
	const [isLoading, setisLoading] = useState(true);

	const current_season_id =
		singlePlayer?.team?.data?.league?.data?.current_season_id;

	const [playerData] = singlePlayer?.stats?.data.filter((player) => {
		if (player.season_id == current_season_id) {
			return player;
		}
	});

	useEffect(() => {
		setTimeout(() => {
			setisLoading(false);
		}, 1000);
	}, []);

	if (isLoading) {
		return <PlayerProfileShimmer />;
	} else {
		return (
			<div
				className={`player_profile__container ${styles.container_clip_path_web3}`}
			>
				<div className={`${styles.player_attr__container} `}>
					<div className={`${styles.player_attr__wrapper_one} `}>
						<div className={styles.player__attr}>
							<span className={styles.attr__value}>
								{singlePlayer?.height ? singlePlayer?.height : "-"}
							</span>
							<span className={styles.attr__key}>Height</span>
						</div>
						<div className={styles.player__attr}>
							<span className={styles.attr__value}>
								{moment().diff(
									`${singlePlayer?.birthdate.split("/")[2]}-${
										singlePlayer?.birthdate.split("/")[1]
									}-${singlePlayer?.birthdate.split("/")[0]}`,
									"years",
									false
								)}{" "}
								Years
							</span>
							<span className={styles.attr__key}>
								{singlePlayer?.birthdate ? singlePlayer?.birthdate : "-"}
							</span>
						</div>
						<div className={styles.player__attr}>
							<span className={styles.attr__value}>
								{singlePlayer?.weight ? singlePlayer?.weight : "-"}
							</span>
							<span className={styles.attr__key}>Weight</span>
						</div>
					</div>
					<div className={styles.player_attr__wrapper_two}>
						<div className={styles.player__attr}>
							<span className={styles.attr__value}>
								{singlePlayer?.lineups.data[0].number
									? singlePlayer?.lineups.data[0].number
									: "-"}
							</span>
							<span className={styles.attr__key}>Shirt</span>
						</div>
						<div className={styles.player__attr}>
							<span className={styles.attr__value}>
								{singlePlayer?.country?.data?.name
									? singlePlayer?.country?.data?.name
									: "-"}
							</span>
							<span className={styles.attr__key}>Country</span>
						</div>
						<div className={styles.player__attr}>
							<span className={styles.attr__value}>
								{singlePlayer?.transfers?.data[0]?.amount
									? singlePlayer?.transfers?.data[0]?.amount
									: "-"}
							</span>
							<span className={styles.attr__key}>Market Value</span>
						</div>
					</div>
				</div>

				<div className="player_activities__container">
					<div className="player_league__info">
						<div className={styles.league_details__text}>
							<div>
								<Image
									className={styles.league__logo}
									loader={() =>
										singlePlayer?.team?.data?.league?.data?.logo_path
									}
									src={singlePlayer?.team?.data?.league?.data?.logo_path}
									alt="League Logo"
									width={40}
									height={40}
								/>
							</div>
							<div>
								<h6 className={styles.league__title}>
									{singlePlayer?.team?.data?.league?.data?.name}
								</h6>
							</div>
						</div>
					</div>
					<div className={styles.player__activities}>
						<div className={styles.single__activity}>
							<span className={styles.activity__value}>
								{playerData?.appearences ? playerData?.appearences : "-"}
							</span>
							<span className={styles.activity__key}>Matches</span>
						</div>
						<div className={styles.single__activity}>
							<span className={styles.activity__value}>
								{playerData?.goals ? playerData?.goals : "-"}
							</span>
							<span className={styles.activity__key}>Goals</span>
						</div>
						<div className={styles.single__activity}>
							<span className={styles.activity__value}>
								{playerData?.assists ? playerData?.assists : "-"}
							</span>
							<span className={styles.activity__key}>Assists</span>
						</div>
						<div
							className={`${styles.single__activity} ${styles.single_activity__rating}`}
						>
							<span className={styles.activity__value}>
								{playerData?.rating ? playerData?.rating : "-"}
							</span>
							<span className={styles.activity__key}>Rating</span>
						</div>
					</div>
				</div>

				<div className="player_position__container">
					<div className={styles.player_position__wrapper}>
						<div className={styles.player_position__info}>
							<span className={styles.position__key}>Position</span>
							<span className={styles.position__value}>
								{singlePlayer?.position?.data?.name}
							</span>
						</div>
						<div className={styles.player_position__field}>
							<Image
								src="/football_field.png"
								alt="Field Image"
								width={0}
								height={0}
								style={{ height: "200px", width: "100%" }}
								sizes="100vw"
							/>
							<div
								className={
									singlePlayer?.position?.data?.name == "Goalkeeper"
										? styles.position_goalkeeper
										: singlePlayer?.position?.data?.name == "Defender"
										? styles.position_defender
										: singlePlayer?.position?.data?.name == "Midfielder"
										? styles.position_midfielder
										: singlePlayer?.position?.data?.name == "Attacker"
										? styles.position_attacker
										: null
								}
							>
								{singlePlayer?.position?.data?.name == "Goalkeeper"
									? "G"
									: singlePlayer?.position?.data?.name == "Defender"
									? "D"
									: singlePlayer?.position?.data?.name == "Midfielder"
									? "M"
									: singlePlayer?.position?.data?.name == "Attacker"
									? "F"
									: null}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
