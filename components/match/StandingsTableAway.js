import style from "@/styles/match/MatchStanding.module.css";
import axios from "@/utils/api/getAxios";
import getSlugify from "@/utils/getSlugify";
import Link from "next/link";
import { Image, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import NoDataFound from "../NoDataFound";
import LeagueListShimmer from "../shimmer/league/FullLeagueTableShimmer";

export default function StandingsTable({ season_id }) {
  const color = ["#00ff00", "#FFDD00", "#0000FF", "#FF0000"];
  const resultColor = new Map();
  let colorArr = [];
  const {
    isLoading,
    data: standings,
    isError,
    error,
  } = useQuery(`standings-table-${season_id}`, async () => {
    return await axios.get(
      `standings/season/${season_id}?include=standings.team,country`
    );
  });
  if (isLoading || isError || standings.data.data === undefined) {
    return <LeagueListShimmer />;
  } else {
    if (standings.data.data[0] != undefined) {
      if (!isLoading) {
        const orderArray = standings.data.data[0].standings.data;
        orderArray.sort((a, b) => b.away.points - a.away.points);
        var name = [];
        let i = 0;
        if (standings.data.data[0].standings.data.length > 0) {
          for (
            let index = 0;
            index < standings.data.data[0].standings.data.length;
            index++
          ) {
            if (
              standings.data.data[0].standings.data[index].result != null &&
              !name.includes(
                standings.data.data[0].standings.data[index].result
              )
            ) {
              name.push(standings.data.data[0].standings.data[index].result);
              resultColor.set(
                standings.data.data[0].standings.data[index].result,
                standings.data.data[0].standings.data[index].result ==
                  "Relegation"
                  ? "red"
                  : color[i]
              );
              i++;
            }
          }
        }
        colorArr = [...resultColor.entries()];
      }
      const getColor = (name) => {
        for (let i = 0; i < colorArr.length; i++) {
          if (colorArr[i][0] === name) {
            return colorArr[i][1];
          }
        }
        return null;
      };

      if (!isLoading) {
        if (standings.data.data[0].name.includes("Group")) {
          return (
            <>
              {standings.data.data.map((group) => (
                <div key={group.id} className="league__container">
                  <h6 className="m-3">{group.name}</h6>
                  <div className={style.table_contenet}>
                    <Table className={style.main__table}>
                      <thead>
                        <tr>
                          <th style={{ width: "5%" }}>#</th>
                          <th style={{ width: "20%" }}>TEAM</th>
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
                        {group.standings.data.map((item, index) => (
                          <tr
                            key={item.position}
                            className={style.table_border}
                          >
                            <td>
                              <td>
                                <span
                                  style={{
                                    color: getColor(item.result),
                                    marginRight: "5px",
                                  }}
                                >
                                  {getColor(item.result) ? "|" : ""}
                                </span>
                                {item.position}
                              </td>
                            </td>
                            <td>
                              <span className={style.table_img_name}>
                                <Link
                                  className="text-dec-none"
                                  href={`/team/${getSlugify(
                                    item.team.data.name
                                  )}/${item.team.data.id}`}
                                >
                                  <Image
                                    className={style.league__logo}
                                    loader={() => item.team.data.logo_path}
                                    src={item.team.data.logo_path}
                                    alt="League Logo"
                                    width={40}
                                    height={40}
                                  />
                                  {item.team_name}
                                </Link>
                              </span>
                            </td>
                            <td>{item.away.games_played}</td>
                            <td> {item.away.won}</td>
                            <td> {item.away.draw}</td>
                            <td> {item.away.lost}</td>
                            <td> {item.away.goals_scored}</td>
                            <td> {item.away.goals_against}</td>
                            <td>
                              {item.away.goals_scored - item.away.goals_against}
                            </td>
                            <td> {item.away.points}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              ))}
              <div>
                {colorArr.map((item) => (
                  <>
                    <div className="color_div">
                      <div
                        className="color_border"
                        style={{
                          backgroundColor: item[1],
                        }}
                      ></div>
                      <span className="color_text"> {item[0]}</span>
                    </div>
                  </>
                ))}
              </div>
            </>
          );
        } else {
          return (
            <div className="league__container">
              <div>
                <Table className={style.main__table}>
                  <thead>
                    <tr>
                      <th style={{ width: "5%" }}>#</th>
                      <th style={{ width: "20%" }}>TEAM</th>
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
                    {standings.data.data[0].standings.data.map((item) => (
                      <tr key={item.position} className={style.table_border}>
                        <td>
                          <span
                            style={{
                              color: getColor(item.result),
                              marginRight: "5px",
                            }}
                          >
                            {getColor(item.result) ? "|" : ""}
                          </span>
                          {item.position}
                        </td>
                        <td>
                          <span className={style.table_img_name}>
                            <Link
                              className="text-dec-none"
                              href={`/team/${getSlugify(item.team.data.name)}/${
                                item.team.data.id
                              }`}
                            >
                              <Image
                                className={style.league__logo}
                                loader={() => item.team.data.logo_path}
                                src={item.team.data.logo_path}
                                alt="League Logo"
                                width={40}
                                height={40}
                              />
                              {item.team_name}
                            </Link>
                          </span>
                        </td>
                        <td>{item.away.games_played}</td>
                        <td> {item.away.won}</td>
                        <td> {item.away.draw}</td>
                        <td> {item.away.lost}</td>
                        <td> {item.away.goals_scored}</td>
                        <td> {item.away.goals_against}</td>
                        <td>
                          {item.away.goals_scored - item.away.goals_against}
                        </td>
                        <td> {item.away.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <div className={style.color__table}>
                  {colorArr.map((item) => (
                    <>
                      <div className="color_div">
                        <div
                          className="color_border"
                          style={{
                            backgroundColor: item[1],
                          }}
                        ></div>
                        <span className="color_text"> {item[0]}</span>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          );
        }
      }
    } else {
      return <NoDataFound />;
    }
  }
}
