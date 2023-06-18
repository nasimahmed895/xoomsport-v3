import { useEffect, useRef } from "react";

export default function AdsterraBanner600() {
	const bannerRef = useRef(null); // Rename the ref to bannerRef

	useEffect(() => {
		const atOptions = {
			key: "a4c10e4ed3f5c6fc87258ced24efbb59",
			format: "iframe",
			height: 100,
			width: 100,
			params: {},
		};

		if (bannerRef.current && !bannerRef.current.firstChild) {
			const conf = document.createElement("script");
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `//www.profitabledisplaynetwork.com/${atOptions.key}/invoke.js`;
			conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;
			bannerRef.current.appendChild(conf); // Use appendChild instead of append
			bannerRef.current.appendChild(script); // Use appendChild instead of append
		}
	}, []); // Removed bannerRef from the dependency array

	return (
		<div
			// Banner 160x600
			className="d-grid justify-content-center align-items-center text-white text-center"
			ref={bannerRef}
		></div>
	);
}
