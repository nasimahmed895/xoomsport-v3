import styles from "@/styles/news/NewsList.module.css";
import he from "he";
import Image from "next/image";
import { useRouter } from "next/router";
import { HiArrowLeft } from "react-icons/hi";
import AdsterraBanner320 from "../adsterra/AdsterraBanner320";
import AdsterraBanner600 from "../adsterra/AdsterraBanner600";
import AdsterraBanner300 from "../adsterra/AdsterraBanner300";
export default function NewsDetails({ newsDetailsPost }) {
	const router = useRouter();

	return (
		<div className={`${styles.adscontent}`}>
			<div>
				AdsterraBanner600
				<AdsterraBanner600 />
			</div>
			<div className={`${styles.news_details__container}`}>
				<div className="fixt_top_content">
					<HiArrowLeft className="backArrowBtn" onClick={() => router.back()} />
					{newsDetailsPost.link}
					<div className={styles.marquee_content}>
						<marquee>{he.decode(newsDetailsPost.title)}</marquee>
					</div>
				</div>

				<div className="news__poster">
					<Image
						className={styles.single_video__banner_details}
						loader={() => newsDetailsPost.image}
						src={newsDetailsPost.image}
						width="300"
						height="200"
						alt="sport-banner"
					/>
				</div>
				<div className={styles.news_details__wrapper}>
					<span className={styles.news__title_details}>
						{he.decode(newsDetailsPost.title)}
					</span>
					{newsDetailsPost.desc.map((item, index) => (
						<span className="news__desc" key={item}>
							{item.details}
							<br />
							<br />
							{index === 2 && (
								<>
									<AdsterraBanner320 />
								</>
							)}
						</span>
					))}
				</div>
			</div>
			<div>
				AdsterraBanner600
				<AdsterraBanner300 />
			</div>
		</div>

	);
}
