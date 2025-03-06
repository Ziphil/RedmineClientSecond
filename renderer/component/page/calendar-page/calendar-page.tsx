//

import {faArrowLeft, faArrowRight} from "@fortawesome/pro-light-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import {ReactElement, useState} from "react";
import {useParams} from "react-router-dom";
import {create} from "/renderer/component/create";
import {ActivityCalendar} from "/renderer/component/module/activity-calendar";
import {Page} from "/renderer/component/module/page";
import {useSettings} from "/renderer/hook/settings";
import {useToday} from "/renderer/hook/today";
import {data} from "/renderer/util/data";


export const CalendarPage = create(
  require("./calendar-page.scss"), "CalendarPage",
  function ({
  }: {
  }): ReactElement {

    const today = useToday();
    const settings = useSettings();

    const {monthString} = useParams();
    const month = dayjs(monthString, "YYYY-MM");

    const [activeDate, setActiveDate] = useState(() => {
      if (today.isSame(month, "month")) {
        return today;
      } else {
        return month.startOf("month");
      }
    });

    return (
      <Page styleName="root">
        <section styleName="main">
          <div styleName="heading">
            <div styleName="side" {...data({position: "left"})}>
              <FontAwesomeIcon icon={faArrowLeft}/>
            </div>
            <div styleName="center">
              <div styleName="year">{month.format("YYYY")}</div>
              <div styleName="month">{month.format("M")}</div>
            </div>
            <div styleName="side" {...data({position: "right"})}>
              <FontAwesomeIcon icon={faArrowRight}/>
            </div>
          </div>
          <ActivityCalendar
            styleName="calendar"
            month={month}
            exceptionalOffDates={settings.exceptionalOffDates}
            onClick={setActiveDate}
          />
        </section>
        <section styleName="side">
          {activeDate.format("YYYY-MM-DD")}
        </section>
      </Page>
    );

  }
);