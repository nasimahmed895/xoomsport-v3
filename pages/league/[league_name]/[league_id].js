import Layout from "@/components/Layout";
import LeagueDetails from "@/components/league/LeagueDetails";
import axios from "@/utils/api/getAxios";
import cookie from "cookie";

export default function League({ singleLeague, userToken }) {
	return (
		<Layout fullScreen title="LEAGUE DETAILS" userToken={userToken}>
			<LeagueDetails singleLeague={singleLeague} />
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const { league_id } = context.query;
	const cookies = context.req.headers.cookie;
	let userToken = null;

	if (cookies !== undefined) {
		userToken = cookie.parse(cookies).userToken ?? null;
	}

	const response = await axios.get(
		`leagues/${league_id}?include=country,seasons,season`
	);
	return {
		props: {
			singleLeague: response.data.data,
			userToken: userToken ?? null,
		},
	};
}
