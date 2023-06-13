import styles from "@/styles/shimmer/home/FixtureListShimmer.module.css";

export default function FixtureListShimmer() {
	const loop = [1, 2, 3, 4, 5, 6, 7];

	return (
		<>
			{loop.map((item) => (
				<div key={item} className={styles.shimmer__wrapper}>
					<div
						className={`${styles.league_title__square} ${styles.shine}`}
					></div>

					<div className={styles.team_container}>
						<div className={`${styles.team_logo__box} ${styles.shine}`}></div>
						<div
							className={`${styles.team_title__square} ${styles.shine}`}
						></div>
						<div className={`${styles.timestamp__box} ${styles.shine}`}></div>
						<div className={`${styles.team_logo__box} ${styles.shine}`}></div>
						<div
							className={`${styles.team_title__square} ${styles.shine}`}
						></div>
					</div>

				</div>
			))}
		</>
	);
}
