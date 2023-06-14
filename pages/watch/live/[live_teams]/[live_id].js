import CountDownDate from "@/components/CountDownDate";
import Layout from "@/components/Layout";
import VideoPleyer from "@/components/VideoPleyer";
import styles from "@/styles/watch/live/liveVerses.module.css";
import getSlugify from "@/utils/getSlugify";
import axios from "axios";
import cookie from "cookie";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Script from "next/script";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { HiArrowLeft } from "react-icons/hi";

export default function WatchDetails({
	sources,
	liveMatches,
	live_id,
	userToken,
}) {
	const [inputValue, setInputValue] = useState("");
	const [activeButton, setActiveButton] = useState(
		sources?.data[0]?.stream_title
	);

	const handleClick = (button) => {
		setActiveButton(button);
	};

	const handleChange = (event) => {
		setInputValue(event.target.value);
	};

	const filtered = liveMatches.data.filter((live) => {
		let unix_timestamp = live.match_time;
		var now = new Date(unix_timestamp * 1000);
		var time = new Date();
		now = new Date(now);
		return time > now;
	});

	const liveMatches_all = [];
	const liveMatches_id = [];

	for (let index = 0; index < liveMatches.data.length; index++) {
		if (liveMatches.data[index].id == live_id) {
			liveMatches_id.push(liveMatches.data[index]);
		} else {
			liveMatches_all.push(liveMatches.data[index]);
		}
	}

	function liveMatchesView() {
		let unix_timestamp = liveMatches_id[0]?.match_time;
		var now = new Date(unix_timestamp * 1000);
		var time = new Date();
		now = new Date(now);
		if (time < now) {
			return (
				<div className={styles.bg_dark_opacity}>
					<div className={`${styles.bg_image} `}>
						<div className={styles.bg_dark_overlay}>
							<div className="d-flex justify-content-around align-items-center">
								<div className="text-center">
									<Image
										className={`${styles.team_image_live}`}
										loader={() => liveMatches_id[0].team_one_image}
										src={liveMatches_id[0].team_one_image}
										alt=""
										width={100}
										height={100}
									/>
									<h6 className="mt-2">{liveMatches_id[0].team_one_name}</h6>
								</div>
								<div className={styles.tiem_container_live}>
									<span className={`${styles.match__date}`}>Vs</span>
								</div>
								<div className="text-center">
									<Image
										className={`${styles.team_image_live}`}
										loader={() => liveMatches_id[0].team_two_image}
										src={liveMatches_id[0].team_two_image}
										alt=""
										width={100}
										height={100}
									/>
									<h6 className="mt-2">{liveMatches_id[0].team_two_name}</h6>
								</div>
							</div>
							<div className="text-center d-flex justify-content-center">
								<span>The match will start in</span>{" "}
								<span className="m-1"></span>{" "}
								<CountDownDate date={liveMatches_id[0].match_time} />
							</div>
							<h6 className="text-center mt-4">
								Streaming will start before 15 mins of the match started
							</h6>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<VideoPleyer
						url={inputValue ? inputValue : sources?.data[0]?.stream_url}
					/>
					<div className="d-flex bg-black p-3 text-white">
						{sources.data.map((item, index) => (
							<>
								{item.stream_type == "m3u8" ? (
									<div onClick={() => handleClick(item.stream_title)}>
										<Button
											value={item.stream_url}
											onClick={handleChange}
											className={`${activeButton === item.stream_title
													? styles.buttonactive
													: ""
												} text-white target bg-none border-0`}
										>
											{item.stream_title}
										</Button>
									</div>
								) : (
									""
								)}
							</>
						))}
					</div>
				</div>
			);
		}
	}

	const router = useRouter();

	return (
		<Layout title="WATCH VIDEOS" fullScreen userToken={userToken}>
			<div className="container">
				<div className="extra-top">
					<div>
						<HiArrowLeft
							className="backArrowBtn"
							onClick={() => router.back()}
						/>
					</div>
				</div>

				<div className="live_video_section">
					{liveMatchesView()}
					<Script
						async="async"
						data-cfasync="false"
						src="//pl19705711.highrevenuegate.com/adc776e4feb8fe47f8b01cad883134cf/invoke.js"
					></Script>
					<div id="container-adc776e4feb8fe47f8b01cad883134cf"></div>
					{filtered.length == 0 ? (
						""
					) : (
						<div className={styles.match_heading}>
							<h3>Also Live</h3>
						</div>
					)}
					<div>
						<Row>
							{filtered.map((item) => (
								<Col key={item} className="col-lg-4 col-md-6 col-12">
									<Link
										href={`/watch/live/${getSlugify(
											item.team_one_name
										)}-vs-${getSlugify(item.team_two_name)}/${item.id}`}
										className="text-dec-none"
									>
										<h4 className={`${styles.title}`}>{item.match_title}</h4>

										<div className={`${styles.playing_content}`}>
											<div className={styles.lineContent1}>
												<Image
													src="/line-up-1.png"
													alt=""
													width={100}
													height={100}
												/>
											</div>
											<div className="row align-items-center">
												<div className="col">
													<div className="text-center">
														<Image
															className={`${styles.team_image}`}
															loader={() => item.team_one_image}
															src={item.team_one_image}
															alt=""
															width={100}
															height={100}
														/>
														<h6 className="mt-2">{item.team_one_name}</h6>
													</div>
												</div>
												<div className="col">
													<div className={styles.tiem_container}>
														<span className={styles.match__date}>
															Live
															<span className={styles.live__indicator}>
																{'"'}
															</span>
														</span>
													</div>
												</div>
												<div className="col">
													<div className="text-center">
														<Image
															className={`${styles.team_image}`}
															loader={() => item.team_two_image}
															src={item.team_two_image}
															alt=""
															width={100}
															height={100}
														/>
														<h6 className="mt-2">{item.team_two_name}</h6>
													</div>
												</div>
												{live_id == item.id ? (
													<div className={styles.playing}>
														<div>Playing Now</div>
														<Image
															className={`${styles.playing_now}`}
															src="/playing_now.png"
															alt="Playing Now Logo"
															width={100}
															height={100}
														/>
													</div>
												) : (
													<div
														className={`${styles.playing} ${styles.playing_div}  `}
													>
														Playing
													</div>
												)}
											</div>
											<div className={styles.lineContent2}>
												<Image
													src="/line-up-2.png"
													alt=""
													width={100}
													height={100}
												/>
											</div>
										</div>
									</Link>
								</Col>
							))}
						</Row>
					</div>
					<div className={`${styles.match_heading} mt-5`}>
						<h3>Upcoming Live Matches</h3>
					</div>
					<div>
						<Row>
							{liveMatches_all.reverse().map((item) => (
								<Col key={item} className="col-lg-4 col-md-6 col-12">
									<Link
										href={`/watch/live/${getSlugify(
											item.team_one_name
										)}-vs-${getSlugify(item.team_two_name)}/${item.id}`}
										className="text-dec-none"
									>
										<h4 className={`${styles.title}`}>{item.match_title}</h4>
										<div className={`${styles.container_wreapper}`}>
											<div className={styles.lineContent1}>
												<Image
													src="/line-up-1.png"
													alt=""
													width={100}
													height={100}
												/>
											</div>
											<div className="row align-items-center">
												<div className="col ">
													<div className="text-center">
														<Image
															className={`${styles.team_image}`}
															loader={() => item.team_one_image}
															src={item.team_one_image}
															alt=""
															width={100}
															height={100}
														/>
														<h6 className="mt-2">{item.team_one_name}</h6>
													</div>
												</div>
												<div className="col">
													<div className={styles.tiem_container}>
														<div className={`${styles.possition}`}>
															<span className="d-block">
																{moment(item.match_time * 1000).format("h:mm")}
															</span>
															<span className="d-block">
																{moment(item.match_time * 1000).format("A")}
															</span>
														</div>
													</div>
												</div>
												<div className="col">
													<div className="text-center">
														<Image
															className={`${styles.team_image}`}
															loader={() => item.team_two_image}
															src={item.team_two_image}
															alt=""
															width={100}
															height={100}
														/>
														<h6 className="mt-2">{item.team_two_name}</h6>
													</div>
												</div>
											</div>
											<div className={styles.lineContent2}>
												<Image
													src="/line-up-2.png"
													alt=""
													width={100}
													height={100}
												/>
											</div>
										</div>
									</Link>
								</Col>
							))}
						</Row>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const { live_id } = context.query;

	const cookies = context.req.headers.cookie;
	let userToken = null;

	if (cookies !== undefined) {
		userToken = cookie.parse(cookies).userToken;
	}

	const res = await axios.post(`https://xoomsport.com/api/v1/live_matches`, {
		method: "POST",
		api_key: process.env.NEXT_PUBLIC_XOOMSPORT_API_TOKEN,
	});
	const sources = await axios.post(
		`http://xoomsport.com/api/v1/streaming_sources/${context.params.live_id}`,
		{
			method: "POST",
			api_key: process.env.NEXT_PUBLIC_XOOMSPORT_API_TOKEN,
		}
	);
	return {
		props: {
			liveMatches: res.data,
			sources: sources.data,
			live_id: live_id,
			userToken: userToken ?? null,
		},
	};
}
