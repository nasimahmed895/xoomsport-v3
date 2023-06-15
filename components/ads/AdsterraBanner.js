import { useEffect, useRef } from "react";

export default function AdsterraBanner() {
	const banner1 = useRef();

	useEffect(() => {
		const atOptions1 = {
			key: "223a080201d1a296f4d892fc7a5e600f",
			format: "iframe",
			height: 600,
			width: 160,
			params: {},
		};
		if (banner1.current && !banner1.current.firstChild) {
			const conf = document.createElement("script");
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `//www.profitabledisplaynetwork.com/${atOptions1.key}/invoke.js`;
			conf.innerHTML = `atOptions1 = ${JSON.stringify(atOptions1)}`;

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

