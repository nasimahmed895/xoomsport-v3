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
				width="640"
				height="70vh"
				controls={true}
				quality={true}
			/>
		</div>
	);
}

export default VideoPleyer;
