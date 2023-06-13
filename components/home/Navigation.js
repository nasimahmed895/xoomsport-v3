import useAuthContext from "@/contexts/AuthContext";
import styles from "@/styles/home/Navigation.module.css";
import Cookies from "js-cookie";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Badge, NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaCrown } from "react-icons/fa";

export default function Navigation({
	handleSignInShow,
	authenticate,
	setAuthenticate,
	setShowPremiumPlan,
}) {
	const router = useRouter();
	const { setUser, setUserToken, user } = useAuthContext();

	const handleSignOut = () => {
		setUser(null);
		setUserToken(null);
		Cookies.remove("userInfo", { secure: true });
		Cookies.remove("userToken", { secure: true });
		setAuthenticate(false);
	};

	return (
		<>
			<Navbar expand="lg" className={`${styles.nav__style}`}>
				<Container>
					<Link href="/" className="navbar-brand">
						<Image
							src="/static/images/logo.png"
							width={110}
							height={40}
							alt="Brand Logo"
						/>
					</Link>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto align-items-center">
							<Nav.Item>
								<Link
									href="/"
									className={`text-white text-uppercase nav-link pe-0 ps-4 ${
										router.pathname == "/" ? styles.nav__active : null
									}`}
									id={styles.nav_link}
								>
									Matches
								</Link>
							</Nav.Item>

							<Nav.Item>
								<Link
									href="/favorites"
									className={`text-white text-uppercase nav-link pe-0 ps-4 ${
										router.pathname == "/favorites" ? styles.nav__active : null
									}`}
									id={styles.nav_link}
								>
									Favorites
								</Link>
							</Nav.Item>

							<Nav.Item>
								<Link
									href="/watch"
									className={`text-white text-uppercase nav-link pe-0 ps-4 ${
										router.pathname == "/watch" ? styles.nav__active : null
									}`}
									id={styles.nav_link}
								>
									Watch
								</Link>
							</Nav.Item>
							<Nav.Item>
								<Link
									href="/news"
									className={`text-white text-uppercase nav-link pe-0 ps-4 ${
										router.pathname == "/news" ? styles.nav__active : null
									}`}
									id={styles.nav_link}
								>
									News
								</Link>
							</Nav.Item>
							<Nav.Item>
								<span
									className="nav-link pe-0 ps-4 text-white text-uppercase"
									id={styles.nav_link}
									onClick={() => setShowPremiumPlan(true)}
								>
									<FaCrown className={styles.premium__icon} /> Premium
								</span>
							</Nav.Item>

							{authenticate ? (
								user ? (
									<Nav.Item>
										<NavDropdown
											title={
												<div className="border-rounded">
													<Image
														className={styles.navigation_user_image}
														width={0}
														height={0}
														alt="user pic"
														src="/user-white.png"
														unoptimized={true}
													/>
												</div>
											}
											id="basic-nav-dropdown"
											className={`${styles.navigation_dropdown} ps-2`}
										>
											<div className={`${styles.user_top_info} pt-2 pe-4`}>
												<div className={styles.user_profile_pic}>
													<Image
														width={0}
														height={0}
														alt="user pic"
														src="/user-black.png"
														unoptimized={true}
													/>
												</div>
												<div className={`${styles.user_info} ms-1`}>
													<span>{user?.name}</span>
													<span className="text-muted">{user?.email}</span>
												</div>
											</div>
											<div className={`${styles.user_subscription_info} pt-2`}>
												<div>
													<div className={styles.user_profile_pic}>
														<Image
															width={0}
															height={0}
															alt="user pic"
															src="/package.png"
															unoptimized={true}
														/>
													</div>
												</div>
												<div
													className={`${styles.user_subscription_date} ms-1`}
												>
													{user?.subscription_id != 0 ? (
														<>
															<Badge bg="primary" pill>
																{user?.subscription_name}
															</Badge>

															{user?.subscription_name.toLowerCase() !=
															"lifetime" ? (
																<span className="text-muted">
																	{Math.abs(
																		moment().diff(
																			moment(user?.expired_at),
																			"days"
																		)
																	)}{" "}
																	days left{" "}
																</span>
															) : (
																<span className="text-muted">
																	Never Ending Package
																</span>
															)}
														</>
													) : (
														<>
															<Badge bg="primary" pill>
																{user?.subscription_name}
															</Badge>
															<span className="text-muted">
																No premium plan yet!
															</span>
														</>
													)}
												</div>
											</div>

											<div
												onClick={handleSignOut}
												className={`${styles.dropdown_item_signout} pt-2 pb-2`}
											>
												<div>
													<div className={styles.user_profile_pic}>
														<Image
															width={0}
															height={0}
															alt="user pic"
															src="/sign-out.png"
															unoptimized={true}
														/>
													</div>
												</div>
												<div
													className={`${styles.user_subscription_signout} ms-1`}
												>
													<span className="text-uppercase">Sign Out</span>
												</div>
											</div>
										</NavDropdown>
									</Nav.Item>
								) : (
									<></>
								)
							) : (
								<Nav.Item>
									<span
										className={`text-white text-uppercase nav-link pe-0 ps-4`}
										id={styles.nav_link}
										onClick={handleSignInShow}
									>
										Sign In
									</span>
								</Nav.Item>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}
{
	{
	}
}
