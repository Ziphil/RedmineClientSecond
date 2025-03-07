//

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/sharp-light-svg-icons";
import dayjs from "dayjs";
import {ReactElement, useState} from "react";
import {useParams} from "react-router-dom";
import {TransitionLink} from "/renderer/component/atom/transition-link";
import {create} from "/renderer/component/create";
import {ActivityCalendar} from "/renderer/component/module/activity-calendar";
import {Page, PageMain, PageSide} from "/renderer/component/module/page";
import {useSuspenseResponse} from "/renderer/hook/request";
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

    const [activities] = useSuspenseResponse("fetchMonthlyActivities", window.api.fetchMonthlyActivities, {month: month.format("YYYY-MM")});

    const [activeDate, setActiveDate] = useState(() => {
      if (today.isSame(month, "month")) {
        return today;
      } else {
        return month.startOf("month");
      }
    });

    return (
      <Page styleName="root">
        <PageMain styleName="main">
          <div styleName="heading">
            <div styleName="heading-side" {...data({position: "left"})}>
              <TransitionLink styleName="link" to={`/calendar/${month.subtract(1, "month").format("YYYY-MM")}`}>
                <FontAwesomeIcon icon={faArrowLeft}/>
              </TransitionLink>
            </div>
            <div styleName="center">
              <div styleName="year">{month.format("YYYY")}</div>
              <div styleName="month">{month.format("M")}</div>
            </div>
            <div styleName="heading-side" {...data({position: "right"})}>
              <TransitionLink styleName="link" to={`/calendar/${month.add(1, "month").format("YYYY-MM")}`}>
                <FontAwesomeIcon icon={faArrowRight}/>
              </TransitionLink>
            </div>
          </div>
          <ActivityCalendar
            styleName="calendar"
            month={month}
            activities={activities}
            exceptionalOffDates={settings.exceptionalOffDates}
            onClick={setActiveDate}
          />
        </PageMain>
        <PageSide styleName="side">
          {activeDate.format("YYYY-MM-DD")}
        </PageSide>
      </Page>
    );

  }
);