import styles from "@/styles/Legal.module.css";
import { xoomSportUrl } from "@/utils/api/getAxios";
import { Interweave } from "interweave";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

export default function Policy({ settings }) {
	const [isRender, setIsRender] = useState(false);

	useEffect(() => {
		setIsRender(true);
	}, []);

	return (
		<>
			<Head>
				<title>XOOMSPORT - PRIVACY & POLICY</title>
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
							<h4 className="mt-4 border-bottom text-center">
								Privacy & Policy
							</h4>
						</div>
					</div>
				</Container>
			</div>
			<Container className="w-75 mt-5">
				<div className={styles.text__container}>
					{isRender && (
						<Interweave content={settings.policy} containerTagName="div" />
					)}
				</div>
			</Container>
		</>
	);
}

export async function getServerSideProps() {
	const settings = await xoomSportUrl
		.post("/api/v1/settings")
		.then((res) => res?.data?.data);

	return {
		props: {
			settings: settings,
		},
	};
}
