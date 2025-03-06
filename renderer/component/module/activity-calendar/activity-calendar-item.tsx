//

import {Dayjs} from "dayjs";
import {ReactElement, useCallback} from "react";
import {create} from "/renderer/component/create";
import {TimeView} from "/renderer/component/module/time-view";
import {Activity} from "/renderer/type";
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

    const totalTime = activities.reduce((time, activity) => time + activity.time, 0);
    const off = isOffDate(date, exceptionalOffDates);

    const handleClick = useCallback(() => {
      onClick(date);
    }, [date, onClick]);

    return (
      <button styleName="root" type="button" disabled={off} onClick={handleClick}>
        <div styleName="heading">
          <div styleName="day">
            {date.format("D")}
          </div>
          {(!off) && (
            <div styleName="time">
              <TimeView time={totalTime}/>
            </div>
          )}
        </div>
      </button>
    );

  }
);