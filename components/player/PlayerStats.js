import styles from "@/styles/player/PlayerStats.module.css";
import Image from "next/image";
import { FiChevronRight } from "react-icons/fi";

export default function PlayerStats({ singlePlayer }) {
	let groupBy = {};
	for (let i = 0; i < singlePlayer.stats.data.length; i++) {
		let make = singlePlayer.stats.data[i].league_id;
		if (groupBy[make] == null) groupBy[make] = [];
		groupBy[make].push(singlePlayer.stats.data[i]);
	}

	return (
		<>
			<div>
				{Object.keys(groupBy).map((item, i) => (
					<>
						<div className={styles.league_details__heading}>
							<div className={styles.league_details__content}>
								<div className={styles.league_details__text}>
									<div>
										<Image
											className={styles.league__logo}
											loader={() => groupBy[item][0]?.league?.data?.logo_path}
											src={groupBy[item][0]?.league?.data?.logo_path}
											alt="League Logo"
											width={40}
											height={40}
										/>
									</div>
									<div>
										<h6 className={styles.league__title}>
											{groupBy[item][0]?.league?.data?.name}
										</h6>
									</div>
								</div>
							</div>
						</div>

						{groupBy[item].map((data, index) => (
							<>
								<nav className={styles.nav}>
									<label for="touch" className={styles.titlehed}>
										<span className={styles.title_content}>
											<div
												class={`${styles.list_item} d-flex justify-content-between`}
											>
												<div>
													<span className={styles.icon_slider}>
														<FiChevronRight></FiChevronRight>
													</span>
													{data?.season?.data?.name}
												</div>
												<div>{data.appearences ? data.appearences : "0"}</div>
												<div>{data.lineups ? data.lineups : "0"}</div>
												<div>{data.goals ? data.goals : "0"}</div>
												<div>{data.assists ? data.assists : "0"}</div>
												<div>{data.yellowcards ? data.yellowcards : "0"}</div>
												<div>{data.redcards ? data.redcards : "0"}</div>
												<div>{data.goals ? data.goals : "0"}</div>
												<div>{data.rating ? data.rating : "-"}</div>
											</div>
										</span>
									</label>
									<input type="checkbox" className={styles.touch} />

									<div class={styles.slide}>
										<div className={styles.slide_content}>
											<div>Appearences</div>
											<div>{data.appearences ? data.appearences : "0"}</div>
										</div>
										<div className={styles.slide_content}>
											<div>Starting</div>
											<div>{data.lineups ? data.lineups : "0"}</div>
										</div>
										<div className={styles.slide_content}>
											<div>Goals</div>
											<div>{data.goals ? data.goals : "0"}</div>
										</div>
										<div className={styles.slide_content}>
											<div>Assists</div>
											<div>{data.assists ? data.assists : "0"}</div>
										</div>
										<div className={styles.slide_content}>
											<div>Yellow Cards</div>
											<div>{data.yellowcards ? data.yellowcards : "0"}</div>
										</div>
										<div className={styles.slide_content}>
											<div>Red Cards</div>
											<div>{data.redcards ? data.redcards : "0"}</div>
										</div>
										<div className={styles.slide_content}>
											<div>Substituted in</div>
											<div>{data.substitute_in ? data.substitute_in : "0"}</div>
										</div>
										<div className={styles.slide_content}>
											<div>Substituted out</div>
											<div>
												{data.substitute_out ? data.substitute_out : "0"}
											</div>
										</div>
										<div className={styles.slide_content}>
											<div>Minutes Played</div>
											<div>{data.minutes ? data.minutes : "0"}</div>
										</div>
										<div className={styles.slide_content}>
											<div>Saves Played</div>
											<div>{data.saves ? data.saves : "0"}</div>
										</div>
										<div className={styles.slide_content}>
											<div>Total Passes</div>
											<div>{data.passes.total ? data.passes.total : "0"}</div>
										</div>
										<div className={styles.slide_content}>
											<div>Passes Accuracy</div>
											<div>
												{data.passes.accuracy ? data.passes.accuracy : "0"}
											</div>
										</div>
										<div className={styles.slide_content}>
											<div>key Passes</div>
											<div>
												{data.passes.key_passes ? data.passes.key_passes : "0"}
											</div>
										</div>
										<div className={styles.slide_content}>
											<div>Total Crosses </div>
											<div>{data.passes.total ? data.crosses.total : "0"}</div>
										</div>
										<div className={styles.slide_content}>
											<div>Fouls Committed</div>
											<div>
												{data.fouls.committed ? data.fouls.committed : "0"}
											</div>
										</div>
										<div className={styles.slide_content}>
											<div>Fouls Against</div>
											<div>{data.fouls.drawn ? data.fouls.drawn : "0"}</div>
										</div>
										<div className={styles.slide_content}>
											<div>Clean Sheets</div>
											<div>
												{data.fouls.cleansheets ? data.fouls.cleansheets : "0"}
											</div>
										</div>

										<div className={styles.slide_content}>
											<div>Rating</div>
											<div>{data.rating ? data.rating : "-"}</div>
										</div>
									</div>
								</nav>
							</>
						))}
					</>
				))}
			</div>
		</>
	);
}
