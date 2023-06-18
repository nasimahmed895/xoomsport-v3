import useAuthContext from "@/contexts/AuthContext";
import styles from "@/styles/subscription/PremiumPlanModal.module.css";
import { xoomSportUrl } from "@/utils/api/getAxios";
import { stripePayment } from "@/utils/stripe/stripePayment";
import moment from "moment";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FiLoader } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { TbChecks } from "react-icons/tb";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

export default function PremiumPlansModal({
	showPremiumPlan,
	setShowPremiumPlan,
	setShowSignIn,
}) {
	const couponInputRef = useRef(null);
	const couponTextRef = useRef(null);
	const couponEnterBtnRef = useRef(null);
	const couponCanleBtnRef = useRef(null);
	const [couponText, setCouponText] = useState("");
	const [activePlanDurationType, setActivePlanDurationType] = useState("year");
	const [activePlanDuration, setActivePlanDuration] = useState(1);
	const [productId, setProductId] = useState(null);
	const [subscriptionId, setSubscriptionId] = useState(null);
	const [continueBtn, setContinueBtn] = useState(false);
	const [upgradeBtn, setUpgradeBtn] = useState(false);
	const [monthlySpinner, setMonthlySpinner] = useState(false);
	const [yearlySpinner, setYearlySpinner] = useState(false);
	const [lifetimeSpinner, setLifetimeSpinner] = useState(false);
	const { userToken, user, getUser } = useAuthContext();
	const planRefs = useRef([]);

	const { isLoading, data: subscriptions } = useQuery(
		"subscriptions",
		async () => {
			return await xoomSportUrl.post(`/api/v1/subscriptions`, {
				platform: "web",
			});
		},
		{
			staleTime: 1000 * 60 * 60, // 1 Hour
		}
	);

	const selectActivePlan = (plan) => {
		setActivePlanDuration(plan?.duration);
		setActivePlanDurationType(plan?.duration_type);
	};

	// Use Effect for Changing Product Id
	useEffect(() => {
		let subscription_plan;
		if (!isLoading) {
			subscription_plan = subscriptions?.data?.data?.filter((plan) => {
				return (
					activePlanDurationType == plan?.duration_type &&
					activePlanDuration == plan?.duration
				);
			})[0];
		}
		setProductId(subscription_plan?.product_id);
		setSubscriptionId(subscription_plan?.id);
	}, [
		activePlanDuration,
		activePlanDurationType,
		isLoading,
		subscriptions?.data?.data,
	]);

	// Handle Subscription
	const handleGetSubscription = () => {
		if (userToken) {
			setContinueBtn(true);
			setTimeout(() => {
				setContinueBtn(false);
			}, 5000);
			stripePayment(productId, subscriptionId);
		} else {
			setShowPremiumPlan(false);
			setShowSignIn(true);
			toast.info("Sign in before take subscription!", {
				theme: "dark",
			});
		}
	};

	// Handle Upgration Plan
	const handleUpgration = (duration_type, duration) => {
		setUpgradeBtn(true);
		setTimeout(() => {
			setUpgradeBtn(false);
			setMonthlySpinner(false);
			setYearlySpinner(false);
			setLifetimeSpinner(false);
		}, 5000);

		if (duration_type == "month") {
			setMonthlySpinner(true);
		} else if (duration_type == "year" && duration == 1) {
			setYearlySpinner(true);
		} else {
			setLifetimeSpinner(true);
		}

		const subscription_plan = subscriptions?.data?.data?.filter((plan) => {
			return plan.duration_type == duration_type && plan.duration == duration;
		})[0];
		stripePayment(subscription_plan?.product_id, subscription_plan?.id);
	};

	// Apply Coupon
	const applyCoupon = async () => {
		if (userToken) {
			if (couponText.trim() === "") {
				toast.info("Please, Enter Valid Coupon!", {
					theme: "dark",
				});
			} else {
				await xoomSportUrl
					.post(`/api/v1/subscription_by_code`, {
						platform: "web",
						code: couponText,
					})
					.then((res) => {
						if (res.data.result === false) {
							toast.warn("Invalid or Expired Coupon!", {
								theme: "dark",
							});
						} else {
							getUser();
							setCouponText("");
							setShowPremiumPlan(false);
							toast.success(`You Coupon Package Activated!`, {
								theme: "dark",
							});
						}
					});
			}
		} else {
			setShowPremiumPlan(false);
			setShowSignIn(true);
			toast.info("Sign in Before Apply Coupon!", {
				theme: "dark",
			});
		}
	};

	const showCouponField = () => {
		couponTextRef.current.classList.add("d-none");
		couponInputRef.current.classList.remove("d-none");
		couponEnterBtnRef.current.classList.add("d-none");
		couponCanleBtnRef.current.classList.remove("d-none");
	};

	const removeCouponField = () => {
		setCouponText("");
		couponTextRef.current.classList.remove("d-none");
		couponInputRef.current.classList.add("d-none");
		couponEnterBtnRef.current.classList.remove("d-none");
		couponCanleBtnRef.current.classList.add("d-none");
	};

	return (
		<Modal
			show={showPremiumPlan}
			centered
			className={styles.premium_modal__container}
		>
			<Modal.Header closeButton className={styles.modal__header}>
				<IoClose
					onClick={() => setShowPremiumPlan(false)}
					className={styles.modal_cross__btn}
				/>
				<div className={styles.premium__heading}>
					<span>PREMIUM</span>
				</div>
			</Modal.Header>
			<Modal.Body className={styles.modal__body}>
				<div className={styles.top__header}>
					{userToken &&
					user?.subscription_id != 0 &&
					moment().isBefore(user?.expired_at) ? (
						<div>
							<div className="d-flex justify-content-center">
								{user?.subscription_duration_type == "month" &&
								user?.subscription_duration == 1 ? (
									<Image
										src="/monthly_ball.png"
										width={70}
										height={70}
										alt="Logo"
									/>
								) : user?.subscription_duration_type == "year" &&
								  user?.subscription_duration == 1 ? (
									<Image
										src="/yearly_ball.png"
										width={70}
										height={70}
										alt="Logo"
									/>
								) : user?.subscription_duration_type == "year" &&
								  user?.subscription_duration > 1 ? (
									<Image
										src="/lifetime_ball.png"
										width={70}
										height={70}
										alt="Logo"
									/>
								) : (
									<Image
										src="/daily_weekly_ball.png"
										width={70}
										height={70}
										alt="Logo"
									/>
								)}
							</div>
							<div>
								<h4
									className={`mt-3 ${
										user?.subscription_duration_type == "month" &&
										user?.subscription_duration == 1
											? styles.monthly_premium
											: user?.subscription_duration_type == "year" &&
											  user?.subscription_duration == 1
											? styles.yearly_premium
											: user?.subscription_duration_type == "year" &&
											  user?.subscription_duration > 1
											? styles.lifetime_premium
											: styles.daily_weekly_premium
									} text-uppercase`}
								>
									XOOMSPORT {user?.subscription_name}
								</h4>
								<p className="text-center">
									You are a {user?.subscription_name} member
								</p>
							</div>
						</div>
					) : (
						<>
							<div style={{ width: "70%" }}>
								<p className="font-helvetica-bold text-uppercase">
									Get lifetime of premium for $99.99
								</p>
								<span>
									Individual Plan Only. $0.99/ per month after. Terms and
									Conditions Apply. Open only to users who haven{"'"}t tried
									Premium
								</span>
							</div>
							<div className={styles.premium_heading__right}>
								<div className={styles.rounded_heading}>
									GET LIFETIME $99.99
								</div>
							</div>
						</>
					)}
				</div>

				<div className={styles.body__content}>
					{userToken && user?.subscription_id != 0 ? (
						<>
							<div className={styles.premium__restore}>
								<p>Your Plan</p>
							</div>

							<div className="mt-3 mb-4 ms-3 d-flex align-items-center">
								<div>
									<div
										className={
											user?.subscription_duration_type == "month" &&
											user?.subscription_duration == 1
												? styles.monthly_premium_border
												: user?.subscription_duration_type == "year" &&
												  user?.subscription_duration == 1
												? styles.yearly_premium_border
												: user?.subscription_duration_type == "year" &&
												  user?.subscription_duration > 1
												? styles.lifetime_premium_border
												: styles.daily_weekly_premium_border
										}
									>
										{user?.subscription_duration_type == "month" &&
										user?.subscription_duration == 1 ? (
											<Image
												src="/monthly_ball.png"
												width={45}
												height={45}
												alt="Logo"
											/>
										) : user?.subscription_duration_type == "year" &&
										  user?.subscription_duration == 1 ? (
											<Image
												src="/yearly_ball.png"
												width={45}
												height={45}
												alt="Logo"
											/>
										) : user?.subscription_duration_type == "year" &&
										  user?.subscription_duration > 1 ? (
											<Image
												src="/lifetime_ball.png"
												width={45}
												height={45}
												alt="Logo"
											/>
										) : (
											<Image
												src="/daily_weekly_ball.png"
												width={45}
												height={45}
												alt="Logo"
											/>
										)}
									</div>
								</div>
								<div>
									<h5 className="mb-0 ms-3 text-uppercase">
										Xoom {user?.subscription_name}
									</h5>
									<p className="mb-0 ms-3">
										No Ad Interruptions, 2x Video than without Signup
									</p>
								</div>
							</div>

							{/* Check is it lifetime package or not */}
							{!(
								user?.subscription_duration_type == "year" &&
								user?.subscription_duration > 1
							) && (
								<div className={styles.premium__restore}>
									<p>Enlighten Plan</p>
								</div>
							)}

							{/* Check is it monthly package or not */}
							{!(
								user?.subscription_duration_type == "month" &&
								user?.subscription_duration == 1
							) &&
								!(
									user?.subscription_duration_type == "year" &&
									user?.subscription_duration == 1
								) &&
								!(
									user?.subscription_duration_type == "year" &&
									user?.subscription_duration > 1
								) && (
									<div className="mt-3 ms-3 mb-3 d-flex align-items-center position-relative">
										<div>
											<div className={styles.monthly_premium_border}>
												<Image
													src="/monthly_ball.png"
													width={45}
													height={45}
													alt="Logo"
												/>
											</div>
										</div>
										<div>
											<h5 className="mb-0 ms-3 text-uppercase">Xoom Monthly</h5>
											<p className="mb-0 ms-3">
												No Ad Interruptions, 2x Video than without Signup
											</p>
										</div>
										<div className={styles.upgrade_btn}>
											<Button
												onClick={() => handleUpgration("month", 1)}
												type="button"
												className="btn btn-dark btn-sm d-flex align-items-center"
												disabled={upgradeBtn}
											>
												{monthlySpinner && (
													<FiLoader
														style={{ color: "#fb0405", width: "20px" }}
														className={`spinner-border ${styles.spinner__border}`}
													/>
												)}
												UPGRADE
											</Button>
										</div>
									</div>
								)}

							{/* Check is it yearly package or not */}
							{!(
								user?.subscription_duration_type == "year" &&
								user?.subscription_duration == 1
							) &&
								!(
									user?.subscription_duration_type == "year" &&
									user?.subscription_duration > 1
								) && (
									<div className="mt-3 ms-3 mb-3 d-flex align-items-center position-relative">
										<div>
											<div className={styles.yearly_premium_border}>
												<Image
													src="/yearly_ball.png"
													width={45}
													height={45}
													alt="Logo"
												/>
											</div>
										</div>
										<div>
											<h5 className="mb-0 ms-3 text-uppercase">Xoom Yearly</h5>
											<p className="mb-0 ms-3">
												No Ad Interruptions, 2x Video than without Signup
											</p>
										</div>
										<div className={styles.upgrade_btn}>
											<Button
												onClick={() => handleUpgration("year", 1)}
												type="button"
												className="btn btn-dark btn-sm d-flex align-items-center"
												disabled={upgradeBtn}
											>
												{yearlySpinner && (
													<FiLoader
														style={{ color: "#fb0405", width: "20px" }}
														className={`spinner-border ${styles.spinner__border}`}
													/>
												)}
												UPGRADE
											</Button>
										</div>
									</div>
								)}

							{/* Check is it lifetime package or not */}
							{!(
								user?.subscription_duration_type == "year" &&
								user?.subscription_duration > 1
							) && (
								<div className="mt-3 ms-3 mb-3 d-flex align-items-center position-relative">
									<div>
										<div className={styles.lifetime_premium_border}>
											<Image
												src="/lifetime_ball.png"
												width={45}
												height={45}
												alt="Logo"
											/>
										</div>
									</div>
									<div>
										<h5 className="mb-0 ms-3 text-uppercase">Xoom Lifetime</h5>
										<p className="mb-0 ms-3">
											No Ad Interruptions, 2x Video than without Signup
										</p>
									</div>
									<div className={styles.upgrade_btn}>
										<Button
											onClick={() => handleUpgration("year", 100)}
											type="button"
											className="btn btn-dark btn-sm d-flex align-items-center"
											disabled={upgradeBtn}
										>
											{lifetimeSpinner && (
												<FiLoader
													style={{ color: "#fb0405", width: "20px" }}
													className={`spinner-border ${styles.spinner__border}`}
												/>
											)}
											UPGRADE
										</Button>
									</div>
								</div>
							)}
						</>
					) : (
						<>
							<div className={styles.premium__restore}>
								<p>Pick your plan</p>
							</div>

							<div className={styles.premium_plan__wrapper}>
								<div className={styles.premium__plans}>
									{isLoading || subscriptions?.data?.status == false ? (
										<FiLoader
											style={{ color: "#fb0405", width: "30px" }}
											className={`spinner-border ${styles.spinner__border}`}
										/>
									) : (
										subscriptions?.data?.data?.map((plan) => {
											return (
												<div
													key={plan.id}
													className={`${styles.single__plan} ${
														activePlanDurationType == plan?.duration_type &&
														activePlanDuration == plan?.duration
															? styles.plan__active
															: null
													}`}
													ref={(el) => (planRefs.current[plan?.id] = el)}
													onClick={() => selectActivePlan(plan)}
												>
													<div className={styles.rotate_content}>
														<p>{plan?.name}</p>
														<span>${plan?.price}</span>
														{activePlanDurationType == plan?.duration_type &&
															activePlanDuration == plan?.duration && (
																<p>(Save 16%)</p>
															)}
													</div>
												</div>
											);
										})
									)}
								</div>
							</div>

							<div className={styles.continue__container}>
								<div className={styles.continue__wrapper}>
									<button
										onClick={handleGetSubscription}
										className="btn text-white text-uppercase btn-sm border-0 d-flex align-items-center"
										disabled={continueBtn}
									>
										{continueBtn && (
											<FiLoader
												className={`spinner-border ${styles.spinner__border}`}
											/>
										)}
										Continue
									</button>
								</div>
							</div>

							<div className={styles.apply__coupon}>
								<div ref={couponTextRef}>
									<p className="font-helvetica-medium text-uppercase">
										Have a coupon code?
									</p>
								</div>

								<div className="w-50 d-none" ref={couponInputRef}>
									<Form>
										<Form.Control
											type="text"
											id="coupon"
											placeholder="Enter Coupon Code"
											style={{
												borderTopRightRadius: "5px",
												borderBottomRightRadius: "5px",
											}}
											value={couponText}
											onChange={(e) => setCouponText(e.target.value)}
											maxLength={10}
										/>
									</Form>
								</div>
								<div
									className={styles.coupon__btn}
									ref={couponEnterBtnRef}
									onClick={showCouponField}
								>
									<span>Enter</span>
								</div>
								<div className="d-flex d-none" ref={couponCanleBtnRef}>
									<button
										className={styles.coupon_confirm__btn}
										onClick={applyCoupon}
									>
										<span>Confirm</span>
									</button>
									<button
										className={styles.coupon__btn}
										onClick={removeCouponField}
									>
										<span>Cancel</span>
									</button>
								</div>
							</div>

							{isLoading || subscriptions?.data?.status == false ? (
								<FiLoader
									style={{ color: "#fb0405", width: "30px" }}
									className={`spinner-border ${styles.spinner__border}`}
								/>
							) : (
								subscriptions?.data?.data?.map((plan) => (
									<div
										className={`${styles.why__join} ${
											activePlanDurationType == plan?.duration_type &&
											activePlanDuration == plan?.duration
												? ""
												: "d-none"
										}`}
										key={plan?.id}
									>
										<ul className={styles.join_check__list}>
											<p className="font-helvetica-medium text-uppercase m-0">
												Why join xoomsport premium?
											</p>
											{JSON.parse(plan.description).map((text, index) => (
												<li className="mb-1" key={index}>
													<TbChecks className={styles.checkIcon} />{" "}
													{text.description}
												</li>
											))}
										</ul>
										<div>
											<Image
												src="/artboard4.png"
												width={180}
												height={180}
												alt="Logo"
											/>
										</div>
									</div>
								))
							)}
						</>
					)}
				</div>
			</Modal.Body>
		</Modal>
	);
}
