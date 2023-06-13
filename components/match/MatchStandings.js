import style from "@/styles/match/MatchStanding.module.css";
import { Tab } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import StandingsTableAway from "./StandingsTableAway";
import StandingsTableHome from "./StandingsTableHome";
import StandingsTableOverall from "./StandingsTableOverall";

export default function MatchStandings({ season_id }) {
  return (
    <Tab.Container defaultActiveKey="all">
      <Nav
        className={`${style.league_details_tab__heading} ${style.league__list_nav}`}
      >
        <Nav.Item className="ms-1">
          <Nav.Link eventKey="all" className={style.league_details_tab__nav}>
            ALL
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="ms-1">
          <Nav.Link eventKey="home" className={style.league_details_tab__nav}>
            HOME
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="ms-1">
          <Nav.Link eventKey="away" className={style.league_details_tab__nav}>
            AWAY
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="overflow_991_max">
        <Tab.Content>
          <Tab.Pane eventKey="all">
            <StandingsTableOverall season_id={season_id} />
          </Tab.Pane>
          <Tab.Pane eventKey="home">
            <StandingsTableHome season_id={season_id} />
          </Tab.Pane>
          <Tab.Pane eventKey="away">
            <StandingsTableAway season_id={season_id} />
          </Tab.Pane>
        </Tab.Content>
      </div>
    </Tab.Container>
  );
}
