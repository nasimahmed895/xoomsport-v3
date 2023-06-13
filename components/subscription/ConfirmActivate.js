import useAuthContext from "@/contexts/AuthContext";
import styles from "@/styles/subscription/ConfirmActivate.module.css";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { FiLoader } from "react-icons/fi";
import { IoArrowBackOutline } from "react-icons/io5";

export default function ConfirmActivate({ userInfo }) {
	const [backToBtn, setBackToBtn] = useState(false);
	const { getUser } = useAuthContext();

	const handleBackToHome = () => {
		setBackToBtn(true);
		setTimeout(() => {
			setBackToBtn(false);
		}, 5000);
	};

	useEffect(() => {
		if (Cookies.get("userToken")) {
			getUser();
		}
	}, [getUser]);

	return (
		<Row>
			<Col lg={12} md={12} sm={12}>
				<Card className={`m-auto w-50 ${styles.activateContainer}`}>
					<Card.Body>
						<div className="text-center border-rounded">
							<Image
								src="/activate.png"
								width={0}
								height={0}
								alt="activate comfirm"
								className={styles.activate_icon}
								sizes="100vw"
							/>
						</div>
						<div>
							<h4 className="font-helvetica-medium text-center mt-3 mb-3">
								Thank you for subscribing!
							</h4>
							<p className="text-center">
								You have successfully subscribed & activate your{" "}
								<b>{`"${userInfo?.data?.subscription_name}"`}</b> premium
								package.
							</p>
						</div>
						<div className="text-center mt-5 mb-3">
							<Link href="/">
								<Button
									variant="danger w-50 d-flex align-items-center justify-content-center"
									style={{ backgroundColor: "#fb0405", margin: "auto" }}
									disabled={backToBtn}
									onClick={handleBackToHome}
								>
									{backToBtn && (
										<FiLoader
											className={`spinner-border ${styles.spinner__border}`}
										/>
									)}
									<IoArrowBackOutline
										style={{ fontSize: "20px", marginRight: "5px" }}
									/>{" "}
									Back to Home
								</Button>
							</Link>
						</div>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
}
