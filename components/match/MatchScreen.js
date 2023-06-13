import styles from "@/styles/match/MatchScreen.module.css";
import axios from "@/utils/api/getAxios";
import getMonth from "@/utils/getMonth";
import getSlugify from "@/utils/getSlugify";
import moment from "moment";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Col, Nav, Row, Tab } from "react-bootstrap";
import { HiArrowLeft } from "react-icons/hi";
import { useQuery } from "react-query";
import MatchHeadToHead from "./MatchHeadToHead";
import MatchStandings from "./MatchStandings";
import MatchLineUp from "./details/MatchLineUp";
import MatchStats from "./details/MatchStats";
import MatchSummary from "./details/MatchSummary";
import MatchPreview from "./preview/MatchPreview";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function MatchScreen({ singleMatch, match_status }) {
	const [activeTab, setActiveTab] = useState(match_status);

	const soccerField = useRef(null);
	const videoPlayer = useRef(null);

	const fieldIcon = useRef(null);
	const fieldIcon2 = useRef(null);

	const responsiveFieldIconB = useRef(null);
	const responsiveFieldIconR = useRef(null);

	const highlightWhiteIcon = useRef(null);
	const highlightRedIcon = useRef(null);

	const responsiveHighlightIconB = useRef(null);
	const responsiveHighlightIconR = useRef(null);

	const divAngleBgColor = useRef(null);

	const [highlights, setHighlights] = useState([]);
	const [indexSerial, setIndexSerial] = useState(0);
	const [showSoccerField, setShowSoccerField] = useState(false);
	const [showHighlights, setShowHighlights] = useState(false);
	const [playing, setPlaying] = useState(false);

	const router = useRouter();

	const {
		isLoading,
		data: fixtureHighlights,
		isError,
		error,
	} = useQuery(`fixture-highlights-${singleMatch.id}`, async () => {
		return await axios.get(`highlights/fixture/${singleMatch.id}`);
	});

	useEffect(() => {
		if (!isLoading) {
			if (fixtureHighlights?.data?.data.length > 0) {
				let highlight_videos = [];
				fixtureHighlights?.data?.data.forEach((element) => {
					highlight_videos.push(element.location);
				});
				setHighlights(highlight_videos);
			}
		}
	}, [fixtureHighlights?.data?.data, isLoading]);

	const handleSoccerField = (responsive) => {
		if (responsive) {
			if (showSoccerField) {
				setShowSoccerField(false);
				responsiveFieldIconR.current.style.display = "none";
				responsiveFieldIconB.current.style.display = "block";
				soccerField.current.style.display = "none";
				divAngleBgColor.current.style.backgroundColor = "#ffffff";
				divAngleBgColor.current.style.clipPath = "none";
			} else {
				setShowSoccerField(true);
				setPlaying(false);
				if (responsiveHighlightIconR.current) {
					responsiveHighlightIconR.current.style.display = "none";
					responsiveHighlightIconB.current.style.display = "block";
				}
				divAngleBgColor.current.style.backgroundColor = "#151515";
				divAngleBgColor.current.style.clipPath =
					"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
				videoPlayer.current.style.display = "none";
				responsiveFieldIconR.current.style.display = "block";
				responsiveFieldIconB.current.style.display = "none";
				soccerField.current.style.display = "block";
			}
		} else {
			if (showSoccerField) {
				setShowSoccerField(false);
				fieldIcon2.current.style.display = "none";
				fieldIcon.current.style.display = "block";
				soccerField.current.style.display = "none";
				divAngleBgColor.current.style.backgroundColor = "#ffffff";
				divAngleBgColor.current.style.clipPath = "none";
			} else {
				setShowSoccerField(true);
				setPlaying(false);
				console.log(11);
				if (highlightRedIcon.current) {
					highlightRedIcon.current.style.display = "none";
					highlightWhiteIcon.current.style.display = "block";
				}
				divAngleBgColor.current.style.backgroundColor = "#151515";
				divAngleBgColor.current.style.clipPath =
					"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
				videoPlayer.current.style.display = "none";
				fieldIcon2.current.style.display = "block";
				fieldIcon.current.style.display = "none";
				soccerField.current.style.display = "block";
			}
		}
	};

	const handleHighlights = (responsive) => {
		if (responsive) {
			if (showHighlights) {
				setShowHighlights(false);
				setPlaying(false);
				responsiveHighlightIconB.current.style.display = "block";
				responsiveHighlightIconR.current.style.display = "none";
				videoPlayer.current.style.display = "none";
				divAngleBgColor.current.style.backgroundColor = "#ffffff";
				divAngleBgColor.current.style.clipPath = "none";
			} else {
				setShowHighlights(true);
				setPlaying(true);
				soccerField.current.style.display = "none";
				responsiveFieldIconR.current.style.display = "none";
				responsiveFieldIconB.current.style.display = "block";
				responsiveHighlightIconR.current.style.display = "block";
				responsiveHighlightIconB.current.style.display = "none";
				videoPlayer.current.style.display = "block";
				divAngleBgColor.current.style.backgroundColor = "#151515";
				divAngleBgColor.current.style.clipPath =
					"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
			}
		} else {
			if (showHighlights) {
				setShowHighlights(false);
				setPlaying(false);
				highlightRedIcon.current.style.display = "none";
				highlightWhiteIcon.current.style.display = "block";
				videoPlayer.current.style.display = "none";
				divAngleBgColor.current.style.backgroundColor = "#ffffff";
				divAngleBgColor.current.style.clipPath = "none";
			} else {
				setShowHighlights(true);
				setPlaying(true);
				console.log(22);
				fieldIcon2.current.style.display = "none";
				fieldIcon.current.style.display = "block";
				soccerField.current.style.display = "none";
				highlightRedIcon.current.style.display = "block";
				highlightWhiteIcon.current.style.display = "none";
				videoPlayer.current.style.display = "block";
				divAngleBgColor.current.style.backgroundColor = "#151515";
				divAngleBgColor.current.style.clipPath =
					"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
			}
		}
	};

	const handleVideoEnded = () => {
		if (highlights.length - 1 === indexSerial) {
			setIndexSerial(0);
		} else {
			setIndexSerial((prev) => prev + 1);
		}
	};

	const live_status = ["LIVE", "HT", "ET", "BREAK"];
	const finishe_status = ["FT", "AET", "FT_PEN"];

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

	// console.log(match_status);

	return (
		<Tab.Container defaultActiveKey={activeTab}>
			<div className="extra-top">
				<div>
					<HiArrowLeft className="backArrowBtn" onClick={() => router.back()} />
				</div>
				<div>
					{!isLoading && fixtureHighlights?.data?.data.length > 0 && (
						<>
							<Image
								className={styles.responsive_highlight_video__icon}
								src="/responsiveHighlightIconB.png"
								alt="Icon"
								width={30}
								height={30}
								onClick={() => handleHighlights(1)}
								ref={responsiveHighlightIconB}
							/>
							<Image
								className={styles.responsive_highlight_video__icon}
								src="/responsiveHighlightIconR.png"
								alt="Icon"
								width={30}
								height={30}
								style={{ display: "none" }}
								onClick={() => handleHighlights(1)}
								ref={responsiveHighlightIconR}
							/>
						</>
					)}

					<Image
						className={styles.responsive_soccer_field__icon}
						src="/soccer_field_black.png"
						alt="Icon"
						width={0}
						height={0}
						onClick={() => handleSoccerField(1)}
						ref={responsiveFieldIconB}
						sizes="100vw"
					/>
					<Image
						className={styles.responsive_soccer_field__icon}
						src="/soccer_field_red_responsive.png"
						style={{ display: "none" }}
						alt="Icon"
						width={0}
						height={0}
						onClick={() => handleSoccerField(1)}
						ref={responsiveFieldIconR}
						sizes="100vw"
					/>
				</div>
			</div>

			<div className={styles.videoPlayerContainer} ref={videoPlayer}>
				<ReactPlayer
					url={highlights[indexSerial]}
					controls
					width="100%"
					height="500px"
					playing={playing}
					onEnded={handleVideoEnded}
				/>
			</div>

			<div style={{ display: "none" }} ref={soccerField}>
				<div className={styles.content_field}>
					<Image
						src="/football_field.png"
						alt="Field Logo"
						width={0}
						height={0}
						style={{ height: "500px", width: "100%" }}
						sizes="100vw"
					/>
					<div className={styles.textwrapper}>
						{match_status === "preview" ? (
							<div className={styles.textcontent}>
								<h6>Match {"Hasn't"} Started Yet</h6>
								<h4>0 - 0</h4>
							</div>
						) : live_status.includes(singleMatch.time.status) ? (
							<>
								<div className={styles.textcontent}>
									<h6>Match is Live</h6>
									<h4>
										{singleMatch?.scores?.localteam_score} -{" "}
										{singleMatch?.scores?.visitorteam_score}
									</h4>
									{singleMatch?.time?.minute >= 45 && (
										<h6>HT {singleMatch?.scores?.ht_score}</h6>
									)}
								</div>
								<div className={styles.team_box_container}>
									<div className={styles.team_content}>
										<p className="m-0">
											{singleMatch?.localCoach?.data?.common_name}
											<br />
											<span>MANAGER</span>
										</p>
										<p className="m-0">
											<span className="d-block text-end">
												{singleMatch?.visitorCoach?.data?.common_name}
											</span>
											<span className="d-block text-end">MANAGER</span>
										</p>
									</div>
								</div>
							</>
						) : (
							<>
								<div className={styles.textcontent}>
									<h6>Match Ended</h6>
									<h4>
										{singleMatch?.scores?.localteam_score} -{" "}
										{singleMatch?.scores?.visitorteam_score}
									</h4>
									<h6>HT {singleMatch?.scores?.ht_score}</h6>
								</div>
								<div className={styles.team_box_container}>
									<div className={styles.team_content}>
										<p className="m-0">
											{singleMatch?.localCoach?.data?.common_name}
											<br />
											<span>MANAGER</span>
										</p>
										<p className="m-0">
											<span className="d-block text-end">
												{" "}
												{singleMatch?.visitorCoach?.data?.common_name}
											</span>
											<span className="d-block text-end">MANAGER</span>
										</p>
									</div>
								</div>
							</>
						)}
					</div>
				</div>
			</div>

			<div ref={divAngleBgColor}>
				<div
					className="container_clip_path_web_content2"
					style={
						match_status == "details"
							? { clipPath: "polygon(0% 7.7%, 100% 0%, 100% 95%, 0% 100%)" }
							: {}
					}
				>
					<div className={styles.league_details__heading}>
						<div className={styles.league_details__content}>
							<Row className={styles.team_names__container}>
								<Col className="col-4">
									<span className="d-flex align-items-center">
										<Link
											className="d-flex align-items-center justify-content-end text-dec-none"
											href={`/team/${getSlugify(
												singleMatch.localTeam.data.name
											)}/${singleMatch.localTeam.data.id}`}
										>
											<Image
												className={styles.league__logo}
												loader={() => singleMatch.localTeam.data.logo_path}
												src={singleMatch.localTeam.data.logo_path}
												alt="League Logo"
												width={0}
												height={0}
												style={{ height: "30px", width: "30px" }}
												sizes="100vw"
											/>

											<h6 className={styles.league__title}>
												{singleMatch.localTeam.data.name}
											</h6>
										</Link>
									</span>
								</Col>

								<Col className="col-4">
									<span className="d-flex align-items-center justify-content-center">
										<div className={styles.content_center}>
											{matchTimeStamp(
												singleMatch.time.status,
												singleMatch.scores.localteam_score,
												singleMatch.scores.visitorteam_score,
												singleMatch.time.minute,
												singleMatch.time.starting_at.date,
												singleMatch.time.starting_at.date_time
											)}
										</div>
									</span>
								</Col>

								<Col className="col-4">
									<span className="d-flex align-items-center justify-content-start">
										<Link
											className="d-flex align-items-center justify-content-end text-dec-none"
											href={`/team/${getSlugify(
												singleMatch.visitorTeam.data.name
											)}/${singleMatch.visitorTeam.data.id}`}
										>
											<Image
												className={styles.league__logo}
												loader={() => singleMatch.visitorTeam.data.logo_path}
												src={singleMatch.visitorTeam.data.logo_path}
												alt="League Logo"
												width={0}
												height={0}
												style={{ height: "30px", width: "30px" }}
												sizes="100vw"
											/>
											<h6 className={styles.league__title}>
												{singleMatch.visitorTeam.data.name}
											</h6>
										</Link>
									</span>
								</Col>

								{finishe_status.includes(singleMatch.time.status) && (
									<Col lg={12} md={12} sm={12}>
										<p className="m-0 text-center text-capitalize mt-2">
											Full Time
										</p>
									</Col>
								)}
							</Row>

							{!isLoading && fixtureHighlights?.data?.data.length > 0 && (
								<div
									className={`${styles.highlight_video__wrapper} ${
										match_status === "preview" ? "d-none" : null
									}`}
								>
									<Image
										className={styles.highlight_video__icon}
										src="/highlight_video_white.png"
										alt="Icon"
										width={30}
										height={30}
										onClick={() => handleHighlights(0)}
										ref={highlightWhiteIcon}
									/>
									<Image
										className={styles.highlight_video__icon}
										style={{ display: "none" }}
										src="/highlight_video_red.png"
										alt="Icon"
										width={30}
										height={30}
										onClick={() => handleHighlights(0)}
										ref={highlightRedIcon}
									/>
								</div>
							)}

							<div className={styles.soccer_field__wrapper}>
								<Image
									className={styles.soccer_field__icon}
									src="/soccer_field.png"
									alt="Icon"
									width={30}
									height={30}
									onClick={() => handleSoccerField(0)}
									ref={fieldIcon}
								/>
								<Image
									className={styles.soccer_field__icon}
									style={{ display: "none" }}
									src="/soccer_field_red.png"
									alt="Icon"
									width={30}
									height={30}
									onClick={() => handleSoccerField(0)}
									ref={fieldIcon2}
								/>
							</div>
						</div>
					</div>
					<Nav className={styles.league_details_tab__heading}>
						<Nav.Item className="ms-1">
							<Nav.Link
								eventKey={activeTab}
								className={styles.league_details_tab__link}
							>
								{match_status === "preview" ? "Preview" : "Info"}
							</Nav.Link>
						</Nav.Item>
						{match_status == "details" && (
							<>
								<Nav.Item className="ms-1">
									<Nav.Link
										eventKey="summary"
										className={styles.league_details_tab__link}
									>
										Summary
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
										eventKey="line_up"
										className={styles.league_details_tab__link}
									>
										Line-Up
									</Nav.Link>
								</Nav.Item>
							</>
						)}

						<Nav.Item className="ms-1">
							<Nav.Link
								eventKey="standings"
								className={styles.league_details_tab__link}
							>
								Standings
							</Nav.Link>
						</Nav.Item>
						<Nav.Item className="ms-1">
							<Nav.Link
								eventKey="head2head"
								className={styles.league_details_tab__link}
							>
								Head-2-Head
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</div>
			</div>

			<Tab.Content>
				<Tab.Pane eventKey={activeTab}>
					<MatchPreview
						fixture_id={singleMatch.id}
						local_id={singleMatch.localTeam.data.id}
						visitor_id={singleMatch.visitorTeam.data.id}
						season_id={singleMatch.season_id}
						league_name={singleMatch.league.data.name}
						league_id={singleMatch.league.data.id}
						country_name={singleMatch.league.data.country.data.name}
						logo_path={singleMatch.league.data.logo_path}
						datetime={singleMatch.time.starting_at.date_time}
						capacity={singleMatch?.venue?.data?.capacity}
					/>
				</Tab.Pane>
				{match_status == "details" && (
					<>
						<Tab.Pane eventKey="summary">
							<MatchSummary singleMatch={singleMatch} />
						</Tab.Pane>
						<Tab.Pane eventKey="stats">
							<MatchStats singleMatch={singleMatch} />
						</Tab.Pane>
						<Tab.Pane eventKey="line_up">
							<MatchLineUp singleMatch={singleMatch} />
						</Tab.Pane>
					</>
				)}
				<Tab.Pane eventKey="standings">
					<MatchStandings season_id={singleMatch.season_id} />
				</Tab.Pane>
				<Tab.Pane eventKey="head2head">
					<MatchHeadToHead
						local_id={singleMatch.localTeam.data.id}
						visitor_id={singleMatch.visitorTeam.data.id}
					/>
				</Tab.Pane>
			</Tab.Content>
		</Tab.Container>
	);
}
