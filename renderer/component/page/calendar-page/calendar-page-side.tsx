//

import {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {LoadingIcon} from "/renderer/component/atom/loading-icon";
import {create} from "/renderer/component/create";
import {ActivityList} from "/renderer/component/module/activity-list";
import {AddActivityForm} from "/renderer/component/module/add-activity-form";
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
        <div styleName="main">
          <div styleName="list">
            {(activities !== undefined) ? (
              <ActivityList activities={activities}/>
            ) : (
              <LoadingIcon styleName="loading"/>
            )}
          </div>
          <div styleName="form">
            <AddActivityForm date={date}/>
          </div>
        </div>
      </PageSide>
    );

  }
);