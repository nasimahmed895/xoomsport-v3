import useAuthContext from "@/contexts/AuthContext";
import styles from "@/styles/favorite/Favorites.module.css";
import { xoomSportUrl } from "@/utils/api/getAxios";
import { useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { useQuery } from "react-query";
import NoFavoriteFound from "../NoFavoriteFound";
import FixtureListShimmer from "../shimmer/home/FixtureListShimmer";
import FavoriteLeagues from "./FavoriteLeagues";
import FavoriteMatches from "./FavoriteMatches";
import FavoriteTeams from "./FavoriteTeams";

export default function FavoriteList() {
	const { userToken } = useAuthContext();
	const [isRender, setIsRender] = useState(false);

	useEffect(() => {
		setIsRender(true);
	}, []);

	const {
		isLoading,
		data: favorite,
		isError,
		refetch,
	} = useQuery(
		`favorite`,
		async () => {
			return await xoomSportUrl.post(`/api/v1/favorite`);
		},
		{
			enabled: userToken ? true : false,
		}
	);

	useEffect(() => {
		if (userToken) {
			refetch();
		}
	}, [userToken, refetch]);

	return (
		<Tab.Container defaultActiveKey="matches">
			<div className="overflow">
				<div className="rotate_main">
					<div className={styles.favorite__heading_content}>
						<Nav className={`${styles.favorite__heading} rotate_content`}>
							<Nav.Item className="ms-1">
								<Nav.Link
									eventKey="matches"
									className={styles.favorite_tab__link}
								>
									Matches
								</Nav.Link>
							</Nav.Item>
							<Nav.Item className="ms-1">
								<Nav.Link
									eventKey="competitions"
									className={styles.favorite_tab__link}
								>
									Competitions
								</Nav.Link>
							</Nav.Item>
							<Nav.Item className="ms-1">
								<Nav.Link
									eventKey="teams"
									className={styles.favorite_tab__link}
								>
									Teams
								</Nav.Link>
							</Nav.Item>
						</Nav>
					</div>
				</div>

				<Tab.Content>
					<Tab.Pane eventKey="matches">
						{isRender && userToken ? (
							isLoading || isError ? (
								<FixtureListShimmer />
							) : (
								<FavoriteMatches matches={favorite?.data?.matches?.data} />
							)
						) : (
							<NoFavoriteFound
								item="matches"
								data="Please Signin Before Add Favorite Matches!"
							/>
						)}
					</Tab.Pane>
					<Tab.Pane eventKey="competitions">
						{isRender && userToken ? (
							isLoading || isError ? (
								<FixtureListShimmer />
							) : (
								<FavoriteLeagues
									competitions={favorite?.data?.competitions?.data}
								/>
							)
						) : (
							<NoFavoriteFound
								item="competitions"
								data="Please Signin Before Add Favorite Leagues!"
							/>
						)}
					</Tab.Pane>
					<Tab.Pane eventKey="teams">
						{isRender && userToken ? (
							isLoading || isError ? (
								<FixtureListShimmer />
							) : (
								<FavoriteTeams teams={favorite?.data?.teams?.data} />
							)
						) : (
							<NoFavoriteFound
								item="teams"
								data="Please Signin Before Add Favorite Teams!"
							/>
						)}
					</Tab.Pane>
				</Tab.Content>
			</div>
		</Tab.Container>
	);
}
