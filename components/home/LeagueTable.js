import styles from "@/styles/home/LeagueTable.module.css";
import axios from "@/utils/api/getAxios";
import getShortName from "@/utils/getShortName";
import getSlugify from "@/utils/getSlugify";
import Image from "next/image";
import Link from "next/link";
import { Table } from "react-bootstrap";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import ShortLeagueTableShimmer from "../shimmer/home/ShortLeagueTableShimmer";

export default function LeagueTable({ pointTableData }) {

  const {
    isLoading,
    data: leagueTable,
    isError,
  } = useQuery(
    `league-table-${pointTableData[0]?.current_season_id}`,
    async () => {
      return await axios.get(
        `standings/season/${pointTableData[0]?.current_season_id}?include=standings.team`
      );
    },
    {
      staleTime: 1000 * 60 * 60, // 1 Hour
    }
  );

  if (isError) {
    toast.warn("Please check your internet connetion or try again!", {
      theme: "dark",
    });
  }

  if (isLoading || isError) {
    return <ShortLeagueTableShimmer />;
  } else {
    if (leagueTable.data.error) {
      return <ShortLeagueTableShimmer />;
    } else {
      return (
        <div className="league__container container_clip_path2">
          <div className={`${styles.league_table__heading}`}>
            <div>
              <h6 className={styles.league_table__title}>
                {pointTableData[0]?.name ?? ""}
              </h6>
              <span className={styles.league_table_desc}>
                {pointTableData[0]?.country?.data?.name ?? ""}
              </span>
            </div>
            <div>
              <Image
                className={styles.league__logo}
                loader={() => pointTableData[0]?.logo_path}
                src={pointTableData[0]?.logo_path}
                alt="League Logo"
                width={30}
                height={30}
                unoptimized={true}
              />
            </div>
          </div>

          <div className={styles.league__list}>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team</th>
                  <th>PL</th>
                  <th>GD</th>
                  <th>PTS</th>
                </tr>
              </thead>
              <tbody className="vertical_middle">
                {leagueTable?.data?.data[0]?.standings?.data.map((team) => (
                  <tr key={team?.position}>
                    <td>{team?.position}</td>
                    <td
                      style={{
                        width: "50%",
                      }}
                    >
                      <Link
                        href={`/team/${getSlugify(team?.team_name)}/${
                          team?.team_id
                        }`}
                        className="text-dec-none d-flex align-items-center"
                      >
                        <Image
                          className={styles.team__logo}
                          loader={() => team?.team?.data?.logo_path}
                          src={team?.team?.data?.logo_path}
                          alt="Team Logo"
                          width={20}
                          height={20}
                          unoptimized={true}
                        />
                        <span className="d-block">
                          {getShortName(
                            team?.team_name,
                            team?.team?.data?.short_code
                          )}
                        </span>
                      </Link>
                    </td>
                    <td>{team?.overall?.games_played}</td>
                    <td>
                      {team?.overall?.goals_scored -
                        team?.overall?.goals_against}
                    </td>
                    <td>{team?.overall?.points}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      );
    }
  }
}
