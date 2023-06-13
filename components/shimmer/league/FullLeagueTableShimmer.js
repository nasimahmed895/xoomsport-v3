import styles from "@/styles/shimmer/FullLeagueTableShimmer.module.css";

export default function LeagueListShimmer() {
	const array = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	return (
		<>
			<div className={`${styles.square} ${styles.shine}`}></div>
			<div className={styles.main__table}>
				<div className={styles.league__list}>
					{array.map((item) => (
						<div className={styles.border_table} key={item}>
							<span className={`${styles.container} ${styles.shine}`}></span>
							<span
								className={`${styles.container} ${styles.shine} ${styles.team_image}`}
							></span>
							<span className={`${styles.container} ${styles.shine}`}></span>
							<span className={`${styles.container} ${styles.shine}`}></span>
							<span className={`${styles.container} ${styles.shine}`}></span>
							<span className={`${styles.container} ${styles.shine}`}></span>
							<span className={`${styles.container} ${styles.shine}`}></span>
							<span className={`${styles.container} ${styles.shine}`}></span>
							<span className={`${styles.container} ${styles.shine}`}></span>
							<span className={`${styles.container} ${styles.shine}`}></span>
						</div>
					))}
				</div>
			</div>
			<br />
		</>
	);
}
