import styles from "@/styles/shimmer/home/TrendingNewsShimmer.module.css";

export default function LeagueListShimmer() {
	return (
		<>
			<div className={`${styles.square} ${styles.shine}`}></div>
			<div className="d-flex align-items-center justify-content-center">
				<div className={`${styles.news_image} ${styles.shine}`}></div>
			</div>
			<div className={`${styles.news_text1} ${styles.shine}`}></div>
			<div className={`${styles.news_text2} ${styles.shine}`}></div>
			<div className={`${styles.news_text3} ${styles.shine}`}></div>
			<br />
		</>
	);
}
