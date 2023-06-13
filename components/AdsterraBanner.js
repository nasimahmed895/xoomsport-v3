import { useEffect, useRef } from "react";

export default function AdsterraBanner() {
	const banner = useRef();

	useEffect(() => {
		const atOptions = {
			key: "9a2151be3b8f2101fc939619dcf0ae2d",
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
			className="border justify-content-center align-items-center text-white text-center"
			ref={banner}
		></div>
	);
}
