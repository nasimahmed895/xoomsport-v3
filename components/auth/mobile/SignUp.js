import useAuthContext from "@/contexts/AuthContext";
import styles from "@/styles/mobile/Authentication.module.css";
import { xoomSportUrl } from "@/utils/api/getAxios";
import { auth } from "@/utils/firebase/firebase";
import getRandomStr from "@/utils/getRandomStr";
import {
	GoogleAuthProvider,
	OAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { FaApple, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiLoader } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

export default function SignUp() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [signUpBtn, setSignUpBtn] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [googleBtn, setGoogleBtn] = useState(false);
	const [appleBtn, setAppleBtn] = useState(false);

	const [showOTP, setShowOTP] = useState(false);
	const [otp, setOtp] = useState("");
	const [verifyBtn, setVerifyBtn] = useState(false);
	const [resendBtn, setResendBtn] = useState(false);
	const passwordRef = useRef();
	const { setUserToken, setUser, getUser } = useAuthContext();
	const router = useRouter();

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
						const { access_token, data: user } = res?.data;

						setUserToken(access_token);
						getUser();
						Cookies.remove("tempToken");
						Cookies.set("userToken", access_token, { secure: true });

						toast.success("Sign In Successfully!", {
							theme: "dark",
						});

						setOtp("");
						setError(null);
						setVerifyBtn(false);
						setResendBtn(false);
						handleOTPClose();
						router.push("/");
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

	// Handle OTP
	const handleOTPClose = () => setShowOTP(false);

	const googleAuth = new GoogleAuthProvider();
	const appleAuth = new OAuthProvider("apple.com");

	const appleLoginHandler = async () => {
		try {
			const result = await signInWithPopup(auth, appleAuth);
			console.log(result?.user);
			const payload = {
				name: result?.user?.displayName,
				email: result?.user?.email,
				password: result?.user?.uid,
				password_confirmation: result?.user?.uid,
				device_token: result?.user?.accessToken.slice(0, 10),
				provider: "apple",
			};

			await xoomSportUrl.post("/api/v1/signup", payload).then((res) => {
				if (res?.data?.status) {
					const { access_token } = res?.data;

					Cookies.set("userToken", access_token, { secure: true });
					setUserToken(access_token);
					getUser();

					toast.success("Sign In Successfully!", {
						theme: "dark",
					});

					setAuthenticate(true);
					setEmail("");
					setPassword("");
					setError("");
					setSignUpBtn(false);
					handleSignInClose();
					router.push("/");
				} else {
					setError(res?.data?.message);
					setUser(null);
					setUserToken(null);
					setSignUpBtn(false);
				}
			});
		} catch (err) {
			console.log(err);
			setUser(null);
			setUserToken(null);
		}
	};

	const googleLoginHandler = async () => {
		try {
			const result = await signInWithPopup(auth, googleAuth);

			const payload = {
				name: result.user.displayName,
				email: result.user.email,
				password: result.user.uid,
				password_confirmation: result.user.uid,
				device_token: result.user.accessToken.slice(0, 10),
				provider: "google",
			};

			await xoomSportUrl.post("/api/v1/signup", payload).then((res) => {
				if (res?.data?.status) {
					const { access_token } = res?.data;

					Cookies.set("userToken", access_token, { secure: true });
					setUserToken(access_token);
					getUser();

					toast.success("Sign In Successfully!", {
						theme: "dark",
					});

					setEmail("");
					setPassword("");
					setError("");
					setSignUpBtn(false);
					router.push("/");
				} else {
					setError(res?.data?.message);
					setUser(null);
					setUserToken(null);
					setSignUpBtn(false);
				}
			});
		} catch (err) {
			setUser(null);
			setUserToken(null);
		}
	};

	const handleShowPassword = () => {
		if (showPassword) {
			setShowPassword(false);
			passwordRef.current.type = "password";
		} else {
			setShowPassword(true);
			passwordRef.current.type = "text";
		}
	};

	const errorMessage = (context) => {
		switch (context) {
			case "name":
				return error?.name;
			case "email":
				return error?.email;
			case "password":
				return error?.password;
			default:
				return;
		}
	};

	const handleSignUpFormSubmit = async (e) => {
		e.preventDefault();
		setSignUpBtn(true);
		setGoogleBtn(true);
		setAppleBtn(true);

		const payload = {
			name,
			email,
			password,
			password_confirmation: password,
			device_token: getRandomStr(10),
			provider: "email",
		};

		try {
			await xoomSportUrl.post("/api/v1/signup", payload).then((res) => {
				if (res?.data?.status) {
					const { access_token } = res?.data;
					setEmail("");
					setPassword("");
					setName("");
					setSignUpBtn(false);
					setGoogleBtn(false);
					setAppleBtn(false);
					Cookies.set("tempToken", access_token, { secure: true });
					setShowOTP(true);
				} else {
					setError(res?.data?.message);
					setSignUpBtn(false);
					setGoogleBtn(false);
					setAppleBtn(false);
				}
			});
		} catch (err) {
			console.log("Server Issue!");
		}
	};

	return (
		<>
			<div className={`${styles.bg_content} ${styles.content2} px-3`}>
				<div className="mt-4">
					<Image
						src="/signup.png"
						alt="Logo"
						className={styles.signup_logo}
						width={100}
						height={100}
					/>
				</div>
				<Form onSubmit={handleSignUpFormSubmit}>
					<InputGroup className="mb-3 mt-3">
						<Form.Control
							type="text"
							id="name"
							className={styles.form_control}
							placeholder="Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							isInvalid={errorMessage("name") ? true : false}
							required
						/>
						{errorMessage("name") && (
							<Form.Control.Feedback type="invalid">
								{errorMessage("name")[0]}
							</Form.Control.Feedback>
						)}
					</InputGroup>
					<InputGroup className="mb-3">
						<Form.Control
							type="email"
							id="email"
							className={styles.form_control}
							placeholder="Email Address"
							style={{
								borderTopRightRadius: "5px",
								borderBottomRightRadius: "5px",
							}}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							isInvalid={errorMessage("email") ? true : false}
							required
						/>
						{errorMessage("email") && (
							<Form.Control.Feedback type="invalid">
								{errorMessage("email")[0]}
							</Form.Control.Feedback>
						)}
					</InputGroup>
					<InputGroup className="mb-3">
						<Form.Control
							type="password"
							id="password"
							className={styles.form_control}
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							ref={passwordRef}
							style={{
								borderTopRightRadius: "5px",
								borderBottomRightRadius: "5px",
								backgroundImage: "none",
							}}
							required
							isInvalid={errorMessage("password") ? true : false}
							minLength={6}
						/>
						{errorMessage("password") && (
							<Form.Control.Feedback type="invalid">
								{errorMessage("password")[0]}
							</Form.Control.Feedback>
						)}
						{showPassword ? (
							<FaRegEye
								className={styles.password__eye}
								onClick={handleShowPassword}
							/>
						) : (
							<FaRegEyeSlash
								className={styles.password__eye}
								onClick={handleShowPassword}
							/>
						)}
					</InputGroup>
					<Button
						variant={`danger w-100 mt-3 ${styles.auth_btn} d-flex justify-content-center align-items-center`}
						type="submit"
						disabled={signUpBtn}
					>
						{signUpBtn && (
							<FiLoader
								className={`spinner-border ${styles.spinner__border}`}
							/>
						)}
						Sign Up
					</Button>
				</Form>
				<div className="d-flex justify-content-center mt-2">
					<span className={styles.forget_password}>OR</span>
				</div>
				<Button
					variant="primary w-100 mt-3 d-flex justify-content-center align-items-center"
					onClick={googleLoginHandler}
					disabled={googleBtn}
				>
					<FcGoogle className={styles.google_icon} /> Continue with Google
				</Button>
				<Button
					variant="dark w-100 mt-3 d-flex justify-content-center align-items-center"
					onClick={appleLoginHandler}
					disabled={appleBtn}
				>
					<FaApple className={styles.apple_icon} /> Continue with Apple
				</Button>
			</div>

			{/* OTP Modal Responsive Web */}
			<Modal show={showOTP} centered className={styles.signin_modal__container}>
				<Modal.Header closeButton className={styles.modal__header}>
					<IoClose
						onClick={handleOTPClose}
						className={styles.modal_cross__btn}
					/>
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
								Resend OTP
							</Button>

							<Button
								variant={`danger mt-3 ${styles.auth_btn}`}
								type="submit"
								disabled={verifyBtn}
								size="sm"
								style={{ width: "45%" }}
							>
								Verify OTP
							</Button>
						</div>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
}
