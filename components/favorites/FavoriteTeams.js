import styles from "@/styles/favorite/FavoriteTeams.module.css";
import { xoomSportUrl } from "@/utils/api/getAxios";
import getSlugify from "@/utils/getSlugify";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import NoFavoriteFound from "../NoFavoriteFound";

export default function FavoriteTeams({ teams }) {
	const userFavoritesRefs = useRef([]);

	// Handle User favorite
	const handleUserfavorite = (
		i,
		status = "",
		id = "",
		provider = "",
		team = ""
	) => {
		if (Cookies.get("userToken")) {
			console.log(status);
			if (status) {
				userFavoritesRefs.current[i + "inactive"].style.display = "none";
				userFavoritesRefs.current[i + "active"].style.display = "block";
				xoomSportUrl.post("/api/v1/favorite/create", {
					provider: provider,
					data: JSON.stringify(team),
					id: id,
				});
			} else {
				userFavoritesRefs.current[i + "inactive"].style.display = "block";
				userFavoritesRefs.current[i + "active"].style.display = "none";
				xoomSportUrl.post("/api/v1/favorite_destroy", {
					provider: provider,
					id: id,
				});
			}
		} else {
			toast.info("Please Signin Before Add Favorites!", {
				theme: "dark",
			});
		}
	};

	if (teams == 0) {
		return (
			<NoFavoriteFound
				item="teams"
				data="You haven't any teams in your favorite"
			/>
		);
	} else {
		return (
			<div className="favorite_league__list">
				{teams.map((item) => (
					<div
						key={item}
						className={`${styles.favorite_team__item} rotate_main`}
					>
						<Link
							href={`/team/${getSlugify(item?.name)}/${item?.id}`}
							className="text-dec-none"
						>
							<div className="d-flex align-items-center">
								<Image
									className={styles.league__logo}
									loader={() => item.logo_path}
									src={item.logo_path}
									alt="League Logo"
									width={25}
									height={25}
								/>
								<div>
									<span className={styles.league__title}>{item.name}</span>
								</div>
							</div>
						</Link>
						<div
							data-status="active"
							className={styles.favorite_icon__design}
							ref={(el) => (userFavoritesRefs.current[item.id + "active"] = el)}
							onClick={() =>
								handleUserfavorite(item.id, 0, item.id, "team", item)
							}
						>
							<Image
								src="/star_full_red.png"
								alt="Favorite Logo"
								width={200}
								height={200}
								className="star"
							/>
						</div>
						<div
							data-status="inactive"
							className={`${styles.favorite_icon__design} ${styles.inactive_favorite}`}
							ref={(el) =>
								(userFavoritesRefs.current[item.id + "inactive"] = el)
							}
							onClick={() =>
								handleUserfavorite(item.id, 1, item.id, "team", item)
							}
						>
							<Image
								src="/star_black.png"
								alt="Favorite Logo"
								width={200}
								height={200}
								className="star"
							/>
						</div>
					</div>
				))}
			</div>
		);
	}
}
