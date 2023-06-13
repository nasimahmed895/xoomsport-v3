import NoDataFound from "@/components/NoDataFound";
import styles from "@/styles/team/TeamMatches.module.css";
import { Nav, Tab } from "react-bootstrap";
import { TbMinusVertical } from "react-icons/tb";
import RecentMatches from "./RecentMatches";
import UpcomingMatches from "./UpcomingMatches";

export default function TeamMatches({ singleTeam }) {
  if (singleTeam === undefined) {
    return <NoDataFound />;
  } else {
    return (
      <Tab.Container defaultActiveKey="upcoming">
        <div className={styles.league_list__wrapper}>
          <Nav className={styles.league__list_nav}>
            <Nav.Item className="ms-1">
              <Nav.Link
                eventKey="upcoming"
                className={styles.league_details_tab__nav}
              >
                Upcoming
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="ms-1">
              <Nav.Link
                eventKey="recents"
                className={styles.league_details_tab__nav}
              >
                Recents
              </Nav.Link>
            </Nav.Item>
            <TbMinusVertical className={styles.vertical__icon} />
          </Nav>
        </div>

        <Tab.Content>
          <Tab.Pane eventKey="upcoming">
            <UpcomingMatches singleTeam={singleTeam} />
          </Tab.Pane>
          <Tab.Pane eventKey="recents">
            <RecentMatches singleTeam={singleTeam} />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    );
  }
}
