import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<Script
					id="jw-player"
					strategy="afterInteractive"
					src="https://cdn.jwplayer.com/libraries/JiMnwAVR.js"
				></Script>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
