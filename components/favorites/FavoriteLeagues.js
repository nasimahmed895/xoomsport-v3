import styles from "@/styles/favorite/FavoriteLeagues.module.css";
import { xoomSportUrl } from "@/utils/api/getAxios";
import getSlugify from "@/utils/getSlugify";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { toast } from "react-toastify";
import NoFavoriteFound from "../NoFavoriteFound";

export default function FavoriteLeagues({ competitions }) {
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

	const detectClickedElement = (e, team, provider, id) => {
		const data = e.target.getAttribute("data-status");
		if (data == "active") {
			xoomSportUrl
				.post("/api/v1/favorite_destroy", {
					provider: provider,
					id: id,
				})
				.then((res) =>
					toast.success(res.data.message, {
						theme: "dark",
					})
				);
			e.target.setAttribute("data-status", "inactive");
			e.target.style =
				"filter: invert(8%) sepia(9%) saturate(7%) hue-rotate(314deg) brightness(103%) contrast(100%);";
		} else {
			xoomSportUrl
				.post("/api/v1/favorite/create", {
					provider: provider,
					data: JSON.stringify(team),
					id: id,
				})
				.then((res) =>
					toast.success(res.data.message, {
						theme: "dark",
					})
				);
			e.target.setAttribute("data-status", "active");
			e.target.style =
				"filter: invert(35%) sepia(92%) saturate(5572%) hue-rotate(349deg) brightness(87%) contrast(136%)";
		}
	};

	if (competitions == 0) {
		return (
			<NoFavoriteFound
				item="competitions"
				data="You haven't any leagues in your favorite"
			/>
		);
	} else {
		return (
			<div className="favorite_league__list">
				{competitions.map((item) => (
					<div
						key={item}
						className={`${styles.favorite_league__item} rotate_main`}
					>
						<Link
							href={`/league/${getSlugify(item.name)}/${item.id}`}
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
									<span className={styles.league__country}>
										{item.country.data.name}
									</span>
								</div>
							</div>
						</Link>
						{/* <div
							data-status="active"
							className={styles.favorite_icon__design}
							onClick={(e) =>
								detectClickedElement(e, item, "competition", item.id)
							}
						>
							<Image
								src="/static/Icons/star_red.png"
								alt="Not Found Logo"
								width={300}
								height={300}
								data-status="active"
								className="star"
							/>
						</div> */}
						<div
							data-status="active"
							className={styles.favorite_icon__design}
							ref={(el) => (userFavoritesRefs.current[item.id + "active"] = el)}
							onClick={() =>
								handleUserfavorite(item.id, 0, item.id, "competition", item)
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
								handleUserfavorite(
									item.id,
									1,
									item.id,
									"matccompetitionhes",
									item
								)
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
