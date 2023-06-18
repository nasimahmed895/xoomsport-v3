import styles from "@/styles/watch/VideoList.module.css";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import NoDataFound from "../NoDataFound";

export default function VideoList({ highlights }) {
	const [modalShow, setModalShow] = React.useState(false);
	const [videoType, setVideoType] = React.useState();
	const [youtubeUrl, setYoutubeUrl] = React.useState();
	const [videoSources, setVideoSources] = React.useState([]);
	const [team, setTeam] = React.useState();

	return (
		<div className="video_list__container">
			<Row className="mt-2">
				{highlights?.length == 0 ? (
					<NoDataFound data="No Highlights Available!" />
				) : (
					highlights?.map((item) => (
						<Col
							key={item.id}
							variant="primary"
							onClick={() => (
								setModalShow(item.id),
								setVideoType(item.video_type),
								setYoutubeUrl(item.youtube_url),
								setVideoSources(item.video_sources),
								setTeam(item.title)
							)}
							lg={6}
							md={6}
							sm={6}
							className="mb-4 mt-1 col-6"
						>
							<div className="single_video__item">
								<div className="mb-1">
									<span className={styles.video__title}>
										{item.title.length > 20
											? `${item.title.substring(0, 20)}...`
											: item.title}
									</span>
								</div>
								<div className={styles.single_video__content}>
									<Image
										className={styles.single_video__banner}
										loader={() => item.thumbnail_image}
										src={item.thumbnail_image}
										width="300"
										height="200"
										alt="sport-banner"
									/>
								</div>
							</div>
						</Col>
					))
				)}

				<MyVerticallyCenteredModal
					videoType={videoType}
					youtubeUrl={youtubeUrl}
					videoSources={videoSources}
					show={modalShow}
					team={team}
					onHide={() => setModalShow(false)}
				/>
			</Row>
		</div>
	);
}

function MyVerticallyCenteredModal(props) {
	const ReactPlayer = dynamic(() => import("react-player/lazy"), {
		ssr: false,
	});
	const [indexSerial, setIndexSerial] = useState(0);

	const handleVideoEnded = () => {
		if (props.videoSources.length - 1 === indexSerial) {
			setIndexSerial(0);
		} else {
			setIndexSerial((prev) => prev + 1);
		}
	};

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header className="border-0 m-0 p-0" closeButton>
				<Modal.Title
					className="d-block w-100 text-end"
					id="contained-modal-title-vcenter"
				>
					<Button className="bg-none border-0 " onClick={props.onHide}>
						<Image
							src="/close_btn.png"
							alt="Cross Icon"
							width={15}
							height={15}
						/>
					</Button>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="border-0">
				{props.videoType == "youtube" ? (
					<ReactPlayer className="w-100" controls url={props.youtubeUrl} />
				) : (
					<ReactPlayer
						url={props.videoSources[indexSerial]}
						controls
						playing={true}
						onEnded={handleVideoEnded}
						className="w-100"
					/>
				)}
			</Modal.Body>
			<div className="responsive_bottom"></div>
		</Modal>
	);
}
