import { useRef } from "react";

export default function Demo() {
	const abcRefs = useRef([]);
	const arr = [1, 2, 3];

	const handlePTags = (i) => {
		abcRefs.current[i].style.color = "red";
	};

	return (
		<div>
			{arr.map((element, i) => (
				<p
					key={i}
					ref={(el) => (abcRefs.current[i] = el)}
					onClick={() => handlePTags(i)}
				>
					Hello
				</p>
			))}
		</div>
	);
}
