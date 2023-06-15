import styles from "@/styles/news/NewsList.module.css";
import slugConvert from "@/utils/getSlugConvert";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

export default function NewsList({ allNews }) {
	function mobile() { }

	return (
		<div className="news_list__container">
			<div className="responsive_top"></div>
			<Link href={`/news/${slugConvert(allNews[0].link)}`}>
				<div className={styles.exclusive_news__container}>
					<div className={styles.thumbnail___wrapper}>
						<Image
							loader={() => allNews[0].image}
							src={allNews[0].image}
							height={200}
							width={300}
							alt="News Thumbnail"
						/>
						<div className={styles.exclusive_status}>
							<span className={styles.live__indicator}>Exclusive</span>
						</div>
					</div>
					<div className={styles.content__wrapper}>
						<span className={styles.news__title}>{allNews[0].title}</span>
						<span className={styles.news__desc}>{allNews[0].description}</span>
					</div>
				</div>
			</Link>
			<p>Native Banner</p>
			<Script
				async="async"
				data-cfasync="false"
				src="//pl19705711.highrevenuegate.com/adc776e4feb8fe47f8b01cad883134cf/invoke.js"
			></Script>
			<div id="container-adc776e4feb8fe47f8b01cad883134cf"></div>
			<div className={styles.news_list__wrapper}>
				{allNews
					.slice(1)
					.reverse()
					.map((news, index) => (
						<div
							className={`${styles.single_news__item} card_item`}
							key={index}
						>
							<Link
								href={`/news/${slugConvert(news.link)}`}
								className="text-dec-none"
							>
								<div>
									<Image
										className={styles.single_video__banner}
										loader={() => news.image}
										src={news.image}
										width="0"
										height="200"
										alt="sport-banner"
									/>
								</div>
								<div className="my-2">
									<span className={styles.single_news__title}>
										{news.title}
									</span>
								</div>
							</Link>
						</div>
					))}
			</div>
		</div>
	);
}
