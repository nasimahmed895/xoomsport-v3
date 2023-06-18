import styles from "@/styles/mobile/MobilePopUp.module.css";
import { toast } from "react-toastify";

export default function MobilePopUp({ text }) {
	alert("ok");
	if (window.innerWidth < "576") {
		return (
			<div>
				<div className={`${styles.content} overlayed`} id="overlayed">
					{text}
				</div>
			</div>
		);
	} else {
		toast.info(text, {
			theme: "dark",
		});
	}
}
