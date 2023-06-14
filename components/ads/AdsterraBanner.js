import { useEffect, useRef } from "react";

export default function AdsterraBanner() {
	const banner1 = useRef();

	useEffect(() => {
		const atOptions = {
			key: "824a1c2241cfeb27b4e65ddbf386390a",
			format: "iframe",
			height: 100,
			width: 300,
			params: {},
		};
		if (banner1.current && !banner1.current.firstChild) {
			const conf = document.createElement("script");
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `//www.profitabledisplaynetwork.com/${atOptions.key}/invoke.js`;
			conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

			banner1.current.append(conf);
			banner1.current.append(script);
		}
	}, [banner1]);

	return (
		<div
			className="border justify-content-center align-items-center text-white text-center"
			ref={banner1}
		></div>
	);
}

