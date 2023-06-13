import useAuthContext from "@/contexts/AuthContext";
import styles from "@/styles/home/BottomNavigation.module.css";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import { MdNotes } from "react-icons/md";

export default function BottomNavigation({
	userInfo,
	authenticate,
	setAuthenticate,
}) {
	const [showSidNavbar, setshowSidNavbar] = useState(false);
	const { setUser, setUserToken } = useAuthContext();
	const navSideBar = useRef(null);
	const router = useRouter();
	let userInformation = "";

	if (userInfo) {
		userInformation = JSON.parse(userInfo);
	}

	const handleSignOut = () => {
		setUser(null);
		setUserToken(null);
		Cookies.remove("userInfo", { secure: true });
		Cookies.remove("userToken", { secure: true });
		setAuthenticate(false);
	};

	const handleNav = () => {
		if (showSidNavbar) {
			navSideBar.current.classList.add("left_menu_show");
			setshowSidNavbar(false);
		} else {
			navSideBar.current.classList.remove("left_menu_show");
			setshowSidNavbar(true);
		}
	};

	const showBottomNav = (pathname) => {
		if (
			pathname == "/" ||
			pathname == "/favorites" ||
			pathname == "/watch" ||
			pathname == "/news" ||
			pathname == "/mobile/subscription"
		) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<>
			<header
				className={`${styles.header} ${styles.bottom_navigation}`}
				id="header"
			>
				<nav
					className={`${styles.nav} container ${
						showBottomNav(router.pathname) ? "" : "d-none"
					}`}
				>
					<Link href="/" className={styles.nav__logo}>
						<span style={{ color: "#fd0000" }}>X</span>OOMSPORT
					</Link>
					<div className={styles.nav__menu} id="nav-menu">
						<ul className={styles.nav__list}>
							<li className={styles.nav__item}>
								<Link
									href="/"
									className={`${styles.nav__link} ${
										router.pathname == "/" ? styles.active_link : null
									}`}
								>
									{router.pathname == "/" ? (
										<Image
											className={styles.nav__icon}
											src="/soccer_red.png"
											alt="Icon"
											width={21}
											height={21}
										/>
									) : (
										<Image
											className={styles.nav__icon}
											src="/soccer_field.png"
											alt="Icon"
											width={21}
											height={21}
										/>
									)}
									<span className={styles.nav__name}>Home</span>
								</Link>
							</li>
							<li className={styles.nav__item}>
								<Link
									href="/favorites"
									className={`${styles.nav__link} ${
										router.pathname == "/favorites" ? styles.active_link : null
									}`}
								>
									{router.pathname == "/favorites" ? (
										<Image
											className={styles.nav__icon}
											src="/static/images/favorite_red.png"
											alt="League Logo"
											width={21}
											height={21}
										/>
									) : (
										<Image
											className={styles.nav__icon}
											src="/static/images/favorite.png"
											alt="League Logo"
											width={21}
											height={21}
										/>
									)}
									<span className={styles.nav__name}>Favorites</span>
								</Link>
							</li>
							<li className={styles.nav__item}>
								<Link
									href="/watch"
									className={`${styles.nav__link} ${
										router.pathname == "/watch" ? styles.active_link : null
									}`}
								>
									{router.pathname == "/watch" ? (
										<Image
											className={styles.nav__icon}
											src="/static/images/watch_red.png"
											alt="League Logo"
											width={21}
											height={21}
										/>
									) : (
										<Image
											className={styles.nav__icon}
											src="/static/images/watch.png"
											alt="League Logo"
											width={21}
											height={21}
										/>
									)}
									<span className={styles.nav__name}>Watch</span>
								</Link>
							</li>
							<li className={styles.nav__item}>
								<Link
									href="/news"
									className={`${styles.nav__link} ${
										router.pathname == "/news" ? styles.active_link : null
									}`}
								>
									{router.pathname == "/news" ? (
										<Image
											className={styles.nav__icon}
											src="/static/images/news_red.png"
											alt="League Logo"
											width={21}
											height={21}
										/>
									) : (
										<Image
											className={styles.nav__icon}
											src="/static/images/news-tab.png"
											alt="League Logo"
											width={21}
											height={21}
										/>
									)}
									<span className={styles.nav__name}>News</span>
								</Link>
							</li>
							<li className={styles.nav__item}>
								<Link
									href="/mobile/subscription"
									className={`${styles.nav__link} ${
										router.pathname == "/mobile/subscription"
											? styles.active_link_premium
											: null
									}`}
								>
									<Image
										className={styles.nav__icon}
										src="/static/images/crown.png"
										alt="League Logo"
										width={21}
										height={21}
									/>
									<span className={styles.nav__name}>Premium</span>
								</Link>
							</li>
						</ul>
					</div>
					<MdNotes
						className={styles.nav__img}
						onClick={handleNav}
						// ref={navIcon}
					/>
				</nav>
			</header>

			<div className={styles.left_main}>
				<div
					className={`${styles.left_nav_bar} `}
					ref={navSideBar}
					id="nav-menu"
				>
					<div className={styles.left_content}>
						<div className={`${styles.side_header} mt-3`}>
							<Image
								src="/static/images/logo.png"
								width={150}
								height={60}
								alt="Brand Logo"
							/>
							{authenticate ? (
								<>
									<div className={styles.user_profile__pic}>
										<Image
											src="/static/images/profile-pic.png"
											width={0}
											height={0}
											alt="Profile Pic"
											sizes="100vw"
											style={{ width: "100%", height: "auto" }}
										/>
									</div>
									<div className="d-flex justify-content-between align-items-center">
										<div>
											<div className="mt-3 fw-bold">{userInformation.name}</div>
											<div>{userInformation.email}</div>
										</div>
										<div onClick={handleSignOut}>
											<Image
												src="/static/images/on-off-button.png"
												width={0}
												height={0}
												alt="Profile Pic"
												sizes="100vw"
												style={{
													width: "100%",
													height: "20px",
													marginTop: "20px",
												}}
											/>
										</div>
									</div>
								</>
							) : (
								<div className={styles.auth_link}>
									<Link href="/mobile/authentication"> Login or Register</Link>
								</div>
							)}
						</div>
						<div className={styles.side_support}>
							<h6>Support</h6>
							<ul>
								<li className={styles.support_link}>
									<Link href="/" className="text-dec-none">
										Support & Contact
										<IoArrowForward className={styles.arrow__icon} />
									</Link>
								</li>
								<li className={styles.support_link}>
									<Link href="/" className="text-dec-none">
										Terms of Use
										<IoArrowForward className={styles.arrow__icon} />
									</Link>
								</li>
								<li className={styles.support_link}>
									<Link href="/" className="text-dec-none">
										Privacy & Policy
										<IoArrowForward className={styles.arrow__icon} />
									</Link>
								</li>
							</ul>
						</div>
						<div className={styles.side_footer}>
							<p style={{ color: "#fb0405" }}>Copyright &copy; Xoomsport</p>
							<p>All right reserved.</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
