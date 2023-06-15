import { useEffect, useRef } from "react";

export default function AdsterraBanner2() {
	const banner2 = useRef();

	useEffect(() => {
		const atOptions = {
			key: "c4fb4f68e55a97fb9d2e3a15b766087c",
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
			className=" ads border justify-content-center align-items-center text-white text-center"
			ref={banner2}
		>
			<p>Banner 750x90</p>
		</div>
	);
}
