import styles from "@/styles/home/TrendingNews.module.css";
import slugConvert from "@/utils/getSlugConvert";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function TrendingNews({ heading, trendingNewsPost }) {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		arrows: false,
	};

	return (
		<div className={`${styles.news_container}`}>
			<div className={styles.card__heading}>
				<h6 className={styles.card__title}>{heading}</h6>
			</div>

			<div className={`${styles.news_list}`}>
				<Slider {...settings}>
					{trendingNewsPost?.slice(0, 5).map((item) => (
						<div key={item}>
							<Link
								href={`/news/${slugConvert(item.link)}`}
								style={{ textDecoration: "none" }}
							>
								<Image
									className={styles.news_thumbnail}
									loader={() => item.image}
									unoptimized={true}
									src={item.image}
									alt="News Thumbnail"
									width={250}
									height={180}
								/>
								<p className={`${styles.news_title} font-helvetica-medium`}>
									{item.title.slice(0, 60)}...
								</p>
								<p className={`${styles.news_title} font-helvetica-medium m-0`}>
									Xoom Sport <span>{moment(item.pubDate).fromNow()}</span>
								</p>
							</Link>
						</div>
					))}
				</Slider>
			</div>
		</div>
	);
	// }
}
