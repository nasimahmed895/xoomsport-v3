import Layout from "@/components/Layout";
import PlayerDetails from "@/components/player/PlayerDetails";
import axios from "@/utils/api/getAxios";
import cookie from "cookie";

export default function Team({ singlePlayer, userToken }) {
	return (
		<Layout fullScreen title="PLAYER DETAILS" userToken={userToken}>
			<PlayerDetails singlePlayer={singlePlayer} />
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const { player_id } = context.query;

	const cookies = context.req.headers.cookie;
	let userToken = null;

	if (cookies !== undefined) {
		userToken = cookie.parse(cookies).userToken ?? null;
	}

	const response = await axios.get(
		`players/${player_id}?include=position,team.league,country,stats.league,stats.season,transfers.team,lineups,trophies`
	);
	return {
		props: {
			singlePlayer: response.data.data,
			userToken: userToken ?? null,
		},
	};
}
