//

import {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {SingleLineText} from "/renderer/component/atom/single-line-text";
import {create} from "/renderer/component/create";
import {PageSide} from "/renderer/component/module/page";
import {TimeView} from "/renderer/component/module/time-view";
import {useResponse} from "/renderer/hook/request";


export const CalendarPageSide = create(
  require("./calendar-page-side.scss"), "CalendarPageSide",
  function ({
    date
  }: {
    date: Dayjs
  }): ReactElement {

    const [activities] = useResponse("fetchDailyActivities", window.api.fetchDailyActivities, {date: date.format("YYYY-MM-DD")});

    const totalTime = activities?.reduce((time, activity) => time + activity.time, 0);

    return (
      <PageSide styleName="root">
        <div styleName="heading">
          <div styleName="date">
            <span styleName="year">{date.format("YYYY")}</span>
            <div styleName="day-container">
              <span styleName="month">{date.format("M")}</span>
              <span styleName="slash">·</span>
              <span styleName="day">{date.format("D")}</span>
            </div>
          </div>
          {(totalTime !== undefined) && (
            <div styleName="time">
              <TimeView time={totalTime}/>
            </div>
          )}
        </div>
        {(activities !== undefined) && (
          <ol styleName="list">
            {activities.map((activity, index) => (
              <li key={index} styleName="item">
                <div styleName="item-first">
                  <span styleName="badge">{activity.issue?.id ?? "PJ"}</span>
                  <SingleLineText styleName="item-name">{activity.project.name}</SingleLineText>
                </div>
                <div styleName="item-second">
                  <TimeView styleName="item-time" time={activity.time}/>
                </div>
              </li>
            ))}
          </ol>
        )}
      </PageSide>
    );

  }
);