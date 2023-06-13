import useAuthContext from "@/contexts/AuthContext";
import styles from "@/styles/Auth.module.css";
import { xoomSportUrl } from "@/utils/api/getAxios";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

export default function ChangePasswordModalForm({
	showChangePassword,
	setShowChangePassword,
	setAuthenticate,
}) {
	const [code, setCode] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [changeBtn, setChangeBtn] = useState(false);
	const passwordRef = useRef();
	const { setUserToken, setUser, getUser } = useAuthContext();

	const handleShowPassword = () => {
		if (showPassword) {
			setShowPassword(false);
			passwordRef.current.type = "password";
		} else {
			setShowPassword(true);
			passwordRef.current.type = "text";
		}
	};

	const handleChangePasswordSubmit = async (e) => {
		e.preventDefault();
		setChangeBtn(true);

		const payload = {
			forget_code: code,
			password,
		};

		try {
			await xoomSportUrl
				.post("/api/v1/change_password", payload)
				.then((res) => {
					if (res?.data?.status) {
						const { access_token } = res?.data;

						Cookies.set("userToken", access_token, { secure: true });
						setUserToken(access_token);
						getUser();

						toast.success(res?.data?.message, {
							theme: "dark",
						});

						setAuthenticate(true);
						setCode("");
						setPassword("");
						setError("");
						setShowChangePassword(false);
					} else {
						setError(res?.data?.message);
						setChangeBtn(false);
					}
				});
		} catch (err) {
			setUserToken(null);
			setUser(null);
		}
	};

	return (
		<Modal
			show={showChangePassword}
			centered
			className={styles.signin_modal__container}
		>
			<Modal.Header closeButton className={styles.modal__header}>
				<IoClose
					onClick={() => setShowChangePassword(false)}
					className={styles.modal_cross__btn}
				/>
			</Modal.Header>
			<Modal.Body>
				<h4 className="font-helvetica-medium mb-4">Change Password</h4>
				<Form onSubmit={handleChangePasswordSubmit}>
					<Form.Label htmlFor="code">
						Verify Code<span className="text-danger">*</span>
					</Form.Label>
					<InputGroup className="mb-3">
						<Form.Control
							type="text"
							id="code"
							placeholder="Enter your code"
							style={{
								borderTopRightRadius: "5px",
								borderBottomRightRadius: "5px",
							}}
							isInvalid={error ? true : false}
							value={code}
							onChange={(e) => setCode(e.target.value)}
							required
						/>
						{error && (
							<Form.Control.Feedback type="invalid">
								{error}
							</Form.Control.Feedback>
						)}
					</InputGroup>
					<Form.Label htmlFor="password">
						New Password<span className="text-danger">*</span>
					</Form.Label>
					<InputGroup className="mb-3 position-relative">
						<Form.Control
							type="password"
							id="password"
							minLength={6}
							placeholder="Enter your new password"
							style={{
								borderTopRightRadius: "5px",
								borderBottomRightRadius: "5px",
							}}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							ref={passwordRef}
							required
						/>
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
						disabled={changeBtn}
					>
						{changeBtn && (
							<FiLoader
								className={`spinner-border ${styles.spinner__border}`}
							/>
						)}
						Submit
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
