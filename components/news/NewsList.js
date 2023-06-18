import useAdsContext from "@/contexts/AdsContext";
import styles from "@/styles/news/NewsList.module.css";
import slugConvert from "@/utils/getSlugConvert";
import Image from "next/image";
import { useRouter } from "next/router";
import Script from "next/script";

export default function NewsList({ allNews }) {
	// ads handle function
	const router = useRouter();
	const { counter, setCounter } = useAdsContext();
	const adDisplayFrequency = 2; // Show ad every 2 clicks

	const openInNewTab = (url) => {
		setCounter((prev) => prev + 1);
		if (counter % adDisplayFrequency === 1) {
			// href={`/news/${slugConvert(allNews[0].link)}`}
			router.push(url);
			window.open(
				"https://www.highrevenuegate.com/gtkxb6dc1?key=c836ecdf6d651783b8d7e1b50ca1bae1"
			);
		} else {
			router.push(url);
		}
	};
	// ads handle function

	return (
		<div className="news_list__container">
			<div className="responsive_top"></div>
			<a onClick={() => openInNewTab(`/news/${slugConvert(allNews[0].link)}`)}>
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
			</a>
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
							<a
								onClick={() => openInNewTab(`/news/${slugConvert(news.link)}`)}
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
							</a>
						</div>
					))}
			</div>
		</div>
	);
}
