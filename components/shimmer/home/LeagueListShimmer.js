import styles from "@/styles/shimmer/home/LeagueListShimmer.module.css";

export default function LeagueListShimmer() {
	const loop = [1, 2, 3, 4, 5, 6, 7];

	return (
		<>
			<div className={`${styles.square} ${styles.shine}`}></div>
			{loop.map((item) => (
				<div key={item}>
					<div className="d-flex align-items-center justify-content-center">
						<div className={`${styles.box} ${styles.shine}`}></div>
						<div className={styles.line__list}>
							<div className={`${styles.shine} ${styles.lines}`}></div>
						</div>
					</div>
					<br />
				</div>
			))}
		</>
	);
}
