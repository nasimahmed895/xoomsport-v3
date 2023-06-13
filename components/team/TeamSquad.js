import styles from "@/styles/team/TeamSquad.module.css";
import getSlugify from "@/utils/getSlugify";
import Image from "next/image";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import NoDataFound from "../NoDataFound";

export default function TeamSquad({ singleTeam }) {
	let groupBy = {};

	for (let i = 0; i < singleTeam.squad.data.length; i++) {
		let make = singleTeam?.squad?.data[i]?.player?.data?.position?.data?.name;
		if (groupBy[make] == null) groupBy[make] = [];
		groupBy[make].push(singleTeam.squad.data[i]);
	}

	if (groupBy["Goalkeeper"] == undefined) {
		return <NoDataFound data="No Data Found" />;
	} else {
		return (
			<div className={styles.team_squad__container}>
				<div className={styles.single__squad}>
					<h5 className={styles.team_squad__title}>Goal-Keeper</h5>
					<Row>
						{groupBy["Goalkeeper"].map((player) => (
							<Col lg={3} md={6} sm={6} key={player?.player_id}>
								<Link
									href={`/player/${getSlugify(
										player?.player?.data?.common_name
									)}/${player?.player?.data?.player_id}`}
									className="text-dec-none"
								>
									<div className={styles.league_details__text}>
										<div>
											<Image
												className={styles.league__logo}
												loader={() => player?.player?.data?.image_path}
												src={player?.player?.data?.image_path}
												alt="Player Logo"
												width={35}
												height={35}
											/>
										</div>
										<div>
											<h6 className={styles.league__title}>
												{player?.player?.data?.common_name}
											</h6>
											<div>
												{player?.player?.data?.country?.data?.image_path ? (
													<Image
														className={styles.country__logo}
														loader={() =>
															player?.player?.data?.country?.data?.image_path
														}
														src={
															player?.player?.data?.country?.data?.image_path
														}
														alt="Country Logo"
														width={20}
														height={15}
													/>
												) : (
													""
												)}
												<span className={styles.country__name}>
													{player?.player?.data?.country?.data?.name}
												</span>
											</div>
										</div>
									</div>
								</Link>
							</Col>
						))}
					</Row>
				</div>

				<div className={styles.single__squad}>
					<h5 className={styles.team_squad__title}>Defender</h5>
					<Row>
						{groupBy["Defender"].map((player) => (
							<Col lg={3} md={6} sm={6} key={player.player_id}>
								<Link
									href={`/player/${getSlugify(
										player?.player?.data?.common_name
									)}/${player?.player?.data?.player_id}`}
									className="text-dec-none"
								>
									<div className={styles.league_details__text}>
										<div>
											<Image
												className={styles.league__logo}
												loader={() => player?.player?.data?.image_path}
												src={player?.player?.data?.image_path}
												alt="Player Logo"
												width={35}
												height={35}
											/>
										</div>
										<div>
											<h6 className={styles.league__title}>
												{player?.player?.data?.common_name}
											</h6>
											<div>
												{player?.player?.data?.country?.data?.image_path ? (
													<Image
														className={styles.country__logo}
														loader={() =>
															player?.player?.data?.country?.data?.image_path
														}
														src={
															player?.player?.data?.country?.data?.image_path
														}
														alt="Country Logo"
														width={20}
														height={15}
													/>
												) : (
													""
												)}
												<span className={styles.country__name}>
													{player?.player?.data?.country?.data?.name}
												</span>
											</div>
										</div>
									</div>
								</Link>
							</Col>
						))}
					</Row>
				</div>

				<div className={styles.single__squad}>
					<h5 className={styles.team_squad__title}>Midfielder</h5>
					<Row>
						{groupBy["Midfielder"].map((player) => (
							<Col lg={3} md={6} sm={6} key={player?.player_id}>
								<Link
									href={`/player/${getSlugify(
										player?.player?.data?.common_name
									)}/${player?.player?.data?.player_id}`}
									className="text-dec-none"
								>
									<div className={styles.league_details__text}>
										<div>
											<Image
												className={styles.league__logo}
												loader={() => player?.player?.data?.image_path}
												src={player?.player?.data?.image_path}
												alt="Player Logo"
												width={35}
												height={35}
											/>
										</div>
										<div>
											<h6 className={styles.league__title}>
												{player?.player?.data?.common_name}
											</h6>
											<div>
												{player?.player?.data?.country?.data?.image_path ? (
													<Image
														className={styles.country__logo}
														loader={() =>
															player?.player?.data?.country?.data?.image_path
														}
														src={
															player?.player?.data?.country?.data?.image_path
														}
														alt="Country Logo"
														width={20}
														height={15}
													/>
												) : (
													""
												)}
												<span className={styles.country__name}>
													{player?.player?.data?.country?.data?.name}
												</span>
											</div>
										</div>
									</div>
								</Link>
							</Col>
						))}
					</Row>
				</div>

				<div className={styles.single__squad}>
					<h5 className={styles.team_squad__title}>Attacker</h5>
					<Row>
						{groupBy["Attacker"].map((player) => (
							<Col lg={3} md={6} sm={6} key={player?.player_id}>
								<Link
									href={`/player/${getSlugify(
										player?.player?.data?.common_name
									)}/${player?.player?.data?.player_id}`}
									className="text-dec-none"
								>
									<div className={styles.league_details__text}>
										<div>
											<Image
												className={styles.league__logo}
												loader={() => player?.player?.data?.image_path}
												src={player?.player?.data?.image_path}
												alt="Player Logo"
												width={35}
												height={35}
											/>
										</div>
										<div>
											<h6 className={styles.league__title}>
												{player.player.data.common_name}
											</h6>
											<div>
												{player?.player?.data?.country?.data?.image_path ? (
													<Image
														className={styles.country__logo}
														loader={() =>
															player?.player?.data?.country?.data?.image_path
														}
														src={
															player?.player?.data?.country?.data?.image_path
														}
														alt="Country Logo"
														width={20}
														height={15}
													/>
												) : (
													""
												)}
												<span className={styles.country__name}>
													{player?.player?.data?.country?.data?.name}
												</span>
											</div>
										</div>
									</div>
								</Link>
							</Col>
						))}
					</Row>
				</div>

				<div className={styles.single__squad}>
					<h5 className={styles.team_squad__title}>Coach</h5>
					<Row>
						<Col lg={3}>
							<div className={styles.league_details__text}>
								<div>
									<Image
										className={styles.league__logo}
										loader={() => singleTeam?.coach?.data?.image_path}
										src={singleTeam?.coach?.data?.image_path}
										alt="Coach Image"
										width={35}
										height={35}
									/>
								</div>
								<div>
									<h6 className={styles.league__title}>
										{singleTeam?.coach?.data?.common_name}
									</h6>
								</div>
							</div>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}
