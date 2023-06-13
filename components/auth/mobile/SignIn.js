import useAuthContext from "@/contexts/AuthContext";
import styles from "@/styles/mobile/Authentication.module.css";
import { xoomSportUrl } from "@/utils/api/getAxios";
import { auth } from "@/utils/firebase/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaApple, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";

function SignIn() {
	const [error, setError] = useState({});
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const passwordRef = useRef();
	const { setUserToken, setUser } = useAuthContext();
	const [showPassword, setShowPassword] = useState(false);
	const [signInBtn, setSignInBtn] = useState(false);
	const [appleBtn, setAppleBtn] = useState(false);
	const [googleBtn, setGoogleBtn] = useState(false);

	const router = useRouter();

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
					const { access_token, data: user } = res?.data;
					setUserToken(access_token);
					setUser({
						name: user.name,
						email: user.email,
						provider: user.provider,
					});
					Cookies.set("userToken", access_token, { secure: true });
					Cookies.set(
						"userInfo",
						JSON.stringify({ name: user.name, email: user.email }),
						{ secure: true }
					);
					toast.success("Sign In Successfully!", {
						theme: "dark",
					});
					setEmail("");
					setPassword("");
					setError("");
					setSignInBtn(false);
					router.push("/");
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

	const handleSignInFormSubmit = async (e) => {
		e.preventDefault();
		setSignInBtn(true);
		setGoogleBtn(true);
		setAppleBtn(true);

		const payload = {
			email,
			password,
			device_token: 12345,
			provider: "email",
		};

		try {
			await xoomSportUrl.post("/api/v1/signin", payload).then((res) => {
				if (res?.data?.status) {
					const { access_token, data: user } = res?.data;
					setUserToken(access_token);
					setUser({
						name: user.name,
						email: user.email,
						provider: user.provider,
					});
					Cookies.set("userToken", access_token, { secure: true });
					Cookies.set(
						"userInfo",
						JSON.stringify({ name: user.name, email: user.email }),
						{ secure: true }
					);
					toast.success("Sign In Successfully!", {
						theme: "dark",
					});
					setEmail("");
					setPassword("");
					setError("");
					setSignInBtn(false);
					setGoogleBtn(false);
					setAppleBtn(false);
					router.push("/");
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

	return (
		<div className={`${styles.bg_content} ${styles.content1} px-3`}>
			<div className="mt-4">
				<Image
					src="/signin.png"
					alt="Logo"
					className={styles.signin_logo}
					width={100}
					height={100}
				/>
			</div>
			<Form
				onSubmit={handleSignInFormSubmit}
				className={`${styles.was_validated} mt-2`}
			>
				<InputGroup className="mb-3 ">
					<Form.Control
						type="email"
						id="email"
						className={styles.form_control}
						placeholder="Email Address"
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
				<InputGroup className="mb-3 position-relative">
					<Form.Control
						type="password"
						id="password"
						placeholder="Password"
						style={{
							borderTopRightRadius: "5px",
							borderBottomRightRadius: "5px",
							backgroundImage: "none",
						}}
						className={styles.form_control}
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

				<Button
					variant={`danger w-100 mt-3 ${styles.auth_btn} d-flex justify-content-center align-items-center`}
					type="submit"
					disabled={signInBtn}
				>
					{signInBtn && (
						<FiLoader className={`spinner-border ${styles.spinner__border}`} />
					)}
					Sign In
				</Button>
			</Form>
			<div className="d-flex mt-3 mb-3 justify-content-center">
				<span className={styles.forget_password}>Forget Password</span>
			</div>

			<Button
				variant="primary w-100  d-flex justify-content-center align-items-center"
				onClick={googleLoginHandler}
				disabled={googleBtn}
			>
				<FcGoogle className={styles.google_icon} /> Continue with Google
			</Button>
			<Button
				variant="dark w-100 mt-3 d-flex justify-content-center align-items-center"
				disabled={appleBtn}
			>
				<FaApple className={styles.apple_icon} /> Continue with Apple
			</Button>
		</div>
	);
}

export default SignIn;
