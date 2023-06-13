import { useEffect, useRef } from "react";

const VideoPlayer = ({ video }) => {
	const playerRef = useRef(null);

	useEffect(() => {
		if (playerRef.current && typeof window !== "undefined") {
			window.jwplayer(playerRef.current).setup({
				file: video.sourceUrl,
				width: "100%",
				aspectratio: "16:9",
				// requestCustomHeaders: {
				// 	Origin: "https://ntuplay.xyz",
				// 	Referer: "https://ntuplay.xyz/",
				// 	"User-Agent":
				// 		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
				// },
			});

			// window.jwplayer(playerRef.current).on("beforePlay", function (event) {
			// 	const xhr = new XMLHttpRequest();
			// 	const url = video.sourceUrl;
			// 	const referer = "https://ntuplay.xyz";
			// 	const origin = "https://ntuplay.xyz";

			// 	xhr.open("GET", url, true);
			// 	xhr.setRequestHeader("Referer", referer);
			// 	xhr.setRequestHeader("Origin", origin);
			// 	xhr.responseType = "text";

			// 	xhr.onload = function () {
			// 		if (xhr.status === 200) {
			// 			const playlist = xhr.responseText;

			// 			window.jwplayer(playerRef.current).load({
			// 				file: playlist,
			// 			});
			// 		}
			// 	};

			// 	xhr.send();
			// });
		}
	}, [video]);

	return <div ref={playerRef}></div>;
};

export default VideoPlayer;
