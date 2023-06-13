import Layout from "@/components/Layout";
import ConfirmActivate from "@/components/subscription/ConfirmActivate";
import { xoomSportUrl } from "@/utils/api/getAxios";
import cookie from "cookie";

export default function Activate({ userToken, userInfo }) {
	return (
		<Layout title="SUCCESSFUL PAYMENT" userToken={userToken} fullScreen>
			<ConfirmActivate userInfo={userInfo} />
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const cookies = context.req.headers.cookie;
	const { _sid } = context.query;

	let userToken = null;
	let userInfo = null;
	let userPaymentInfo = null;
	let subscriptionId = null;
	let amount = null;

	if (cookies !== undefined) {
		userToken = cookie.parse(cookies).userToken;

		if (!userToken) {
			return {
				redirect: {
					destination: "/",
					permanent: false,
				},
			};
		}
	}

	if (_sid) {
		userPaymentInfo = await fetch(
			`${process.env.XOOMSPORT_BASE_URL}/api/stripe/${_sid}`
		)
			.then((res) => res.json())
			.then((data) => data);

		if (!userPaymentInfo?.statusCode && userPaymentInfo?.statusCode != 500) {
			subscriptionId = userPaymentInfo?.metadata?.subscription_id;
			amount = userPaymentInfo?.amount_total / 100; // 9999 -> 99.99
		}
	}

	// Redirect to Home page if sid is Invalid
	if (userPaymentInfo?.statusCode && userPaymentInfo?.statusCode == 500) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	} else {
		userInfo = await xoomSportUrl
			.post(
				"/api/v1/subscription_update",
				{
					subscription_id: subscriptionId,
					amount: amount.toString(),
					platform: "web",
					sid: _sid,
				},
				{
					headers: { Authorization: `Bearer ${userToken}` },
				}
			)
			.then((res) => res.data);
	}

	return {
		props: {
			userToken: userToken ?? null,
			userInfo: userInfo ?? null,
		},
	};
}
