import useAuthContext from "@/contexts/AuthContext";
import styles from "@/styles/subscription/PremiumPlanModal.module.css";
import { xoomSportUrl } from "@/utils/api/getAxios";
import { stripePayment } from "@/utils/stripe/stripePayment";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Form, Modal } from "react-bootstrap";
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
	const [activePlan, setActivePlan] = useState("yearly");
	const [productId, setProductId] = useState(null);
	const [subscriptionId, setSubscriptionId] = useState(null);
	const [continueBtn, setContinueBtn] = useState(false);
	const { userToken } = useAuthContext();
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

	// Use Effect for Changing Product Id
	useEffect(() => {
		let subscription_plan;
		if (!isLoading) {
			subscription_plan = subscriptions?.data?.data.filter(
				(plan) => plan.name.toLowerCase() == activePlan
			)[0];
		}
		setProductId(subscription_plan?.product_id);
		setSubscriptionId(subscription_plan?.id);
	}, [activePlan, isLoading, subscriptions?.data?.data]);

	// Handle Subscription
	const handleGetSubscription = () => {
		if (userToken) {
			setContinueBtn(true);
			setTimeout(() => {
				setContinueBtn(false);
			}, 3000);
			console.log(productId, "---", subscriptionId);
			stripePayment(productId, subscriptionId);
		} else {
			setShowPremiumPlan(false);
			setShowSignIn(true);
			toast.info("Sign in before take subscription!", {
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
					<div style={{ width: "70%" }}>
						<p className="font-helvetica-bold text-uppercase">
							Get lifetime of premium for $99.99
						</p>
						<span>
							Individual Plan Only. $0.99/ per month after. Terms and Conditions
							Apply. Open only to users who haven{"'"}t tried Premium
						</span>
					</div>
					<div className={styles.premium_heading__right}>
						<div className={styles.rounded_heading}>GET LIFETIME $99.99</div>
					</div>
				</div>
				<div style={{ background: "#fff" }}>
					<div className={styles.triangle}></div>
				</div>

				<div className={styles.body__content}>
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
								subscriptions.data.data.map((plan) => {
									return (
										<div
											key={plan.id}
											className={`${styles.single__plan} ${
												activePlan == plan?.name.toLowerCase()
													? styles.plan__active
													: null
											}`}
											ref={(el) => (planRefs.current[plan?.id] = el)}
											data-product-id={plan?.product_id}
											data-selected={
												activePlan == plan?.name.toLowerCase() ? 1 : 0
											}
											onClick={() => setActivePlan(plan?.name.toLowerCase())}
										>
											<div className={styles.rotate_content}>
												<p>{plan?.name}</p>
												<span>${plan?.price}</span>
												{plan?.name.toLowerCase() == "yearly" && (
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
									id="email"
									placeholder="Enter Coupon Code"
									style={{
										borderTopRightRadius: "5px",
										borderBottomRightRadius: "5px",
									}}
									// isInvalid={errorMessage("email") ? true : false}
									// value={email}
									// onChange={(e) => setEmail(e.target.value)}
									required
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
							<div className={styles.coupon_confirm__btn}>
								<span>Confirm</span>
							</div>
							<div className={styles.coupon__btn} onClick={removeCouponField}>
								<span>Cancel</span>
							</div>
						</div>
					</div>

					{isLoading || subscriptions?.data?.status == false ? (
						<FiLoader
							style={{ color: "#fb0405", width: "30px" }}
							className={`spinner-border ${styles.spinner__border}`}
						/>
					) : (
						subscriptions.data.data.map((plan) => (
							<div
								className={`${styles.why__join} ${
									plan.name.toLowerCase() == activePlan ? "" : "d-none"
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
				</div>
			</Modal.Body>
		</Modal>
	);
}
