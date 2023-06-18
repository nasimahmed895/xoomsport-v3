import dynamic from "next/dynamic";
function VideoPleyer({ url }) {
	const ReactPlayer = dynamic(() => import("react-player/lazy"), {
		ssr: false,
	});
	return (
		<div className="App">
			<ReactPlayer
				url={url}
				playing={true}
				width={100}
				height={100}
				controls={true}
				quality={true}
				className="videopleyer"
			/>
		</div>
	);
}

export default VideoPleyer;
