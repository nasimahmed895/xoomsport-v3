import styles from "@/styles/player/PlayerTransfers.module.css";
import moment from "moment";
import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import NoDataFound from "../NoDataFound";

export default function PlayerTransfers({ singlePlayer }) {
	return (
		<div className="player_transfers__container">
			<Row className="mt-3">
				{singlePlayer.transfers.data.length <= 0 ? (
					<NoDataFound data="No Transfer Available!" />
				) : (
					singlePlayer.transfers.data.map((player) => {
						if (player?.type == "IN")
							return (
								<Col key={player.id} lg="4">
									<div className={styles.league_details__heading}>
										<div className={styles.league_details__content}>
											<div className={styles.league_details__text}>
												<div>
													<Image
														className={styles.league__logo}
														loader={() => player?.team?.data?.logo_path}
														src={player?.team?.data?.logo_path}
														alt="League Logo"
														width={40}
														height={40}
													/>
												</div>
												<div>
													<h6 className={styles.league__title}>
														{player?.team?.data?.name}
													</h6>
													<span className={styles.league__date}>
														<span>
															Fee {player?.amount ? player?.amount : "-"},{" "}
														</span>
														{moment
															.utc(player?.date)
															.local()
															.format("dddd DD MMM YYYY")}
													</span>
												</div>
											</div>
										</div>
									</div>
								</Col>
							);
					})
				)}
			</Row>
		</div>
	);
}
