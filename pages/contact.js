import styles from "@/styles/Legal.module.css";
import { xoomSportUrl } from "@/utils/api/getAxios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Container, Form, InputGroup } from "react-bootstrap";
import { FiLoader } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Terms() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [submitSpinner, setSumbitSpinner] = useState(false);

	const handleFormSubmit = (e) => {
		e.preventDefault();
		setSumbitSpinner(true);

		xoomSportUrl
			.post("/api/v1/store/contact", {
				name,
				email,
				message,
			})
			.then(() => {
				setSumbitSpinner(false);
				toast.success("Message Send Successfully, Thank You!", {
					theme: "dark",
				});
				setName("");
				setEmail("");
				setMessage("");
			});
	};

	return (
		<>
			<Head>
				<title>XOOMSPORT - CONTACT US</title>
			</Head>
			<div className={styles.page__heading}>
				<Container className="pt-5 pb-4">
					<div className="d-flex justify-content-center">
						<div className={styles.heading_content}>
							<Image
								src="/static/images/logo.png"
								alt="Logo"
								width={0}
								height={0}
								sizes="100vw"
							/>
							<h4 className="mt-4 border-bottom text-center">Contact Us</h4>
						</div>
					</div>
				</Container>
			</div>
			<Container className="w-50 mt-5">
				<div>
					<Form onSubmit={handleFormSubmit}>
						<InputGroup className="mb-3">
							<Form.Control
								placeholder="Enter your name"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</InputGroup>
						<InputGroup className="mb-3">
							<Form.Control
								placeholder="Enter your email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</InputGroup>
						<InputGroup>
							<Form.Control
								as="textarea"
								placeholder="Write your message..."
								rows={4}
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								required
							/>
						</InputGroup>
						<button
							type="submit"
							className={`btn btn-danger btn-md w-100 mt-4 ${styles.btn_color} d-flex align-items-center justify-content-center`}
						>
							{submitSpinner && (
								<FiLoader
									className={`spinner-border ${styles.spinner__border}`}
								/>
							)}
							Submit
						</button>
					</Form>
				</div>
			</Container>
			<ToastContainer position="bottom-right" />
		</>
	);
}
