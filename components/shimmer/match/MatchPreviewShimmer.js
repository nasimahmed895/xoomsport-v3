import styles from "@/styles/shimmer/match/MatchPreviewShimmer.module.css";
function MatchPreviewShimmer() {
	return (
		<div>
			<div className="d-flex justify-content-between w-95 m-auto mt-4">
				<div>
					<div className={`${styles.match_left}  ${styles.shine}`}></div>
				</div>
				<div className={`${styles.match}`}>
					<span className={`${styles.right_image} ${styles.shine}`}></span>
					<span className={`${styles.right_image} ${styles.shine}`}></span>
					<span className={`${styles.right_image} ${styles.shine}`}></span>
					<span className={`${styles.right_image} ${styles.shine}`}></span>
					<span className={`${styles.right_image} ${styles.shine}`}></span>
					<span className={`${styles.right_image} ${styles.shine}`}></span>
					<span className={`${styles.right_image} ${styles.shine}`}></span>
				</div>

			</div>
			<div className="w-95 m-auto d-flex justify-content-between">
				<div className={`${styles.cursor_wait} d-flex align-items-center my-4`}>
					<div className={`${styles.teamOne} ${styles.shine}`}></div>
					<div className={`${styles.teamOneScor} ${styles.shine}`}></div>
					<div className={`${styles.dash}`}> - </div>
					<div className={`${styles.teamOneScor} ${styles.shine}`}></div>
					<div className={`${styles.teamOne} ${styles.shine}`}></div>
				</div>
				<div className={`${styles.cursor_wait} d-flex align-items-center my-4`}>
					<div className={`${styles.teamOne} ${styles.shine}`}></div>
					<div className={`${styles.teamOneScor} ${styles.shine}`}></div>
					<div className={`${styles.dash}`}> - </div>
					<div className={`${styles.teamOneScor} ${styles.shine}`}></div>
					<div className={`${styles.teamOne} ${styles.shine}`}></div>
				</div>
				<div className={`${styles.cursor_wait} d-flex align-items-center my-4`}>
					<div className={`${styles.teamOne} ${styles.shine}`}></div>
					<div className={`${styles.teamOneScor} ${styles.shine}`}></div>
					<div className={`${styles.dash}`}> - </div>
					<div className={`${styles.teamOneScor} ${styles.shine}`}></div>
					<div className={`${styles.teamOne} ${styles.shine}`}></div>
				</div>
				<div className={`${styles.cursor_wait} d-flex align-items-center my-4`}>
					<div className={`${styles.teamOne} ${styles.shine}`}></div>
					<div className={`${styles.teamOneScor} ${styles.shine}`}></div>
					<div className={`${styles.dash}`}> - </div>
					<div className={`${styles.teamOneScor} ${styles.shine}`}></div>
					<div className={`${styles.teamOne} ${styles.shine}`}></div>
				</div>
				<div className={`${styles.cursor_wait} d-flex align-items-center my-4`}>
					<div className={`${styles.teamOne} ${styles.shine}`}></div>
					<div className={`${styles.teamOneScor} ${styles.shine}`}></div>
					<div className={`${styles.dash}`}> - </div>
					<div className={`${styles.teamOneScor} ${styles.shine}`}></div>
					<div className={`${styles.teamOne} ${styles.shine}`}></div>
				</div>
				<div className={`${styles.cursor_wait} d-flex align-items-center my-4`}>
					<div className={`${styles.teamOne} ${styles.shine}`}></div>
					<div className={`${styles.teamOneScor} ${styles.shine}`}></div>
					<div className={`${styles.dash}`}> - </div>
					<div className={`${styles.teamOneScor} ${styles.shine}`}></div>
					<div className={`${styles.teamOne} ${styles.shine}`}></div>
				</div>
				<div className={`${styles.cursor_wait} d-flex align-items-center my-4`}>
					<div className={`${styles.teamOne} ${styles.shine}`}></div>
					<div className={`${styles.teamOneScor} ${styles.shine}`}></div>
					<div className={`${styles.dash}`}> - </div>
					<div className={`${styles.teamOneScor} ${styles.shine}`}></div>
					<div className={`${styles.teamOne} ${styles.shine}`}></div>
				</div>
			</div>
		</div>
	);
}

export default MatchPreviewShimmer;
