import styles from "@/styles/home/Fixture.module.css";
// import { xoomSportUrl } from "@/utils/api/getAxios";
import { MdStarOutline } from "react-icons/md";
// import { useQuery } from "react-query";

function SelectFavorite() {
	// const {
	// 	isLoading,
	// 	data: favorite,
	// 	isError,
	// 	error,
	// } = useQuery(`favorite_select`, async () => {
	// 	return await xoomSportUrl.post(`/api/v1/favorite`);
	// });
	// if (!isLoading) {
	// 	console.log(favorite);
	// }
	return (
		<>
			<MdStarOutline className={styles.favorite__logo} />
		</>
	);
}

export default SelectFavorite;
