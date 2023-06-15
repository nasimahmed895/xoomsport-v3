import { useEffect, useRef } from "react";

export default function AdsterraBanner() {
	const banner = useRef();

	useEffect(() => {
		const atOptions = {
			key: "223a080201d1a296f4d892fc7a5e600f",
			format: "iframe",
			height: 100,
			width: 300,
			params: {},
		};
		if (banner.current && !banner.current.firstChild) {
			const conf = document.createElement("script");
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `//www.profitabledisplaynetwork.com/${atOptions.key}/invoke.js`;
			conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;
			banner.current.append(conf);
			banner.current.append(script);
		}
	}, [banner]);
	return (
		<div
			className=" ads border justify-content-center align-items-center text-white text-center"
			ref={banner}
		>
			<p>Banner 468x60</p>
		</div>
	);
}
