import useAuthContext from "@/contexts/AuthContext";
import styles from "@/styles/Auth.module.css";
import { xoomSportUrl } from "@/utils/api/getAxios";
import { auth } from "@/utils/firebase/firebase";
import getRandomStr from "@/utils/getRandomStr";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { FaApple, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiLoader } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

export default function SignInModalForm({
	showSignIn,
	handleSignInClose,
	handleSignUpShow,
	setAuthenticate,
	handleForgetShow,
}) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState({});
	const [showPassword, setShowPassword] = useState(false);
	const [signInBtn, setSignInBtn] = useState(false);
	const [googleBtn, setGoogleBtn] = useState(false);
	const [appleBtn, setAppleBtn] = useState(false);
	const passwordRef = useRef();
	const { setUserToken, setUser, getUser } = useAuthContext();

	const googleAuth = new GoogleAuthProvider();

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

					setAuthenticate(true);
					setEmail("");
					setPassword("");
					setError("");
					setSignInBtn(false);
					handleSignInClose();
				} else {
					setError(res?.data?.message);
					setUser(null);
					setUserToken(null);
					setSignInBtn(false);
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
			case "email":
				return error?.email;
			case "password":
				return error?.password;
			default:
				return;
		}
	};

	const handleSignInFormSubmit = async (e) => {
		e.preventDefault();
		setSignInBtn(true);
		setGoogleBtn(true);
		setAppleBtn(true);

		const payload = {
			email,
			password,
			device_token: getRandomStr(6),
			provider: "email",
		};
		try {
			await xoomSportUrl.post("/api/v1/signin", payload).then((res) => {
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
					setSignInBtn(false);
					setGoogleBtn(false);
					setAppleBtn(false);
					handleSignInClose();
				} else {
					setError(res?.data?.message);
					setSignInBtn(false);
					setGoogleBtn(false);
					setAppleBtn(false);
				}
			});
		} catch (err) {
			setUserToken(null);
			setUser(null);
		}
	};

	const handleSignInCloseBtn = () => {
		setEmail("");
		setPassword("");
		setError(null);
		handleSignInClose();
	};

	const handleSignUpShowBtn = () => {
		setEmail("");
		setPassword("");
		setError(null);
		handleSignUpShow();
	};

	return (
		<Modal
			show={showSignIn}
			centered
			className={styles.signin_modal__container}
		>
			<Modal.Header closeButton className={styles.modal__header}>
				<IoClose
					onClick={handleSignInCloseBtn}
					className={styles.modal_cross__btn}
				/>
				<div
					className={`${styles.hanging_auth_signin} ${styles.hanging_auth_active}`}
				>
					<span className="text-uppercase">Sign In</span>
				</div>
				<div
					className={`${styles.hanging_auth_signup} ${styles.hanging_auth_inactive}`}
					onClick={handleSignUpShowBtn}
				>
					<span className="text-uppercase">Sign Up</span>
				</div>
			</Modal.Header>
			<Modal.Body>
				<h4 className="font-helvetica-medium mb-4">Sign in</h4>
				<Form
					onSubmit={handleSignInFormSubmit}
					className={styles.was_validated}
				>
					<Form.Label htmlFor="email">
						Email<span className="text-danger">*</span>
					</Form.Label>
					<InputGroup className="mb-3">
						<Form.Control
							type="email"
							id="email"
							placeholder="Enter your email"
							style={{
								borderTopRightRadius: "5px",
								borderBottomRightRadius: "5px",
							}}
							isInvalid={errorMessage("email") ? true : false}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						{errorMessage("email") && (
							<Form.Control.Feedback type="invalid">
								{errorMessage("email")[0]}
							</Form.Control.Feedback>
						)}
					</InputGroup>
					<Form.Label htmlFor="password">
						Password<span className="text-danger">*</span>
					</Form.Label>
					<InputGroup className="mb-3 position-relative">
						<Form.Control
							type="password"
							id="password"
							placeholder="Enter your password"
							style={{
								borderTopRightRadius: "5px",
								borderBottomRightRadius: "5px",
								backgroundImage: "none",
							}}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							ref={passwordRef}
							required
							isInvalid={errorMessage("password") ? true : false}
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
					<div className="d-flex justify-content-end">
						<span className={styles.forget_password} onClick={handleForgetShow}>
							Forget Password
						</span>
					</div>
					<Button
						variant={`danger w-100 mt-3 ${styles.auth_btn}`}
						type="submit"
						disabled={signInBtn}
					>
						{signInBtn && (
							<FiLoader
								className={`spinner-border ${styles.spinner__border}`}
							/>
						)}
						Sign In
					</Button>
				</Form>
				<div className="d-flex justify-content-center mt-2">
					<span>OR</span>
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
					disabled={appleBtn}
					onClick={(e) => signOutHandler(e)}
				>
					<FaApple className={styles.apple_icon} /> Continue with Apple
				</Button>
			</Modal.Body>
		</Modal>
	);
}
