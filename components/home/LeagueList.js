import styles from "@/styles/home/LeagueList.module.css";
import getSlugify from "@/utils/getSlugify";
import Image from "next/image";
import Link from "next/link";
import AdsterraBanner2 from "../AdsterraBanner2";

export default function LeagueList({ heading, allLeagues }) {
	return (
		<>
			<p>Banner 300x160</p>
			<AdsterraBanner2 />
			<div className={`${styles.league__container}`}>
				<div className={`${styles.card__heading}`}>
					<h6 className={styles.card__title}>{heading}</h6>
				</div>

				<div
					className={`${styles.league__list} ${heading == "All Leagues" ? styles.league__list1 : ""
						}`}
				>
					{allLeagues.map((allLeagues) => (
						<div className={`${styles.league__item} `} key={allLeagues.id}>
							<Link
								href={`/league/${getSlugify(allLeagues.name)}/${allLeagues.id}`}
								className="text-dec-none d-flex"
							>
								<Image
									loader={() => allLeagues.logo_path}
									className={styles.league__logo}
									src={allLeagues.logo_path}
									alt="League Logo"
									width={25}
									height={25}
									unoptimized={true}
								/>
								<span className={`${styles.league__title} font-helvetica-medium`}>
									{allLeagues.name}
								</span>
							</Link>
						</div>
					))}
				</div>

			</div>
		</>

	);
}
