//

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight} from "@fortawesome/sharp-light-svg-icons";
import {Dayjs} from "dayjs";
import {ReactElement, useCallback} from "react";
import {SingleLineText} from "/renderer/component/atom/single-line-text";
import {create} from "/renderer/component/create";
import {TimeView} from "/renderer/component/module/time-view";
import {useToday} from "/renderer/hook/today";
import {Activity} from "/renderer/type";
import {data} from "/renderer/util/data";
import {isOffDate} from "/renderer/util/date";


export const ActivityCalendarItem = create(
  require("./activity-calendar-item.scss"), "ActivityCalendarItem",
  function ({
    date,
    activities,
    exceptionalOffDates,
    onClick
  }: {
    date: Dayjs,
    activities: Array<Activity>,
    exceptionalOffDates: Array<string>,
    onClick: (date: Dayjs) => void
  }): ReactElement {

    const today = useToday();

    const totalTime = activities.reduce((time, activity) => time + activity.time, 0);

    const off = isOffDate(date, exceptionalOffDates);
    const now = today.isSame(date, "date");
    const alert = date.isBefore(today, "date") && totalTime < 1000 * 60 * 60 * 8;

    const handleClick = useCallback(() => {
      onClick(date);
    }, [date, onClick]);

    return (
      <button styleName="root" type="button" onClick={handleClick} {...data({off, now, alert})}>
        <div styleName="heading">
          <div styleName="date">
            {date.format("D")}
          </div>
          {(!off) && (
            <div styleName="time">
              <TimeView time={totalTime}/>
            </div>
          )}
        </div>
        <ol styleName="list">
          {activities.map((activity, index) => (
            <li key={index} styleName="item">
              <FontAwesomeIcon styleName="item-icon" icon={faAngleRight}/>
              <SingleLineText styleName="item-name">{activity.project.name}</SingleLineText>
            </li>
          ))}
        </ol>
      </button>
    );

  }
);