import styles from "@/styles/shimmer/watch/LiveMatchListShimmer.module.css";

function LiveMatchListShimmer() {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


    return (
        <>
            {array.map((item) => (
                <div key={item} div className="league_wise__live_match" >
                    <div className={`${styles.live_match__heading}`}>
                        <h6 className={`${styles.live_match__title} ${styles.shine}`} style={{ height: "200" }}>

                        </h6>
                        <span className={`${styles.live_match___date} ${styles.shine}`}>
                        </span>
                    </div>
                    <div className="live_match__list">
                        <div className={styles.live_match__item}>
                            <div className={styles.live_match__teams}>
                                <div className={styles.live_match_single__team}>
                                    <span className={`${styles.team_image} ${styles.shine}`}></span>
                                    <span className={`${styles.team__title} ${styles.shine}`}>

                                    </span>
                                </div>
                                <div className={styles.live_match_single__team}>
                                    <span className={`${styles.team_image} ${styles.shine}`}></span>
                                    <span className={`${styles.team__title} ${styles.shine}`}>

                                    </span>
                                </div>
                            </div>
                            <div className={styles.live_match__icon}>
                                <span className={`${styles.team__time} ${styles.shine}`}>

                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </>

    )
}

export default LiveMatchListShimmer