import styles from "@/styles/league/LeagueFixtures.module.css";
import axios, { xoomSportUrl } from "@/utils/api/getAxios";
import getMonth from "@/utils/getMonth";
import getSlugify from "@/utils/getSlugify";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

export default function LeagueFixtures({ season_id }) {
  const userFavoritesRefs = useRef([]);
  const groupBy = {};
  const orderedDates = {};

  const { isLoading: isLoading1, data: favorite } = useQuery(
    "user-favorites",
    async () => {
      return await xoomSportUrl.post(`/api/v1/favorite_id`);
    }
  );

  const {
    isLoading,
    data: leagueFixtures,
    isError,
  } = useQuery(`league-fixtures-${season_id}`, async () => {
    return await axios.get(
      `seasons/${season_id}?include=fixtures.visitorTeam.country,fixtures.localTeam.country,fixtures.league,fixtures.venue,fixtures.referee`
    );
  });

  if (isError) {
    toast.warn("Please check your internet connetion or try again!", {
      theme: "dark",
    });
  }

  // Handle User Favorite
  const handleUserfavorite = (
    i,
    status = "",
    id = "",
    provider = "",
    team = ""
  ) => {
    if (Cookies.get("userToken")) {
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
      toast.warn("Please Signin Before Add Favorites!", {
        theme: "dark",
      });
    }
  };

  // Render User Favorite Icon
  const checkUserFavorite = (id, team) => {
    if (Cookies.get("userToken")) {
      if (!isLoading) {
        if (favorite?.data?.matches?.data.includes(id)) {
          return (
            <>
              <div
                data-status="active"
                className={styles.favorite_icon__design}
                ref={(el) =>
                  (userFavoritesRefs.current[team.id + "active"] = el)
                }
                onClick={() =>
                  handleUserfavorite(team.id, 0, id, "matches", team)
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
                  (userFavoritesRefs.current[team.id + "inactive"] = el)
                }
                onClick={() =>
                  handleUserfavorite(team.id, 1, id, "matches", team)
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
            </>
          );
        } else {
          return (
            <>
              <div
                data-status="active"
                className={`${styles.favorite_icon__design} ${styles.inactive_favorite}`}
                ref={(el) =>
                  (userFavoritesRefs.current[team.id + "active"] = el)
                }
                onClick={() =>
                  handleUserfavorite(team.id, 0, id, "matches", team)
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
                className={styles.favorite_icon__design}
                ref={(el) =>
                  (userFavoritesRefs.current[team.id + "inactive"] = el)
                }
                onClick={() =>
                  handleUserfavorite(team.id, 1, id, "matches", team)
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
            </>
          );
        }
      }
    } else {
      return (
        <div
          data-status="unauthenticate"
          className={styles.favorite_icon__design}
          onClick={() => handleUserfavorite(team.id, "", "", "", "")}
        >
          <Image
            src="/star_black.png"
            alt="Favorite Logo"
            width={300}
            height={300}
            className="star"
          />
        </div>
      );
    }
  };

  if (isLoading || isError || leagueFixtures?.data?.data === undefined) {
    return (
      <div className={styles.match__not_found}>
        <Image
          src="/vector_matches_fav.png"
          alt="Not Found Logo"
          width={300}
          height={300}
        />
        <p>
          Unfortunately, there are no matches happening at the moment. Please
          check back later. See you soon!
        </p>
      </div>
    );
  } else {
    for (
      let i = 0;
      i < leagueFixtures?.data?.data?.fixtures?.data.length;
      i++
    ) {
      if (
        new Date(
          leagueFixtures?.data?.data?.fixtures?.data[i]?.time?.starting_at?.date
        ) > new Date()
      ) {
        let make =
          leagueFixtures?.data?.data?.fixtures?.data[i]?.time?.starting_at
            ?.date;
        if (groupBy[make] == null) groupBy[make] = [];

        groupBy[make].push(leagueFixtures?.data?.data?.fixtures?.data[i]);
      }
    }

    if (JSON.stringify(groupBy) === "{}") {
      return (
        <div className={styles.match__not_found}>
          <Image
            src="/vector_matches_fav.png"
            alt="Not Found Logo"
            width={300}
            height={300}
          />
          <p>
            Unfortunately, there are no matches happening at the moment. Please
            check back later. See you soon!
          </p>
        </div>
      );
    } else {
      // Sort By Date in Group
      Object.keys(groupBy)
        .sort(function (a, b) {
          return a.split("/").join("").localeCompare(b.split("/").join(""));
        })
        .forEach(function (key) {
          orderedDates[key] = groupBy[key];
        });

      return (
        <div className={styles.league_fixtures__container}>
          {Object.entries(orderedDates).map(([date, fixtures]) => (
            <div key={date}>
              <div className="league_fixtures_by__date">
                <div>
                  <div
                    className={`shadow-sm bg-white  ${styles.fixture__heading}`}
                  >
                    <div className={styles.league_fixtures_container}>
                      <h6 className={styles.fixture__title}>{date}</h6>
                    </div>
                  </div>
                  <div>
                    {fixtures.map((item) => (
                      <div key={item.id} className={styles.fixtures__wrapper}>
                        <Link
                          href={`/match/preview/${getSlugify(
                            item.localTeam.data.name
                          )}-vs-${getSlugify(item.visitorTeam.data.name)}/${
                            item.id
                          }`}
                          className="text-dec-none"
                        >
                          <div className={`${styles.fextures_table} py-2`}>
                            <Row className={styles.league_fixtures_container}>
                              <Col
                                lg={5}
                                md={5}
                                sm={5}
                                xs={5}
                                className="align-items-center d-flex"
                              >
                                <span className={styles.league__status}>
                                  {item.time.status}
                                </span>

                                <Image
                                  className={styles.league__logo}
                                  loader={() => item.visitorTeam.data.logo_path}
                                  src={item.visitorTeam.data.logo_path}
                                  alt="League Logo"
                                  width={25}
                                  height={25}
                                />
                                <span className={styles.league__title}>
                                  {item.visitorTeam.data.name}
                                </span>
                              </Col>

                              <Col
                                lg={2}
                                md={2}
                                sm={2}
                                xs={2}
                                className="p-0 align-items-center d-flex"
                              >
                                <div className={styles.match__timestamp}>
                                  <span className={styles.match__date}>
                                    {item.time.starting_at.date.slice(8, 10)}{" "}
                                    {getMonth(item.time.starting_at.date)}
                                  </span>
                                  <span className={styles.match__time}>
                                    {item.time.starting_at.time.slice(0, 5)}
                                  </span>
                                </div>
                              </Col>

                              <Col
                                lg={5}
                                md={5}
                                sm={5}
                                xs={5}
                                className="align-items-center d-flex"
                              >
                                <Image
                                  className={styles.league__logo}
                                  loader={() => item.localTeam.data.logo_path}
                                  src={item.localTeam.data.logo_path}
                                  alt="League Logo"
                                  width={25}
                                  height={25}
                                />
                                <span className={styles.league__title}>
                                  {item.localTeam.data.name}
                                </span>
                              </Col>
                            </Row>
                          </div>
                        </Link>
                        <div id="Favorite_item">
                          {checkUserFavorite(item?.id, item)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
}
