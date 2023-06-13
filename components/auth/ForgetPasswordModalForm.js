import useAuthContext from "@/contexts/AuthContext";
import styles from "@/styles/Auth.module.css";
import { xoomSportUrl } from "@/utils/api/getAxios";
import { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { FiLoader } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

export default function ForgetPasswordModalForm({
	showForgetPassword,
	handleForgetClose,
	handleSignInShow,
	handleChangeShow,
}) {
	const [email, setEmail] = useState("");
	const [error, setError] = useState(null);
	const [forgetBtn, setForgetBtn] = useState(false);
	const { setUserToken, setUser } = useAuthContext();

	const handleForgetCloseBtn = () => {
		setEmail("");
		setError("");
		handleForgetClose();
	};

	const goToLoginBtn = () => {
		setEmail("");
		setError("");
		handleSignInShow();
	};

	const forgetPasswordFormHandler = async (e) => {
		e.preventDefault();
		setForgetBtn(true);

		try {
			await xoomSportUrl
				.post("/api/v1/forget_password", { email })
				.then((res) => {
					console.log(res);
					if (res?.data?.status) {
						toast.success(res?.data?.message, {
							theme: "dark",
						});
						setForgetBtn(false);
						setEmail("");
						handleChangeShow();
					} else {
						setError(res?.data?.message);
						setForgetBtn(false);
					}
				});
		} catch (err) {
			setUserToken(null);
			setUser(null);
		}
	};

	return (
		<Modal
			show={showForgetPassword}
			centered
			className={styles.signin_modal__container}
		>
			<Modal.Header closeButton className={styles.modal__header}>
				<IoClose
					onClick={handleForgetCloseBtn}
					className={styles.modal_cross__btn}
				/>
			</Modal.Header>
			<Modal.Body>
				<h4 className="font-helvetica-medium mb-4">Forget Password</h4>
				<p>Enter your Email & we{"'"}ll send you a verify code!</p>

				<Form onSubmit={forgetPasswordFormHandler}>
					<InputGroup className="mb-3">
						<Form.Control
							type="email"
							id="email"
							placeholder="Enter your email"
							style={{
								borderTopRightRadius: "5px",
								borderBottomRightRadius: "5px",
							}}
							isInvalid={error ? true : false}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						{error && (
							<Form.Control.Feedback type="invalid">
								{error}
							</Form.Control.Feedback>
						)}
					</InputGroup>
					<Button
						variant={`danger w-100 mt-3 ${styles.auth_btn}`}
						type="submit"
						disabled={forgetBtn}
					>
						{forgetBtn && (
							<FiLoader
								className={`spinner-border ${styles.spinner__border}`}
							/>
						)}
						Submit
					</Button>
				</Form>
				<div className={`text-center mt-3 ${styles.go_to_login}`}>
					<span onClick={goToLoginBtn}>Go to Login</span>
				</div>
			</Modal.Body>
		</Modal>
	);
}
