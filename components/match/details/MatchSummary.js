import style from "@/styles/match/details/MatchSummary.module.css";
import { Tab } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import MatchSummaryCommentary from "./MatchSummaryCommentary";
import MatchSummaryEvents from "./MatchSummaryEvents";

export default function MatchSummary({ singleMatch }) {
	return (
		<>
			<Tab.Container defaultActiveKey="events">
				<Nav
					className={`${style.league_details_tab__heading} ${style.league__list_nav}`}
				>
					<Nav.Item className="ms-1">
						<Nav.Link
							eventKey="events"
							className={style.league_details_tab__nav}
						>
							EVENTS
						</Nav.Link>
					</Nav.Item>
					<Nav.Item className="ms-1">
						<Nav.Link
							eventKey="commentary"
							className={style.league_details_tab__nav}
						>
							COMMENTARY
						</Nav.Link>
					</Nav.Item>
				</Nav>

				<Tab.Content>
					<Tab.Pane eventKey="events">
						<MatchSummaryEvents match_id={singleMatch.id} />
					</Tab.Pane>
					<Tab.Pane eventKey="commentary">
						<MatchSummaryCommentary match_id={singleMatch.id} />
					</Tab.Pane>
				</Tab.Content>
			</Tab.Container>
		</>
	);
}
