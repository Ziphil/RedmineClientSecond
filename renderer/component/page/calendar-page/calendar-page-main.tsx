//

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/sharp-light-svg-icons";
import {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {TransitionLink} from "/renderer/component/atom/transition-link";
import {create} from "/renderer/component/create";
import {ActivityCalendar} from "/renderer/component/module/activity-calendar";
import {PageMain} from "/renderer/component/module/page";
import {useSuspenseResponse} from "/renderer/hook/request";
import {useSettings} from "/renderer/hook/settings";
import {data} from "/renderer/util/data";


export const CalendarPageMain = create(
  require("./calendar-page-main.scss"), "CalendarPageMain",
  function ({
    month,
    setActiveDate
  }: {
    month: Dayjs,
    setActiveDate: (date: Dayjs) => void
  }): ReactElement {

    const settings = useSettings();

    const [activities] = useSuspenseResponse("fetchMonthlyActivities", window.api.fetchMonthlyActivities, {month: month.format("YYYY-MM")});

    return (
      <PageMain styleName="root">
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
    );

  }
);