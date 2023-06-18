import useAdsContext from "@/contexts/AdsContext";
import styles from "@/styles/watch/LiveMatchList.module.css";
import getSlugify from "@/utils/getSlugify";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import Script from "next/script";
import React from "react";
import CountDownDate from "../CountDownDate";
import NoDataFound from "../NoDataFound";

export default function LiveMatchList({ liveMatches }) {
	const router = useRouter();
	const { counter, setCounter } = useAdsContext();
	const adDisplayFrequency = 2; // Show ad every 2 clicks

	// ads handle function
	const openInNewTab = (...rest) => {
		setCounter((prev) => prev + 1);
		if (counter % adDisplayFrequency === 1) {
			router.push(
				`watch/live/${getSlugify(rest[0])}-vs-${getSlugify(rest[1])}/${rest[2]}`
			);
			window.open(
				"https://www.highrevenuegate.com/gtkxb6dc1?key=c836ecdf6d651783b8d7e1b50ca1bae1"
			);
		} else {
			router.push(
				`watch/live/${getSlugify(rest[0])}-vs-${getSlugify(rest[1])}/${rest[2]}`
			);
		}
	};

	return (
		<div className="live_match__container">
			{liveMatches.length == 0 ? (
				<NoDataFound data="No Live Content Available!" />
			) : (
				liveMatches.map((item, index) => (
					<React.Fragment key={index}>
						<a
							key={item.id}
							id={item.id}
							rel="stylesheet"
							className="cursor_pointer"
							onClick={() =>
								openInNewTab(item.team_one_name, item.team_two_name, item.id)
							}
						>
							<div className="league_wise__live_match">
								<div className={`${styles.live_match__heading}`}>
									<h6 className={styles.live_match__title}>
										{item.match_title}
									</h6>
									<span className={styles.live_match___date}>
										{moment(item.match_time * 1000).format("MM/MMM/yyyy")}
									</span>
								</div>
								<div className="live_match__list">
									<div className={styles.live_match__item}>
										<div className={styles.live_match__teams}>
											<div className={styles.live_match_single__team}>
												<Image
													className={styles.team__logo}
													loader={() => item.team_one_image}
													src={item.team_one_image}
													width={25}
													height={25}
													alt="Team Logo"
												/>
												<span className={styles.team__title}>
													{item.team_one_name}
												</span>
											</div>
											<div className={styles.live_match_single__team}>
												<Image
													className={styles.team__logo}
													loader={() => item.team_two_image}
													src={item.team_two_image}
													width={25}
													height={25}
													alt="Team Logo"
												/>
												<span className={styles.team__title}>
													{item.team_two_name}
												</span>
											</div>
										</div>
										<div className={styles.live_match__icon}>
											<span className={styles.team__time}>
												{moment(item.match_time * 1000).format("h:mm A")}
											</span>
											<span className={styles.team__time}>
												<CountDownDate date={item.match_time} />
											</span>
										</div>
									</div>
								</div>
							</div>
						</a>
						{index === 2 && (
							<>
								<Script
									async="async"
									data-cfasync="false"
									src="//pl19705711.highrevenuegate.com/adc776e4feb8fe47f8b01cad883134cf/invoke.js"
								></Script>
								<div id="container-adc776e4feb8fe47f8b01cad883134cf"></div>
							</>
						)}
					</React.Fragment>
				))
			)}
		</div>
	);
}
