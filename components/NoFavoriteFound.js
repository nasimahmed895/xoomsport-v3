import Image from "next/image";

export default function NoFavoriteFound({ item, data }) {
  if (item === "matches") {
    return (
      <div className="match__not_found">
        <Image
          src="/vector_matches_fav.png"
          alt="Not Found Logo"
          width={300}
          height={300}
        />
        <p>{data}</p>
      </div>
    );
  } else if (item === "competitions") {
    return (
      <div className="match__not_found">
        <Image
          src="/vector_competitions_fav.png"
          alt="Not Found Logo"
          width={300}
          height={300}
        />
        <p>{data}</p>
      </div>
    );
  } else {
    return (
      <div className="match__not_found">
        <Image
          src="/vector_teams_fav.png"
          alt="Not Found Logo"
          width={300}
          height={300}
        />
        <p>{data}</p>
      </div>
    );
  }
}
