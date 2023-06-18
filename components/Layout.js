import styles from "@/styles/Layout.module.css";
import axios, { xoomSportUrl } from "@/utils/api/getAxios";
import Head from "next/head";
import Script from "next/script";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import HeadingAds from "./adsterra/HeadingAds";
import ChangePasswordModalForm from "./auth/ChangePasswordModalForm";
import ForgetPasswordModalForm from "./auth/ForgetPasswordModalForm";
import OTPModalForm from "./auth/OTPModalForm";
import SignInModalForm from "./auth/SignInModalForm";
import SignUpModalForm from "./auth/SignUpModalForm";
import BottomNavigation from "./home/BottomNavigation";
import Footer from "./home/Footer";
import LeagueList from "./home/LeagueList";
import LeagueTable from "./home/LeagueTable";
import Navigation from "./home/Navigation";
import TrendingNews from "./home/TrendingNews";
import LeagueListShimmer from "./shimmer/home/LeagueListShimmer";
import ShortLeagueTableShimmer from "./shimmer/home/ShortLeagueTableShimmer";
import PremiumPlansModal from "./subscription/PremiumPlansModal";
export default function Layout({
	children,
	fullScreen,
	title,
	trendingNewsPost,
	userToken,
}) {
	const [showSignIn, setShowSignIn] = useState(false);
	const [showSignUp, setShowSignUp] = useState(false);
	const [showOTP, setShowOTP] = useState(false);
	const [showForgetPassword, setShowForgetPassword] = useState(false);
	const [showChangePassword, setShowChangePassword] = useState(false);
	const [showPremiumPlan, setShowPremiumPlan] = useState(false);
	const [authenticate, setAuthenticate] = useState(userToken ? true : false);

	const {
		isLoading,
		data: allLeagues,
		isError,
	} = useQuery(
		"leagues",
		async () => {
			return await axios.get(`leagues?include=country,seasons,season&page=1`);
		},
		{
			staleTime: 1000 * 60 * 60, // 1 Hour
		}
	);

	const {
		isLoading: isLoading1,
		data: topLeagueList,
		isError: isError1,
	} = useQuery(
		"topLeagues",
		async () => {
			return await xoomSportUrl.post(`/api/v1/popular_competitions`);
		},
		{
			staleTime: 1000 * 60 * 60, // 1 Hour
		}
	);

	const {
		isLoading: isLoading2,
		data: pointTable,
		isError: isError2,
	} = useQuery(
		"pointTable",
		async () => {
			return await xoomSportUrl.post(`/api/v1/popular_point_table`);
		},
		{
			staleTime: 1000 * 60 * 60, // 1 Hour
		}
	);

	// Handle Singin
	const handleSignInClose = () => setShowSignIn(false);
	const handleSignInShow = () => {
		setShowSignUp(false);
		setShowForgetPassword(false);
		setShowSignIn(true);
	};

	// Handle Singup
	const handleSignUpClose = () => setShowSignUp(false);
	const handleSignUpShow = () => {
		setShowSignIn(false);
		setShowSignUp(true);
	};

	// Handle OTP
	const handleOTPClose = () => setShowOTP(false);
	const handleOTPShow = () => {
		setShowSignUp(false);
		setShowOTP(false);
	};

	// Handle Forget Password
	const handleForgetClose = () => setShowForgetPassword(false);
	const handleForgetShow = () => {
		setShowSignIn(false);
		topLeagues;
		setShowForgetPassword(true);
	};

	// Handle Change Password
	const handleChangeShow = () => {
		setShowForgetPassword(false);
		setShowChangePassword(true);
	};

	let topLeagues = [];

	if (!isLoading) {
		if (allLeagues?.data?.data !== undefined) {
			allLeagues?.data?.data.sort((a, b) => a.name.localeCompare(b.name));
		} else {
			toast.info("Please check your internet connetion or try again!", {
				theme: "dark",
			});
		}
	}

	if (isError) {
		toast.info("Please check your internet connetion or try again!", {
			theme: "dark",
		});
	}

	return (
		<>
			<Head>
				<title>{`XOOMSPORT - ${title}`}</title>
			</Head>
			{/* -------- Navigation -------- */}
			<Navigation
				handleSignInShow={handleSignInShow}
				authenticate={authenticate}
				setAuthenticate={setAuthenticate}
				setShowPremiumPlan={setShowPremiumPlan}
			/>
			<BottomNavigation
				authenticate={authenticate}
				setAuthenticate={setAuthenticate}
			/>
			{/* -------- Main Content -------- */}

			<Container className={`${styles.main__container}`}>
				{/* HeadingAds */}
				<HeadingAds />
				<Row>
					{fullScreen ? (
						<Col
							lg={12}
							md={12}
							sm={12}
							className={`${styles.full_middle__container}`}
						>
							{children}
						</Col>
					) : (
						<>
							<Col
								lg={3}
								md={12}
								sm={12}
								className={`mb-4 ${styles.left_column}`}
							>
								{isLoading1 ||
								isError1 ||
								topLeagueList?.data?.data == undefined ? (
									<LeagueListShimmer />
								) : (
									<>
										<LeagueList
											heading="Top Leagues"
											allLeagues={topLeagueList?.data?.data}
										/>
									</>
								)}

								{isLoading || isError || allLeagues?.data?.data == undefined ? (
									<LeagueListShimmer />
								) : (
									<LeagueList
										heading="All Leagues"
										allLeagues={allLeagues?.data?.data}
									/>
								)}
							</Col>

							<Col
								lg={6}
								md={12}
								sm={12}
								className={`${styles.middle__container}`}
							>
								{children}
							</Col>

							<Col
								lg={3}
								md={12}
								sm={12}
								className={`mb-4 ${styles.right_column}`}
							>
								<TrendingNews
									heading="Trending News"
									trendingNewsPost={trendingNewsPost}
								/>

								{isLoading2 ||
								isError2 ||
								pointTable?.data?.data == undefined ? (
									<ShortLeagueTableShimmer />
								) : (
									<LeagueTable pointTableData={pointTable?.data?.data} />
								)}
							</Col>
						</>
					)}
				</Row>

				{/* Sign In Modal */}
				<SignInModalForm
					showSignIn={showSignIn}
					handleSignInClose={handleSignInClose}
					handleSignInShow={handleSignInShow}
					handleSignUpShow={handleSignUpShow}
					setAuthenticate={setAuthenticate}
					handleForgetShow={handleForgetShow}
				/>

				{/* Sign Up Modal */}
				<SignUpModalForm
					showSignUp={showSignUp}
					handleSignUpClose={handleSignUpClose}
					handleSignUpShow={handleSignUpShow}
					handleSignInShow={handleSignInShow}
					setAuthenticate={setAuthenticate}
					setShowOTP={setShowOTP}
				/>

				{/* OTP Verification Modal */}
				<OTPModalForm
					showOTP={showOTP}
					handleOTPClose={handleOTPClose}
					handleOTPShow={handleOTPShow}
					setAuthenticate={setAuthenticate}
				/>

				{/* Forget Password */}
				<ForgetPasswordModalForm
					showForgetPassword={showForgetPassword}
					handleForgetClose={handleForgetClose}
					handleSignInShow={handleSignInShow}
					handleChangeShow={handleChangeShow}
				/>

				{/* Change Password */}
				<ChangePasswordModalForm
					showChangePassword={showChangePassword}
					setShowChangePassword={setShowChangePassword}
					setAuthenticate={setAuthenticate}
				/>

				{/* Premium Plan */}
				<PremiumPlansModal
					showPremiumPlan={showPremiumPlan}
					setShowPremiumPlan={setShowPremiumPlan}
					setShowSignIn={setShowSignIn}
				/>
				<ToastContainer position="bottom-right" />
			</Container>
			<Script
				type="text/javascript"
				src="//pl19706691.highrevenuegate.com/37/89/0a/37890a5064b6650b9adfff77672a0fc4.js"
			></Script>
			<Footer />
		</>
	);
}
