import styles from "@/styles/shimmer/news/NewsShimmer.module.css";

export default function NewsShimmer() {
	const allNews = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	// return "ddd";
	return (
		<div className="news_list__container">
			<div className="responsive_top"></div>
			<div className={`${styles.content} row`}>
				<div className="col-6">
					<div className={`${styles.image} ${styles.shine}`}></div>
				</div>
				<div className={`${styles.content__wrapper}   col-6`}>
					<span
						className={`${styles.news__title}  ${styles.shine} w-100`}
					></span>
					<span
						className={`${styles.news__title}  ${styles.shine} w-50`}
					></span>
					<span
						className={`${styles.news__title}  ${styles.shine} w-75`}
					></span>
					<span
						className={`${styles.news__title}  ${styles.shine} w-100`}
					></span>
					<span
						className={`${styles.news__title}  ${styles.shine} w-50`}
					></span>
					<span
						className={`${styles.news__title}  ${styles.shine} w-72`}
					></span>
				</div>
			</div>
			<span
				className={`${styles.news__title}  ${styles.shine} w-50 ,my-5`}
			></span>
			<div className={styles.news_list__wrapper}>
				<div className={`${styles.content} row`}>
					{allNews.map((news, index) => (
						<div key={index} className="col-6">
							<div className="row">
								<div className="col-12">
									<div className={`${styles.image} ${styles.shine}`}></div>
								</div>
								<div className={`${styles.content__wrapper}   col-12`}>
									<span
										className={`${styles.news__title}  ${styles.shine} w-100`}
									></span>
									<span
										className={`${styles.news__title}  ${styles.shine} w-50`}
									></span>
									<span
										className={`${styles.news__title}  ${styles.shine} w-75`}
									></span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
