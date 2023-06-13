import styles from "@/styles/shimmer/league/LeaguePlayerStatsShimmer.module.css";
import { Col, Row } from "react-bootstrap";
export default function LeagueListShimmer() {
	const array = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
	];
	return (
		<Row>
			<Col sm={12} lg={6}>
				<div className={`${styles.square} ${styles.shine}`}></div>
				<div className={styles.main__table}>
					<div className={styles.league__list}>
						{array.map((item) => (
							<div key={item}>
								<div className={styles.border_table}>
									<div className={styles.main_content}>
										<span
											className={`${styles.container} ${styles.shine} ${styles.team_image}`}
										></span>
										<span
											className={`${styles.container} ${styles.shine}`}
										></span>
									</div>
									<div className={styles.main_content}>
										<span
											className={`${styles.container} ${styles.shine} ${styles.team_image}`}
										></span>
										<span
											className={`${styles.container} ${styles.shine}`}
										></span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</Col>

			<Col sm={12} lg={6}>
				<div className={`${styles.square} ${styles.shine}`}></div>
				<div className={styles.main__table}>
					<div className={styles.league__list}>
						{array.map((item) => (
							<div key={item}>
								<div className={styles.border_table}>
									<div className={styles.main_content}>
										<span
											className={`${styles.container} ${styles.shine} ${styles.team_image}`}
										></span>
										<span
											className={`${styles.container} ${styles.shine}`}
										></span>
									</div>
									<div className={styles.main_content}>
										<span
											className={`${styles.container} ${styles.shine} ${styles.team_image}`}
										></span>
										<span
											className={`${styles.container} ${styles.shine}`}
										></span>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</Col>
		</Row>
	);
}
