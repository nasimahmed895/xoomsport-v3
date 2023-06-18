import styles from "@/styles/mobile/PremiumPlans.module.css";
import Image from "next/image";
import { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { TbChecks } from "react-icons/tb";

export default function PremiumPlans() {
	const couponInputRef = useRef(null);
	const couponTextRef = useRef(null);
	const couponEnterBtnRef = useRef(null);
	const couponCanleBtnRef = useRef(null);

	const [activePlan, setActivePlan] = useState(2);

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
		<div className={styles.premium_plan__container}>
			<div className={`${styles.premium_plan__header} rotate_main`}>
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
					<div className={styles.hanging__status}>
						<span>Premium</span>
					</div>
				</div>
			</div>

			<div className={styles.middle__body}>
				<div className={styles.premium__restore}>
					<p>Pick your plan</p>
					<div className={styles.restore__btn}>
						<span>Restore</span>
					</div>
				</div>

				<div className={styles.premium_plan__wrapper}>
					<div className={styles.premium__plans}>
						<div
							className={`${styles.single__plan} ${
								activePlan == 1 ? styles.plan__active : null
							}`}
							onClick={() => setActivePlan(1)}
						>
							<div className={styles.rotate_content}>
								<p>Monthly</p>
								<span>$0.99</span>
							</div>
						</div>
						<div
							className={`${styles.single__plan} ${
								activePlan == 2 ? styles.plan__active : null
							}`}
							onClick={() => setActivePlan(2)}
						>
							<div className={styles.rotate_content}>
								<p>Yearly</p>
								<span>$0.99</span>
								<p>(Save 16%)</p>
							</div>
						</div>
						<div
							className={`${styles.single__plan} ${
								activePlan == 3 ? styles.plan__active : null
							}`}
							onClick={() => setActivePlan(3)}
						>
							<div className={styles.rotate_content}>
								<p>Lifetime</p>
								<span>$0.99</span>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.continue__container}>
					<div className={styles.continue__wrapper}>
						<span>Continue</span>
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

				<div className={styles.why__join}>
					<p className="font-helvetica-medium text-uppercase m-0">
						Why join xoomsport premium?
					</p>
					<ul className={styles.join_check__list}>
						<li className="mb-1">
							<TbChecks className={styles.check_icon} /> Watch Highlight matches
							video offline without wifi
						</li>
						<li className="mb-1">
							<TbChecks className={styles.check_icon} /> No Ad Interruption
						</li>
						<li className="mb-1">
							<TbChecks className={styles.check_icon} /> 2x Video than without
							Signup
						</li>
						<li className="mb-1">
							<TbChecks className={styles.check_icon} /> Favorite Live Matches
							and unlimited skips
						</li>
						<li className="mb-1">
							<TbChecks className={styles.check_icon} /> Cancle monthly/yearly
							plans online
						</li>
					</ul>
					<div className={styles.side__image}>
						<Image
							src="/artboard4.png"
							width={0}
							height={0}
							sizes="100vw"
							alt="Brand Logo"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
