import styles from "@/styles/home/DatePicker.module.css";
import getIsToday from "@/utils/getIsToday";
import getMonth from "@/utils/getMonth";
import "flatpickr/dist/themes/dark.css";
import Image from "next/image";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Flatpickr from "react-flatpickr";

function DatePicker({ dates, handleDate, handleLive, live }, flatpickrRef) {
  const getDay = (date) => {
    var newDate = new Date(date);
    return newDate.toString().split(" ")[0];
  };

  return (
    <div className="">
      <div className="rotate_main">
        <div className={styles.date_picker__container}>
          <div
            onClick={handleLive}
            className={`rotate_content ${
              live ? styles.live__btn_on : styles.live__btn_off
            }`}
          >
            <span
              className={`${styles.live_btn_text} ${
                live ? null : styles.live__indicator
              }`}
            >
              Live
            </span>
          </div>
          <div className={styles.date_picker__content}>
            <Row className="mt-3 rotate_content">
              <Col lg={11} xs={10} className={styles.date_picker__list}>
                <div className={styles.date_picker_list__wrapper}>
                  {dates.map((item, index) => (
                    <div
                      key={item}
                      className={styles.date_picker__item}
                      onClick={() => handleDate(item)}
                    >
                      <p
                        className={styles.date_picker__day}
                        id={index === 4 ? styles.date_picker__active : ""}
                      >
                        {getIsToday(item) ? "TODAY" : getDay(item)}
                      </p>
                      <p
                        className={styles.date_picker__month}
                        id={index === 4 ? styles.date_picker__active : ""}
                      >
                        {item.slice(8, 10)} {getMonth(item)}
                      </p>
                    </div>
                  ))}
                </div>
              </Col>

              <Col lg={1} xs={2} className={styles.date_picker__icon}>
                <Flatpickr
                  ref={flatpickrRef}
                  render={({ defaultValue, value, ...props }, ref) => (
                    <Image
                      src="/static/images/calendar.png"
                      alt="logo"
                      ref={ref}
                      {...props}
                      width={20}
                      height={20}
                    />
                  )}
                  options={{
                    onChange: function (selectedDates, dateStr) {
                      handleDate(dateStr);
                    },
                    disableMobile: "true",
                  }}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

const forwardedDatePicker = React.forwardRef(DatePicker);

export default forwardedDatePicker;
