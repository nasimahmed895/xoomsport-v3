import useAuthContext from "@/contexts/AuthContext";
import styles from "@/styles/Auth.module.css";
import { xoomSportUrl } from "@/utils/api/getAxios";
import Cookies from "js-cookie";
import { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { FiLoader } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

export default function OTPModalForm({
	showOTP,
	handleOTPClose,
	setAuthenticate,
}) {
	const [otp, setOtp] = useState("");
	const [error, setError] = useState(null);
	const [verifyBtn, setVerifyBtn] = useState(false);
	const [resendBtn, setResendBtn] = useState(false);
	const { setUserToken, setUser, getUser } = useAuthContext();

	const resetOtpHandler = async () => {
		setResendBtn(true);

		try {
			await xoomSportUrl.post("/api/v1/resend_otp").then((res) => {
				if (res?.data?.status) {
					toast.success(res?.data?.message, {
						theme: "dark",
					});
					setOtp("");
					setVerifyBtn(false);
					setResendBtn(false);
				} else {
					setError(res?.data?.message);
					setVerifyBtn(false);
					setResendBtn(false);
				}
			});
		} catch (err) {
			setUserToken(null);
			setUser(null);
		}
	};

	const otpFormSubmitHandler = async (e) => {
		e.preventDefault();
		setVerifyBtn(true);
		const payload = {
			otp,
		};

		try {
			await xoomSportUrl
				.post("/api/v1/email/verification", payload)
				.then((res) => {
					if (res?.data?.status) {
						const { access_token } = res?.data;

						Cookies.remove("tempToken");
						Cookies.set("userToken", access_token, { secure: true });
						setUserToken(access_token);
						getUser();

						toast.success("Sign In Successfully!", {
							theme: "dark",
						});

						setAuthenticate(true);
						setOtp("");
						setError(null);
						setVerifyBtn(false);
						setResendBtn(false);
						handleOTPClose();
					} else {
						setError(res?.data?.message);
						setVerifyBtn(false);
						setResendBtn(false);
					}
				});
		} catch (err) {
			setUserToken(null);
			setUser(null);
		}
	};

	return (
		<Modal show={showOTP} centered className={styles.signin_modal__container}>
			<Modal.Header closeButton className={styles.modal__header}>
				<IoClose onClick={handleOTPClose} className={styles.modal_cross__btn} />
			</Modal.Header>
			<Modal.Body>
				<h4 className="font-helvetica-medium mb-4">OTP Verification</h4>
				<p>One-Time Password has been send to your email.</p>

				<Form onSubmit={otpFormSubmitHandler}>
					<InputGroup className="mb-3">
						<Form.Control
							type="text"
							id="otp"
							placeholder="Enter OTP"
							style={{
								borderTopRightRadius: "5px",
								borderBottomRightRadius: "5px",
							}}
							isInvalid={error ? true : false}
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
							required
						/>
						{error && (
							<Form.Control.Feedback type="invalid">
								{error}
							</Form.Control.Feedback>
						)}
					</InputGroup>
					<div className="d-flex justify-content-around">
						<Button
							variant={`primary mt-3 me-2 text-uppercase d-flex justify-content-center align-items-center`}
							size="sm"
							type="button"
							disabled={resendBtn}
							style={{ width: "45%" }}
							onClick={resetOtpHandler}
						>
							{resendBtn && (
								<FiLoader
									className={`spinner-border ${styles.spinner__border}`}
								/>
							)}
							Resend OTP
						</Button>

						<Button
							variant={`danger mt-3 ${styles.auth_btn}`}
							type="submit"
							disabled={verifyBtn}
							size="sm"
							style={{ width: "45%" }}
						>
							{verifyBtn && (
								<FiLoader
									className={`spinner-border ${styles.spinner__border}`}
								/>
							)}
							Verify OTP
						</Button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
