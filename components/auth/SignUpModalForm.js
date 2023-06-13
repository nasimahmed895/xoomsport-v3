import useAuthContext from "@/contexts/AuthContext";
import styles from "@/styles/Auth.module.css";
import { xoomSportUrl } from "@/utils/api/getAxios";
import { auth } from "@/utils/firebase/firebase";
import getRandomStr from "@/utils/getRandomStr";
import {
	GoogleAuthProvider,
	OAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { FaApple, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiLoader } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

export default function SignUpModalForm({
	showSignUp,
	handleSignUpClose,
	handleSignInShow,
	setAuthenticate,
	setShowOTP,
}) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [signUpBtn, setSignUpBtn] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [googleBtn, setGoogleBtn] = useState(false);
	const [appleBtn, setAppleBtn] = useState(false);
	const passwordRef = useRef();
	const { setUserToken, setUser, getUser } = useAuthContext();

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
					handleSignUpClose();
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

					setAuthenticate(true);
					setEmail("");
					setPassword("");
					setError("");
					setSignUpBtn(false);
					handleSignUpClose();
				} else {
					console.log(res.data);
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
					handleSignUpClose();
					setShowOTP(true);
					setSignUpBtn(false);
					setGoogleBtn(false);
					setAppleBtn(false);
					Cookies.set("tempToken", access_token, { secure: true });
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
		<Modal
			show={showSignUp}
			centered
			className={styles.signup_modal__container}
		>
			<Modal.Header closeButton className={styles.modal__header}>
				<IoClose
					onClick={handleSignUpClose}
					className={styles.modal_cross__btn}
				/>
				<div
					className={`${styles.hanging_auth_signin} ${styles.hanging_auth_inactive}`}
					onClick={handleSignInShow}
				>
					<span className="text-uppercase">Sign In</span>
				</div>
				<div
					className={`${styles.hanging_auth_signup} ${styles.hanging_auth_active}`}
				>
					<span className="text-uppercase">Sign Up</span>
				</div>
			</Modal.Header>
			<Modal.Body>
				<h4 className="font-helvetica-medium mb-4">Sign Up</h4>
				<Form onSubmit={handleSignUpFormSubmit}>
					<Form.Label htmlFor="name">
						Name<span className="text-danger">*</span>
					</Form.Label>
					<InputGroup className="mb-3">
						<Form.Control
							type="text"
							id="name"
							placeholder="Enter your name"
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
					<Form.Label htmlFor="password">
						Password<span className="text-danger">*</span>
					</Form.Label>
					<InputGroup className="mb-3">
						<Form.Control
							type="password"
							id="password"
							placeholder="Enter your password"
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
						variant={`danger w-100 mt-3 ${styles.auth_btn}`}
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
					onClick={appleLoginHandler}
					disabled={appleBtn}
				>
					<FaApple className={styles.apple_icon} /> Continue with Apple
				</Button>
			</Modal.Body>
		</Modal>
	);
}
