import { useEffect, useRef } from "react";

export default function AdsterraBanner() {
	const banner = useRef();

	useEffect(() => {
		const atOptions = {
			key: "c4fb4f68e55a97fb9d2e3a15b766087c",
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

