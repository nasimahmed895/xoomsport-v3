import styles from "@/styles/home/Fixture.module.css";
import getDateRange from "@/utils/getDateRange";
import { useRef, useState } from "react";
import DatePicker from "./DatePicker";
import FixtureList from "./FixtureList";
export default function Fixtures() {
  const dateList = getDateRange();
  const flatpickrRef = useRef(null);
  const [dates, setDates] = useState(dateList);
  const [live, setLive] = useState(false);
  const [pickrDate, setpickrDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const handleDate = (date) => {
    const newDate = new Date(date);
    const dateList = getDateRange(newDate);
    setDates(dateList);
    setpickrDate(date);
    flatpickrRef?.current?.flatpickr?.setDate(date);
  };

  const handleLive = () => {
    setLive(!live);
  };
  return (
    <div className="fixture__container overflow">
      <div className={styles.datepicker_content}>
        <DatePicker
          ref={flatpickrRef}
          dates={dates}
          handleDate={handleDate}
          handleLive={handleLive}
          live={live}
        />
      </div>
      <div className={styles.fixturelist}>
        {live ? <FixtureList /> : <FixtureList pickrDate={pickrDate} />}
        <div className="responsive_bottome"></div>
      </div>
    </div>
  );
}
