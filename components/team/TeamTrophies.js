import styles from "@/styles/team/TeamTrophies.module.css";
import axios from "@/utils/api/getAxios";
import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import FixtureListShimmer from "../shimmer/home/FixtureListShimmer";

export default function TeamTrophies({ team_id }) {
  const {
    isLoading: isLoading,
    data: teamTrophies,
    isError: isError,
    error: error,
  } = useQuery(`team-trophies-${team_id}`, async () => {
    return await axios.get(`teams/${team_id}?include=trophies`);
  });

  let groupBy = {};
  let runnerUp = {};
  let winner = {};

  if (!isLoading) {
    for (let i = 0; i < teamTrophies.data.data.trophies.data.length; i++) {
      let make = teamTrophies.data.data.trophies.data[i].league;
      if (groupBy[make] == null) groupBy[make] = [];
      groupBy[make].push(teamTrophies.data.data.trophies.data[i]);
    }

    for (let league in groupBy) {
      groupBy[league].forEach((team) => {
        if (team.status == "Runner-up") {
          if (runnerUp[league] == null) runnerUp[league] = [];

          team.seasons.data.forEach((element) => {
            runnerUp[league].push(element.name);
          });

          for (let season in team.non_sportmonk_seasons) {
            runnerUp[league].push(team.non_sportmonk_seasons[season].name);
          }
        } else {
          if (winner[league] == null) winner[league] = [];

          team.seasons.data.forEach((element) => {
            winner[league].push(element.name);
          });

          for (let season in team.non_sportmonk_seasons) {
            winner[league].push(team.non_sportmonk_seasons[season].name);
          }
        }
      });
    }
  }

  if (isLoading) {
    return <FixtureListShimmer />;
  } else {
    if (JSON.stringify(groupBy) === "{}") {
      return (
        <div className={styles.match__not_found}>
          <Image
            src="/vector_matches_fav.png"
            alt="Not Found Logo"
            width={300}
            height={300}
          />
          <p>No Data Available</p>
        </div>
      );
    } else {
      return (
        <div className="team_trophies__container">
          {Object.keys(groupBy).map((league, index) => (
            <div key={index} className="team_trophie__list">
              {groupBy[league][0].logo_path ? (
                <div className={styles.league_details__text}>
                  <div>
                    <Image
                      className={styles.league__logo}
                      loader={() => groupBy[league][0].logo_path}
                      src={groupBy[league][0].logo_path}
                      alt="League Logo"
                      width={35}
                      height={35}
                    />
                  </div>
                  <div>
                    <h6 className={styles.league__title}>
                      {groupBy[league][0].league}
                    </h6>
                  </div>
                </div>
              ) : (
                <div className={styles.league_details__text}>
                  <div>
                    <Image
                      className={styles.league__logo}
                      src="/team_placeholder.png"
                      alt="League Logo"
                      width={35}
                      height={35}
                    />
                  </div>
                  <div>
                    <h6 className={styles.league__title}>
                      {groupBy[league][0].league}
                    </h6>
                  </div>
                </div>
              )}

              <div className={styles.torphie__seasons}>
                <Row>
                  <Col lg={5} md={5}>
                    <h6 className={styles.trophie_title}>
                      Winner ({winner[league] ? winner[league].length : 0})
                    </h6>
                    <p className={styles.tophie_list}>
                      {winner[league] ? winner[league].join(", ") : null}
                    </p>
                  </Col>
                  <Col lg={2} md={2}></Col>
                  <Col lg={5} md={5}>
                    <h6 className={styles.trophie_title}>
                      Runner-up (
                      {runnerUp[league] ? runnerUp[league].length : 0})
                    </h6>
                    <p className={styles.tophie_list}>
                      {runnerUp[league] ? runnerUp[league].join(", ") : null}
                    </p>
                  </Col>
                </Row>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
}
