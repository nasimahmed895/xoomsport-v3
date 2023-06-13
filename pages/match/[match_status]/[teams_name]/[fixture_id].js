import Layout from "@/components/Layout";
import MatchScreen from "@/components/match/MatchScreen";
import axios from "@/utils/api/getAxios";
import cookie from "cookie";

export default function Match({ singleMatch, match_status, userToken }) {
	return (
		<Layout
			fullScreen
			title={`MATCH ${match_status.toUpperCase()}`}
			userToken={userToken}
		>
			<MatchScreen singleMatch={singleMatch} match_status={match_status} />
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const { fixture_id, match_status } = context.query;
	const cookies = context.req.headers.cookie;
	let userToken = null;

	if (cookies !== undefined) {
		userToken = cookie.parse(cookies).userToken ?? null;
	}

	const response = await axios.get(
		`fixtures/multi/${fixture_id}?include=localTeam.country,visitorTeam.country,venue,referee,league,league.country,localCoach,visitorCoach`
	);

	return {
		props: {
			singleMatch: response.data.data[0],
			match_status,
			userToken: userToken ?? null,
		},
	};
}
