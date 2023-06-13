
import styles from "@/styles/shimmer/team/TeamOverviewShimmer.module.css";
function TeamOverviewShimmer() {
    return (
        <div>
            <div className={`${styles.hadding} ${styles.shine} w-100 my-3`}></div>
            <div className="d-flex justify-content-between w-75 m-auto align-items-center">
                <div className={`${styles.post} ${styles.shine}`} ></div>
                <div className="d-flex align-items-center">
                    <span className={`${styles.logo} ${styles.shine}`} ></span>
                    <span className={`${styles.name} ${styles.shine}`} ></span>
                </div>
                <div className={`${styles.tiem} ${styles.shine}`} ></div>
                <div className="d-flex align-items-center">
                    <span className={`${styles.logo} ${styles.shine}`} ></span>
                    <span className={`${styles.name} ${styles.shine}`} ></span>
                </div>
                <div className={`${styles.name} ${styles.shine}`} ></div>

            </div>
            <div className={`${styles.hadding} ${styles.shine} w-100 my-3`}></div>
            <div className="d-flex align-items-center">
                <div className={styles.content}>
                    <div className={`${styles.scor} ${styles.shine}`}></div>
                    <div className={`${styles.logo} ${styles.shine}`}></div>
                </div>
                <div className={styles.content}>
                    <div className={`${styles.scor} ${styles.shine}`}></div>
                    <div className={`${styles.logo} ${styles.shine}`}></div>
                </div>
                <div className={styles.content}>
                    <div className={`${styles.scor} ${styles.shine}`}></div>
                    <div className={`${styles.logo} ${styles.shine}`}></div>
                </div>
                <div className={styles.content}>
                    <div className={`${styles.scor} ${styles.shine}`}></div>
                    <div className={`${styles.logo} ${styles.shine}`}></div>
                </div>
                <div className={styles.content}>
                    <div className={`${styles.scor} ${styles.shine}`}></div>
                    <div className={`${styles.logo} ${styles.shine}`}></div>
                </div>
            </div>
        </div>
    )
}

export default TeamOverviewShimmer