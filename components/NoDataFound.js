import Image from "next/image";

export default function NoDataFound({ data }) {
	if (data) {
		return (
			<div className="match__not_found">
				<Image
					src="/vector_matches_fav.png"
					alt="Not Found Logo"
					width={300}
					height={300}
				/>
				<p>{data}</p>
			</div>
		);
	} else {
		return (
			<div className="match__not_found">
				<Image
					src="/vector_matches_fav.png"
					alt="Not Found Logo"
					width={300}
					height={300}
				/>
				<p>No Data Found!</p>
			</div>
		);
	}
}
