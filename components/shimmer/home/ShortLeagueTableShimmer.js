import styles from "@/styles/shimmer/home/ShortLeagueTableShimmer.module.css";

export default function ShortLeagueTableShimmer() {
	const loop = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	return (
		<>
			<div
				className={`${styles.league_table_heading__square} ${styles.shine} mb-2`}
			></div>
			{loop.map((item) => (
				<div key={item} className="d-flex justify-content-between mb-2">
					<div className="d-flex">
						<div className={`${styles.box} ${styles.shine}`}></div>
						<div
							className={`${styles.league_table_title__square} ${styles.shine}`}
						></div>
					</div>
					<div className="d-flex justify-content-between w-35">
						<div className={`${styles.box} ${styles.shine}`}></div>
						<div className={`${styles.box} ${styles.shine}`}></div>
						<div className={`${styles.box} ${styles.shine}`}></div>
					</div>
				</div>
			))}
		</>
	);
}
{
	{
	}
}
