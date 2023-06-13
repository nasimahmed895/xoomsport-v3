import styles from "@/styles/watch/WatchList.module.css";
import { Nav, Tab } from "react-bootstrap";
import LiveMatchList from "./LiveMatchList";
import VideoList from "./VideoList";

export default function WatchList({ liveMatches, highlights }) {
	return (
		<Tab.Container defaultActiveKey="live">
			<div className={styles.content}>
				<Nav className={styles.live_match__heading}>
					<Nav.Item className="ms-1">
						<Nav.Link eventKey="live" className={styles.live_match_tab__item}>
							Live
						</Nav.Link>
					</Nav.Item>
					<Nav.Item className="ms-1">
						<Nav.Link eventKey="videos" className={styles.live_match_tab__item}>
							Videos
						</Nav.Link>
					</Nav.Item>
					<div className={styles.watch__btn}>WATCH</div>
				</Nav>
			</div>
			<div className={styles.responsive_content}></div>
			<Tab.Content>
				<Tab.Pane eventKey="live">
					<LiveMatchList liveMatches={liveMatches} />
				</Tab.Pane>
				<Tab.Pane eventKey="videos">
					<VideoList highlights={highlights} />
				</Tab.Pane>
			</Tab.Content>
			<div className="responsive_bottom"></div>
		</Tab.Container>
	);
}
