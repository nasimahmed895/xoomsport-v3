import styles from "@/styles/home/Footer.module.css";
import Image from "next/image";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { FaRegCopyright } from "react-icons/fa";

export default function Footer() {
	return (
		<div className={styles.wrapper}>
			<div className="container">
				<Row>
					<Col className="col-3">
						<div>
							<Image
								src="/static/images/logo.png"
								alt=""
								width={100}
								height={50}
							/>
							<h6 className="mt-3">XOOMSPORT is The best Football App</h6>
						</div>
					</Col>
					<Col className="col-3">
						<div>
							<ul>
								<li className={styles.list_item}>
									<Link
										rel="stylesheet"
										href="/"
										className={styles.list_item_link}
									>
										Matches
									</Link>
								</li>
								<li className={styles.list_item}>
									<Link
										rel="stylesheet"
										href="/"
										className={styles.list_item_link}
									>
										Favourites
									</Link>
								</li>
								<li className={styles.list_item}>
									<Link
										rel="stylesheet"
										href="/"
										className={styles.list_item_link}
									>
										Watch
									</Link>
								</li>
								<li className={styles.list_item}>
									<Link
										rel="stylesheet"
										href="/"
										className={styles.list_item_link}
									>
										Live
									</Link>
								</li>
								<li className={styles.list_item}>
									<Link
										rel="stylesheet"
										href="/"
										className={styles.list_item_link}
									>
										News
									</Link>
								</li>
								<li className={styles.list_item}>
									<Link
										rel="stylesheet"
										href="/"
										className={styles.list_item_link}
									>
										Highlights
									</Link>
								</li>
							</ul>
						</div>
					</Col>
					<Col className="col-3">
						<div>
							<h6>Get The App</h6>
							<div>
								<Link href="/" className={styles.iconlink}>
									<span className={styles.icon_outline}>
										<Image
											src="/apple_logo.png"
											alt=""
											className={styles.icon}
											width={40}
											height={40}
										/>
									</span>
								</Link>
								<Link href="/" className={styles.iconlink}>
									<span className={styles.icon_outline}>
										<Image
											src="/playstore.png"
											alt=""
											className={styles.icon}
											width={40}
											height={40}
										/>
									</span>
								</Link>
							</div>
						</div>
					</Col>
					<Col className="col-3">
						<div>
							<h6>Follow Us On</h6>
							<div>
								<Link href="/" className={styles.iconlink}>
									<span className={styles.icon_outline}>
										<Image
											src="/facebook.png"
											alt=""
											className={styles.icon}
											width={40}
											height={40}
										/>
									</span>
								</Link>
								<Link href="/" className={styles.iconlink}>
									<span className={styles.icon_outline}>
										<Image
											src="/twitter.png"
											alt=""
											className={styles.icon}
											width={40}
											height={40}
										/>
									</span>
								</Link>
								<Link href="/" className={styles.iconlink}>
									<span className={styles.icon_outline}>
										<Image
											src="/linkedin.png"
											alt=""
											className={styles.icon}
											width={40}
											height={40}
										/>
									</span>
								</Link>
								<Link href="/" className={styles.iconlink}>
									<span className={styles.icon_outline}>
										<Image
											src="/instagram.png"
											alt=""
											className={styles.icon}
											width={40}
											height={40}
										/>
									</span>
								</Link>
							</div>
						</div>
					</Col>
				</Row>
				<hr />
				<div className="text-center">
					<span>
						<FaRegCopyright />
					</span>{" "}
					Copyright {new Date().getFullYear()} <b>XOOMSPORT</b> All Rights
					Reserved.
				</div>
			</div>
		</div>
	);
}
