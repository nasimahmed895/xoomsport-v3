import { useEffect, useRef } from "react";

export default function AdsterraBanner320() {
	const banner2 = useRef();

	useEffect(() => {
		const atOptions = {
			key: "05da49dada883afe13aaddd27613dfc3",
			format: "iframe",
			height: 100,
			width: 300,
			params: {},
		};
		if (banner2.current && !banner2.current.firstChild) {
			const conf = document.createElement("script");
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `//www.profitabledisplaynetwork.com/${atOptions.key}/invoke.js`;
			conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;
			banner2.current.append(conf);
			banner2.current.append(script);
		}
	}, [banner2]);
	return (
		<div
			// Banner 320x50
			className=" ads d-grid  justify-content-center align-items-center text-white text-center"
			ref={banner2}
		></div>
	);
}
