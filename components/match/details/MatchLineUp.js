import styles from "@/styles/match/details/MatchLineUp.module.css";
import axios from "@/utils/api/getAxios";
import getSlugify from "@/utils/getSlugify";
import Image from "next/image";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import NoDataFound from "../../NoDataFound";

export default function MatchLineUp({ singleMatch }) {
  var localteam_formation = "";
  var visitorteam_formation = "";
  let localTeamArray = [];
  let visiTorteamArray = [];

  const {
    isLoading,
    data: lineup,
    isError,
    error,
  } = useQuery(`lineup-${singleMatch.id}`, async () => {
    return await axios.get(
      `fixtures/${singleMatch.id}?include=lineup.player,bench.player,substitutions.player`
    );
  });

  if (isLoading || isError || lineup.data.data === undefined) {
    return <NoDataFound />;
  } else {
    lineup.data.data.lineup.data.forEach((element) => {
      if (element.team_id === singleMatch.localteam_id) {
        localTeamArray.push(element);
      } else {
        visiTorteamArray.push(element);
      }
    });

    localteam_formation =
      lineup.data.data.formations.localteam_formation?.split("-");
    visitorteam_formation =
      lineup.data.data.formations.visitorteam_formation?.split("-");
    const newFirstElement = "1";
    const newSecondElement = "1";
    const newArray = [newFirstElement].concat(localteam_formation);
    const new1Array = [newSecondElement].concat(visitorteam_formation);

    const listofStringLocalTeamArray = [];
    const listofStringVisiTorteamArray = [];
    for (let i = 0; i < newArray.map((i) => Number(i)).length; i++) {
      const first = localTeamArray.splice(0, newArray.map((i) => Number(i))[i]);
      listofStringLocalTeamArray.push(first);
    }

    for (let i = 0; i < new1Array.map((i) => Number(i)).length; i++) {
      const first = visiTorteamArray.splice(
        0,
        new1Array.map((i) => Number(i))[i]
      );
      listofStringVisiTorteamArray.push(first);
    }

    let localteamsubstitutions = [];
    let visitorteamSubstitutions = [];
    lineup.data.data.substitutions.data.forEach((element) => {
      if (element.team_id == singleMatch.localteam_id) {
        localteamsubstitutions.push(element);
      } else {
        visitorteamSubstitutions.push(element);
      }
    });

    return (
      <Row className="mt-3">
        <Col className="col-lg-7 col-12">
          <div className={styles.player_list}>
            <div className="position-relative">
              <Image
                className={styles.fild_image}
                src="/static/images/matches/field.png"
                alt="League Logo"
                width={0}
                height={0}
                sizes="100vw"
              />
            </div>

            <div
              className="py-2"
              style={{ position: "absolute", top: "0", color: "white" }}
            >
              <Image
                className="m-3"
                loader={() => singleMatch.localTeam.data.logo_path}
                src={singleMatch.localTeam.data.logo_path}
                alt="League Logo"
                width={35}
                height={35}
              />
              <span className="font-helvetica-medium">
                {singleMatch.localTeam.data.name}
              </span>
            </div>
            <div
              className="py-2 text-end"
              style={{
                position: "absolute",
                bottom: "0",
                color: "white",
                right: "0",
              }}
            >
              <span className="font-helvetica-medium">
                {singleMatch.visitorTeam.data.name}
              </span>
              <Image
                className="m-3"
                loader={() => singleMatch.visitorTeam.data.logo_path}
                src={singleMatch.visitorTeam.data.logo_path}
                alt="League Logo"
                width={35}
                height={35}
              />
            </div>

            <div className={styles.player}>
              {listofStringLocalTeamArray.map((numb) => (
                <>
                  <div className="d-flex justify-content-around align-items-center">
                    {numb.map((item) => (
                      <>
                        <Link
                          href={`/player/${getSlugify(item.player_name)}/${
                            item.player_id
                          }`}
                          className="text-dec-none"
                        >
                          <div className="text-center">
                            <div className={styles.fild_text}>
                              <Image
                                className={styles.player_image}
                                loader={() => item.player.data.image_path}
                                src={item.player.data.image_path}
                                alt="League Logo"
                                width={0}
                                height={0}
                              />
                            </div>
                            <div className={styles.fild_text}>
                              {" "}
                              {item.number} {item.player_name}
                            </div>
                          </div>
                        </Link>
                      </>
                    ))}
                  </div>
                </>
              ))}
              {listofStringVisiTorteamArray
                .map((numb) => (
                  <>
                    <div className="d-flex justify-content-around align-items-center">
                      {numb.map((item) => (
                        <>
                          <Link
                            href={`/player/${getSlugify(item.player_name)}/${
                              item.player_id
                            }`}
                            className="text-dec-none"
                          >
                            <div className="text-center">
                              <div className={styles.fild_text}>
                                <Image
                                  className={styles.player_image}
                                  loader={() => item?.player?.data?.image_path}
                                  src={item?.player?.data?.image_path}
                                  alt="Player Image"
                                  width={0}
                                  height={0}
                                />
                              </div>
                              <div className={styles.fild_text}>
                                {item.number} {item.player_name}
                              </div>
                            </div>
                          </Link>
                        </>
                      ))}
                    </div>
                  </>
                ))
                .reverse()}
            </div>
          </div>
        </Col>
        <Col className="col-lg-5 col-12">
          <div class={` ${styles.lineup_card} card`}>
            <div class="card-body">
              <h5 class="card-title mb-3">Bench</h5>
              <div className="d-flex justify-content-between">
                <div>
                  {localteamsubstitutions?.map((item) => (
                    <>
                      <div className=" text-center">
                        <div className="text-center mb-3">
                          <div className="position-relative">
                            <span className={styles.bench}>
                              {item.minute}
                              {"'"}
                              <Image
                                src="/static/images/matches/sub2.png"
                                alt="League Logo"
                                width={14}
                                height={15}
                              />
                            </span>
                            <Image
                              className={styles.player_image}
                              loader={() => item?.player?.data?.image_path}
                              src={item?.player?.data?.image_path}
                              alt="Player Image"
                              width={30}
                              height={30}
                            />
                            <Link
                              href={`/player/${getSlugify(
                                item?.player?.data?.display_name
                              )}/${item?.player?.data?.player_id}`}
                              className="text-dec-none"
                            >
                              <div className={styles.fild_rightsid_text}>
                                ({item?.player?.data?.position_id}){" "}
                                {item?.player?.data?.display_name}
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                <div>
                  {visitorteamSubstitutions?.map((item) => (
                    <>
                      <div className=" text-center">
                        <div className="text-center mb-3">
                          <div className="position-relative">
                            <span className={styles.bench}>
                              {item.minute}
                              {"'"}
                              <Image
                                src="/static/images/matches/sub2.png"
                                alt="League Logo"
                                width={14}
                                height={15}
                              />
                            </span>
                            <Image
                              className={styles.player_image}
                              loader={() => item?.player?.data?.image_path}
                              src={item?.player?.data?.image_path}
                              alt="Player Image"
                              width={30}
                              height={30}
                            />
                            <Link
                              href={`/player/${getSlugify(
                                item?.player?.data?.display_name
                              )}/${item?.player?.data?.player_id}`}
                              className="text-dec-none"
                            >
                              <div className={styles.fild_rightsid_text}>
                                ({item?.player?.data?.position_id}){" "}
                                {item?.player?.data?.display_name}
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}
