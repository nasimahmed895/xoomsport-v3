import Layout from "@/components/Layout";
import TeamDetails from "@/components/team/TeamDetails";
import axios from "@/utils/api/getAxios";
import cookie from "cookie";

export default function Team({ singleTeam, userToken }) {
	return (
		<Layout fullScreen title="TEAM DETAILS" userToken={userToken}>
			<TeamDetails singleTeam={singleTeam} userToken={userToken} />
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const cookies = context.req.headers.cookie;
	let userToken = null;

	if (cookies !== undefined) {
		userToken = cookie.parse(cookies).userToken ?? null;
	}

	const { team_id } = context.query;
	try {
		const response = await axios.get(
			`teams/${team_id}?include=latest.localTeam,latest.visitorTeam,latest.league,country,upcoming.localTeam,upcoming.visitorTeam.country,upcoming.league,upcoming.venue,upcoming.referee,activeSeasons.league,squad.player.position,squad.player.country,coach.country`
		);
		return {
			props: {
				singleTeam: response.data.data,
			},
		};
	} catch (error) {
		return {
			props: {
				singleTeam: [],
				userToken: userToken ?? null,
			},
		};
	}
}
