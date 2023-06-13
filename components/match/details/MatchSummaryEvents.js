import style from "@/styles/match/details/MatchSummary.module.css";
import axios from "@/utils/api/getAxios";
import { Image } from "react-bootstrap";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import NoDataFound from "../../NoDataFound";
export default function MatchSummaryEvents({ match_id }) {
	const {
		isLoading,
		data: events,
		isError,
		error,
	} = useQuery(`comments-events-${match_id}`, async () => {
		return await axios.get(`fixtures/${match_id}?include=events`);
	});

	const penShootoutArray = [];
	const matchArray = [];
	const firstHalfArray = [];
	const secondtHalfArray = [];
	if (isError) {
		toast.warn("Please check your internet connetion or try again!", {
			theme: "dark",
		});
	}

	if (isLoading || isError || events.data.data === undefined) {
		return <NoDataFound />;
	} else {
		const minuteArray = events.data.data.events.data;
		minuteArray.sort((a, b) => a.minute - b.minute);
		for (let index = 0; index < minuteArray.length; index++) {
			if (
				minuteArray[index].type == "pen_shootout_goal" ||
				minuteArray[index].type == "pen_shootout_miss"
			) {
				penShootoutArray.push(minuteArray[index]);
			} else {
				matchArray.push(minuteArray[index]);
				if (minuteArray[index].minute < 45) {
					firstHalfArray.push(minuteArray[index]);
				} else {
					secondtHalfArray.push(minuteArray[index]);
				}
			}
		}

		function image(name, className) {
			return (
				<span className={`${style.goal} ${className}`}>
					<Image
						src={`/static/images/matches/${name}`}
						alt={`${name}`}
						width={30}
						height={30}
					></Image>
				</span>
			);
		}

		function eventLeft(item) {
			if (item.type == "substitution") {
				return (
					<>
						<div className={style.content}>
							<div>
								{item.minute}
								{"' "}
								{item.extra_minute ? `+ ${item.extra_minute}` : ""}
							</div>
							<div
								className={`${style.possition_content} ${
									item.extra_minute ? `+ ${style.extra_minute_possition}` : ""
								}`}
							>
								<div className={style.content_wrepper}>
									<div className={style.team_content}>
										<div>
											{image("sub2.png")} {item.player_name}
										</div>
										<div>
											{image("sub1.png")} {item.related_player_name}
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				);
			} else if (item.type == "goal" || item.type == "own-goal") {
				return (
					<>
						<div className={style.content}>
							<div>
								{item.minute}
								{"'"}
							</div>
							<div className={style.possition_content}>
								<div className={style.content_wrepper}>
									<div>{image("football.png")}</div>
									<div className={style.team_content}>
										<div>{item.player_name}</div>
									</div>
								</div>
							</div>
						</div>
					</>
				);
			} else if (item.type == "yellowcard") {
				return (
					<>
						<div className={style.content}>
							<div>
								{item.minute}
								{"'"}
							</div>
							<div className={style.possition_content}>
								<div className={style.content_wrepper}>
									<div>{image("yellow.png", "yellow")}</div>
									<div className={style.team_content}>
										<div>{item.player_name}</div>
									</div>
								</div>
							</div>
						</div>
					</>
				);
			} else if (item.type == "redcard") {
				return (
					<>
						<div className={style.content}>
							<div>
								{item.minute}
								{"'"}
							</div>
							<div className={style.possition_content}>
								<div className={style.content_wrepper}>
									<div>{image("red.png")}</div>
									<div className={style.team_content}>
										<div>{item.player_name}</div>
									</div>
								</div>
							</div>
						</div>
					</>
				);
			} else if (item.type == "yellowred") {
				return (
					<>
						<div className={style.content}>
							<div>
								{item.minute}
								{"'"}
							</div>
							<div className={style.possition_content}>
								<div className={style.content_wrepper}>
									<div>{image("yellowred.png")}</div>
									<div className={style.team_content}>
										<div>{item.player_name}</div>
									</div>
								</div>
							</div>
						</div>
					</>
				);
			} else if (item.type == "penalty") {
				return (
					<>
						<div className={style.content}>
							<div>
								{item.minute}
								{"'"}
							</div>
							<div className={style.possition_content}>
								<div className={style.content_wrepper}>
									<div>{image("penalty.png", "penalty")}</div>
									<div className={style.team_content}>
										<div>Penalty confirmed</div>
										<div>{item.player_name}</div>
									</div>
								</div>
							</div>
						</div>
					</>
				);
			} else if (item.type == "var") {
				return (
					<>
						<div className={style.content}>
							<div>
								{item.minute}
								{"'"}
							</div>
							<div className={style.possition_content}>
								<div className={style.content_wrepper}>
									<div>{image("var.png")}</div>
									<div className={style.team_content}>
										<div>{item.player_name}</div>
										<div>{item.var_result}</div>
									</div>
								</div>
							</div>
						</div>
					</>
				);
			} else if (item.type == "pen_shootout_goal") {
				return (
					<>
						<div className={style.content}>
							<div>
								{item.minute}
								{"'"}
							</div>
							<div className={style.possition_content}>
								<div className={style.content_wrepper}>
									<div>{image("man.png")}</div>
									<div className={style.team_content}>
										<div>{item.player_name}</div>
										<div>
											<span>Scored</span>
											{item.result}
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				);
			} else if (item.type == "pen_shootout_miss") {
				return (
					<>
						<div className={style.content}>
							<div>
								{item.minute}
								{"'"}
							</div>
							<div className={style.possition_content}>
								<div className={style.content_wrepper}>
									<div>{image("man.png")}</div>
									<div className={style.team_content}>
										<div>{item.player_name}</div>
										<div>
											<span>Missed</span>
											{item.result}
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				);
			} else {
				return (
					<div className={style.content}>
						<div>{item.minute}</div>
						<div className={style.possition_content}>
							<div className={style.content_wrepper}>
								<div>{image("man.png")}</div>
								<div className={style.team_content}>
									<div>{item.player_name}</div>
								</div>
							</div>
						</div>
					</div>
				);
			}
		}

		function eventRight(item) {
			if (item.type == "substitution") {
				return (
					<>
						<div className={`${style.content} ${style.eventRight} right`}>
							<div>
								{item.minute}
								{"'"}
								{item.extra_minute ? `+ ${item.extra_minute}` : ""}
							</div>
							<div className={style.possition_content}>
								<div className={style.content_wrepper}>
									{/* <div >{image('var.png')}</div> */}
									<div className={style.team_content}>
										<div>
											{item.player_name} {image("sub2.png")}
										</div>
										<div>
											{item.related_player_name} {image("sub1.png")}
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				);
			} else if (item.type == "goal" || item.type == "own-goal") {
				return (
					<>
						<div className={`${style.content} ${style.eventRight}`}>
							<div>
								{item.minute}
								{"'"}
							</div>
							<div className={style.possition_content}>
								<div className={style.content_wrepper}>
									<div className={style.team_content}>
										<div>{item.player_name}</div>
									</div>
									<div>{image("football.png")}</div>
								</div>
							</div>
						</div>
					</>
				);
			} else if (item.type == "yellowcard") {
				return (
					<>
						<div className={`${style.content} ${style.eventRight}`}>
							<div>
								{item.minute}
								{"'"}
							</div>
							<div className={style.possition_content}>
								<div className={style.content_wrepper}>
									<div className={style.team_content}>
										<div>{item.player_name}</div>
									</div>
									<div>{image("yellow.png", "yellow")}</div>
								</div>
							</div>
						</div>
					</>
				);
			} else if (item.type == "redcard") {
				return (
					<>
						<div className={`${style.content} ${style.eventRight}`}>
							<div>
								{item.minute}
								{"'"}
							</div>
							<div className={style.possition_content}>
								<div className={style.content_wrepper}>
									<div className={style.team_content}>
										<div>{item.player_name}</div>
									</div>
									<div>{image("red.png")}</div>
								</div>
							</div>
						</div>
					</>
				);
			} else if (item.type == "yellowred") {
				return (
					<>
						<div className={`${style.content} ${style.eventRight}`}>
							<div>
								{item.minute}
								{"'"}
							</div>
							<div className={style.possition_content}>
								<div className={style.content_wrepper}>
									<div className={style.team_content}>
										<div>{item.player_name}</div>
									</div>
									<div>{image("yellowred.png")}</div>
								</div>
							</div>
						</div>
					</>
				);
			} else if (item.type == "penalty") {
				return (
					<>
						<div className={`${style.content} ${style.eventRight}`}>
							<div>
								{item.minute}
								{"'"}
							</div>
							<div className={style.possition_content}>
								<div className={style.content_wrepper}>
									<div className={style.team_content}>
										<div>Penalty confirmed</div>
										<div>{item.player_name}</div>
									</div>
									<div>{image("penalty.png", "penalty")}</div>
								</div>
							</div>
						</div>
					</>
				);
			} else if (item.type == "var") {
				return (
					<>
						<div className={`${style.content} ${style.eventRight}`}>
							<div>
								{item.minute}
								{"'"}
							</div>
							<div className={style.possition_content}>
								<div className={style.content_wrepper}>
									<div className={style.team_content}>
										<div>{item.player_name}</div>
										<div>{item.var_result}</div>
									</div>
									<div>{image("var.png")}</div>
								</div>
							</div>
						</div>
					</>
				);
			} else if (item.type == "pen_shootout_goal") {
				return (
					<>
						<div className={`${style.content} ${style.eventRight}`}>
							<div>
								{item.minute}
								{"'"}
							</div>
							<div className={style.possition_content}>
								<div className={style.content_wrepper}>
									<div className={style.team_content}>
										<div>{item.player_name}</div>
										<div>
											<span>Scored</span>
											{item.result}
										</div>
									</div>
									<div>{image("man.png")}</div>
								</div>
							</div>
						</div>
					</>
				);
			} else if (item.type == "pen_shootout_miss") {
				return (
					<>
						<div className={`${style.content} ${style.eventRight}`}>
							<div>
								{item.minute}
								{"'"}
							</div>
							<div className={style.possition_content}>
								<div className={style.content_wrepper}>
									<div className={style.team_content}>
										<div>{item.player_name}</div>
										<div>
											<span>Missed</span>
											{item.result}
										</div>
									</div>
									<div>{image("man.png")}</div>
								</div>
							</div>
						</div>
					</>
				);
			} else {
				return (
					<>
						<div className={`${style.content} ${style.eventRight}`}>
							<div>
								{item.minute}
								{"'"}
							</div>
							<div className={style.possition_content}>
								<div className={style.content_wrepper}>
									<div className={style.team_content}>
										<div>{item.player_name}</div>
									</div>
									<div>{image("man.png")}</div>
								</div>
							</div>
						</div>
					</>
				);
			}
		}

		return (
			<div className={style.main_content_event}>
				{firstHalfArray.map((item) => (
					<div key={item.position} className={style.commentary_content_event}>
						<span className={style.commentary_items}>
							{" "}
							{item.team_id == events.data.data.localteam_id
								? eventLeft(item)
								: eventRight(item)}
						</span>
					</div>
				))}
				<div className={style.halftime}>
					<span className={style.halftime_status}>HT</span>
					<span>{events.data.data.scores.ht_score}</span>
				</div>
				{secondtHalfArray.map((item) => (
					<div key={item.position} className={style.commentary_content_event}>
						<span className={style.commentary_items}>
							{" "}
							{item.team_id == events.data.data.localteam_id
								? eventLeft(item)
								: eventRight(item)}
						</span>
					</div>
				))}
				<div className={style.halftime}>
					<span className={style.halftime_status}>FT</span>
					<span>{events.data.data.scores.ft_score}</span>
				</div>
				{penShootoutArray.map((item) => (
					<div key={item.position} className={style.commentary_content_event}>
						<span className={style.commentary_items}>
							{" "}
							{item.team_id == events.data.data.localteam_id
								? eventLeft(item)
								: eventRight(item)}
						</span>
					</div>
				))}
			</div>
		);
	}
}
