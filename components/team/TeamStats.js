import styles from "@/styles/team/TeamStats.module.css";
import axios from "@/utils/api/getAxios";
import getSlugify from "@/utils/getSlugify";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Col, Modal, Row, Table } from "react-bootstrap";
import { FiChevronDown } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useQuery } from "react-query";
import LeagueListShimmer from "../shimmer/league/FullLeagueTableShimmer";
import LeaguePlayerStatsShimmer from "../shimmer/league/LeaguePlayerStatsShimmer";

export default function TeamStats({ singleTeam }) {
  const [show, setShow] = useState(false);
  const [seasonId, setSeasonId] = useState(singleTeam?.current_season_id);
  const [season, setSeason] = useState(singleTeam?.activeSeasons?.data[0].name);
  const [leagueName, setLeagueName] = useState(
    singleTeam?.activeSeasons?.data[0]?.league?.data?.name
  );
  const [leagueLogo, setLeagueLogo] = useState(
    singleTeam?.activeSeasons?.data[0]?.league?.data?.logo_path
  );
  const [leagueId, setLeagueId] = useState(
    singleTeam?.activeSeasons?.data[0]?.league?.data?.id
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSeason = (
    season_id,
    season_name,
    league_name,
    league_logo,
    league_id
  ) => {
    setSeasonId(season_id);
    setSeason(season_name);
    setLeagueName(league_name);
    setLeagueLogo(league_logo);
    setLeagueId(league_id);
    setShow(false);
  };

  const {
    isLoading: isLoading1,
    data: teamPointTable,
    isError,
    error,
  } = useQuery(`team-point-table-${seasonId}`, async () => {
    return await axios.get(
      `standings/season/${seasonId}?include=standings.team`
    );
  });

  const {
    isLoading: isLoading2,
    data: teamScorers,
    isError: isError2,
    error: error2,
  } = useQuery(`team-scorers-${seasonId}`, async () => {
    return await axios.get(
      `teams/${singleTeam.id}?include=goalscorers.player.team,assistscorers.player.team,stats&seasons=${seasonId}`
    );
  });

  if (!isLoading2) {
    teamScorers?.data?.data?.goalscorers?.data.sort(
      (a, b) => b.goals - a.goals
    );
    teamScorers?.data?.data?.assistscorers?.data.sort(
      (a, b) => b.assists - a.assists
    );
  }
  if (isError2 || isLoading2 || teamScorers === undefined) {
    return (
      <div>
        <LeagueListShimmer />
        <LeaguePlayerStatsShimmer />
      </div>
    );
  } else {
    return (
      <div className="team_state__container">
        <div className={styles.league_details__wrapper}>
          <div>
            <Link
              href={`/league/${getSlugify(leagueName)}/${leagueId}`}
              className={`${styles.league_details__text} text-dec-none`}
            >
              <div>
                <Image
                  className={styles.league__logo}
                  loader={() => leagueLogo}
                  src={leagueLogo}
                  alt="League Logo"
                  width={35}
                  height={35}
                />
              </div>
              <div>
                <h6 className={styles.league__title}>{leagueName}</h6>
                <span className={styles.league__country}>{season}</span>
              </div>
            </Link>
          </div>
          <div className="season_list">
            <FiChevronDown
              className={styles.season_list__icon}
              onClick={handleShow}
            />
          </div>
        </div>

        {!isLoading1 &&
          teamPointTable?.data?.data.map((group) => {
            return group?.standings?.data.map((item) => {
              if (item.team_id == singleTeam.id) {
                return (
                  <div
                    key={item?.team_id}
                    className={styles.team_point_table__wrapper}
                  >
                    <div className={styles.points_header}>
                      <div className={styles.points_title}>
                        <h6>POINTS</h6>
                        <span>Rank {item?.position}</span>
                      </div>
                      <div className={styles.points_score}>
                        <h6>{item?.overall?.points}</h6>
                      </div>
                    </div>
                    <div>
                      <Table className={styles.main__table}>
                        <thead className={styles.league__list}>
                          <tr>
                            <th style={{ width: "10%" }}></th>
                            <th style={{ width: "5%" }}>GP</th>
                            <th style={{ width: "5%" }}>W</th>
                            <th style={{ width: "5%" }}>D</th>
                            <th style={{ width: "5%" }}>L</th>
                            <th style={{ width: "5%" }}>GF</th>
                            <th style={{ width: "5%" }}>GA</th>
                            <th style={{ width: "5%" }}>GD</th>
                            <th style={{ width: "5%" }}>PTS</th>
                          </tr>
                        </thead>
                        <tbody className="align-middle">
                          <tr className={styles.table_border}>
                            <td>Home</td>
                            <td>{item?.home?.games_played}</td>
                            <td>{item?.home?.won}</td>
                            <td>{item?.home?.draw}</td>
                            <td>{item?.home?.lost}</td>
                            <td>{item?.home?.goals_scored}</td>
                            <td>{item?.home?.goals_against}</td>
                            <td>
                              {item?.home?.goals_scored -
                                item?.home?.goals_against}
                            </td>
                            <td>{item?.home?.points}</td>
                          </tr>
                          <tr className={styles.table_border}>
                            <td>Away</td>
                            <td>{item?.away?.games_played}</td>
                            <td>{item?.away?.won}</td>
                            <td>{item?.away?.draw}</td>
                            <td>{item?.away?.lost}</td>
                            <td>{item?.away?.goals_scored}</td>
                            <td>{item?.away?.goals_against}</td>
                            <td>
                              {item?.away?.goals_scored -
                                item?.away?.goals_against}
                            </td>
                            <td>{item?.away?.points}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                );
              }
            });
          })}

        <div className="player_stats__wrapper">
          <Row>
            {!isLoading2 &&
              teamScorers?.data?.data?.goalscorers?.data.length > 0 && (
                <Col sm={12} lg={6}>
                  <div className={styles.league_player_bg}>
                    <div className={styles.player_state__title}>TOP SCORER</div>
                    {teamScorers?.data?.data?.goalscorers?.data
                      .map((result) => (
                        <div
                          key={result.position}
                          className={styles.league_player_stats}
                        >
                          <div className="left">
                            <Link
                              href={`/player/${getSlugify(
                                result?.player?.data?.common_name
                              )}/${result?.player?.data?.player_id}`}
                              className="text-dec-none"
                            >
                              <Image
                                className={styles.league__logo}
                                loader={() => result?.player?.data?.image_path}
                                src={result?.player?.data?.image_path}
                                alt="Player Image"
                                width={35}
                                height={35}
                              />
                              <span className={styles.league_team_name}>
                                {result?.player?.data?.common_name}
                              </span>
                            </Link>
                          </div>
                          <div className={styles.league_player_stats__right}>
                            <Link
                              href={`/team/${getSlugify(
                                result?.player?.data?.team?.data?.name
                              )}/${result?.player?.data?.team?.data?.id}`}
                            >
                              <Image
                                className={styles.league__logo}
                                loader={() =>
                                  result?.player?.data?.team?.data?.logo_path
                                }
                                src={
                                  result?.player?.data?.team?.data?.logo_path
                                }
                                alt="Team Image"
                                width={35}
                                height={35}
                              />
                              <span className={styles.league_team__goal}>
                                {result?.goals}
                              </span>
                            </Link>
                          </div>
                        </div>
                      ))
                      .slice(0, 10)}
                  </div>
                </Col>
              )}

            {!isLoading2 &&
              teamScorers?.data?.data?.assistscorers?.data.length > 0 && (
                <Col sm={12} lg={6}>
                  <div className={styles.league_player_bg}>
                    <div className={styles.player_state__title}>TOP ASSIST</div>
                    {teamScorers?.data?.data?.assistscorers?.data
                      .map((result) => (
                        <div
                          key={result.position}
                          className={`${styles.league_player_stats}`}
                        >
                          <div className="left">
                            <Link
                              href={`/player/${getSlugify(
                                result?.player?.data?.common_name
                              )}/${result?.player?.data?.player_id}`}
                              className="text-dec-none"
                            >
                              <Image
                                className={styles.league__logo}
                                loader={() => result?.player?.data?.image_path}
                                src={result?.player?.data?.image_path}
                                alt="Player Image"
                                width={35}
                                height={35}
                              />
                              <span className={styles.league_team_name}>
                                {result?.player?.data?.common_name}
                              </span>
                            </Link>
                          </div>
                          <div className={styles.league_player_stats__right}>
                            <Link
                              href={`/team/${getSlugify(
                                result?.player?.data?.team?.data?.name
                              )}/${result?.player?.data?.team?.data?.id}`}
                            >
                              <Image
                                className={styles.league__logo}
                                loader={() =>
                                  result?.player?.data?.team?.data?.logo_path
                                }
                                src={
                                  result?.player?.data?.team?.data?.logo_path
                                }
                                alt="Team Image"
                                width={35}
                                height={35}
                              />
                              <span className={styles.league_team__goal}>
                                {result.assists}
                              </span>
                            </Link>
                          </div>
                        </div>
                      ))
                      .slice(0, 10)}
                  </div>
                </Col>
              )}
          </Row>
        </div>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton className={styles.modal__header}>
            <Modal.Title className={styles.modal__title}>
              Choose Season
            </Modal.Title>
            <IoClose
              onClick={handleClose}
              className={styles.modal_cross__btn}
            />
          </Modal.Header>
          <Modal.Body>
            {singleTeam?.activeSeasons?.data.map((season) => (
              <div
                key={season?.id}
                className={styles.season_league_details__text}
                onClick={() =>
                  handleSeason(
                    season?.id,
                    season?.name,
                    season?.league?.data?.name,
                    season?.league?.data?.logo_path,
                    season?.league?.data?.id
                  )
                }
              >
                <div>
                  <Image
                    className={styles.league__logo}
                    loader={() => season?.league?.data?.logo_path}
                    src={season?.league?.data?.logo_path}
                    alt="League Logo"
                    width={30}
                    height={30}
                  />
                </div>
                <div>
                  <h6 className={styles.league__title}>
                    {season?.league?.data?.name}
                  </h6>
                  <span className={styles.league__country}>{season?.name}</span>
                </div>
              </div>
            ))}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
