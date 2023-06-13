import SignIn from "@/components/auth/mobile/SignIn";
import SignUp from "@/components/auth/mobile/SignUp";
import styles from "@/styles/mobile/Authentication.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { HiArrowLeft } from "react-icons/hi";

export default function MobileAuth() {
	const router = useRouter();

	useEffect(() => {
		document.getElementById("defaultOpen").click();
		document.body.style.backgroundColor = "#151515";
		return () => {
			document.body.style.backgroundColor = "";
		};
	}, []);

	const openCity = (evt, cityName) => {
		const tabcontent = document.getElementsByClassName("tabcontent");
		for (let i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}
		const tablinks = document.getElementsByClassName("tablinks");
		for (let i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(
				" active_login",
				""
			);
		}
		document.getElementById(cityName).style.display = "block";
		evt.currentTarget.className += " active_login";
	};

	return (
		<div
			className={styles.content_wreapper}
			style={{ height: "100vh", backgroundColor: "#151515" }}
		>
			<HiArrowLeft
				style={{ color: "#fff", left: "24px", zIndex: "2" }}
				className="backArrowBtn"
				onClick={() => router.back()}
			/>
			<div className={styles.tab}>
				<button
					className="tablinks active_login font-helvetica-bold"
					onClick={(evt) => openCity(evt, "signin")}
					id="defaultOpen"
				>
					SIGN IN
					<div className="point_wreapper">
						<div className="rount">
							<div className="point"></div>
						</div>
					</div>
				</button>
				<button
					className="tablinks font-helvetica-bold"
					onClick={(evt) => openCity(evt, "signup")}
				>
					SIGNUP
					<div className="point_wreapper">
						<div className="rount">
							<div className="point"></div>
						</div>
					</div>
				</button>
			</div>
			<div className={`${styles.boy_content} align-middle`}>
				<div className="logo">
					<Image
						src="/static/images/logo.png"
						alt="Logo"
						className={styles.logo_image}
						width={100}
						height={100}
					/>
				</div>
				<div className="dd">
					<div id="signin" className="tabcontent">
						<SignIn />
					</div>

					<div id="signup" className="tabcontent">
						<SignUp />
					</div>
				</div>
			</div>
		</div>
	);
}
