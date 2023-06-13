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
				<Script type='text/javascript' src='//pl19694061.highrevenuegate.com/47/61/88/47618882aca23426018cf1dd2b37db5d.js'></Script>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
