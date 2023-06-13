import VideoPlayer from "@/components/jwplayer/VideoPlayer";
// import JWPlayer from "@jwplayer/jwplayer-react";

const video = {
	// sourceUrl: "https://v4.soft4game.com/o1/stream217/chunks.m3u8",
	sourceUrl: "https://v3.soft4game.com/o1/stream60q/chunks.m3u8",
};

// http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8
// https://ddy1.cdnhks.lol/ddy1/premium56/tracks-v1a1/mono.m3u8
// https://www.g-video.tv/48300451.mp4
// https://wiki.cdnhks.lol/wiki/wiki67/tracks-v1a1/mono.m3u8

export default function Player() {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div
				style={{
					width: "500px",
					height: "500px",
				}}
			>
				<VideoPlayer video={video} />
				{/* <JWPlayer
					file="https://wiki.cdnhks.lol/wiki/wiki67/tracks-v1a1/mono.m3u8"
					library="https://cdn.jwplayer.com/libraries/JiMnwAVR.js"
				/> */}
			</div>
		</div>
	);
}
