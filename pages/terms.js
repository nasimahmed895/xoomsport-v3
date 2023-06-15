import styles from "@/styles/Legal.module.css";
import { xoomSportUrl } from "@/utils/api/getAxios";
import Head from "next/head";
import Image from "next/image";
import { Container } from "react-bootstrap";

export default function Terms({ settings }) {
	return (
		<>
			<Head>
				<title>XOOMSPORT - Terms & Conditions</title>
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
							<h4 className="mt-4 border-bottom">Terms & Conditions</h4>
						</div>
					</div>
				</Container>
			</div>
			<Container className="w-75 mt-5">
				<div>{settings.terms}</div>
			</Container>
		</>
	);
}

export async function getServerSideProps() {
	const settings = await xoomSportUrl.post("/api/v1/settings");

	return {
		props: {
			settings: settings?.data?.data,
		},
	};
}
