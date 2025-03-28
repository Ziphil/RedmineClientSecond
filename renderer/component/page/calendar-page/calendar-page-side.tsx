//

import {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {AddActivityForm} from "/renderer/component/module/add-activity-form";
import {PageSide} from "/renderer/component/module/page";
import {TimeView} from "/renderer/component/module/time-view";
import {WorkView} from "/renderer/component/module/work-view";
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
        <div styleName="main">
          <ol styleName="list">
            {activities?.map((activity, index) => (
              <li key={index} styleName="item">
                <div styleName="item-first">
                  <WorkView work={(activity.issue !== null) ? activity.issue : activity.project}/>
                </div>
                <div styleName="item-second">
                  <TimeView styleName="item-time" time={activity.time}/>
                </div>
              </li>
            ))}
          </ol>
          <div styleName="form">
            <AddActivityForm/>
          </div>
        </div>
      </PageSide>
    );

  }
);