//

import {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {TimeView} from "/renderer/component/module/time-view";
import {isOffDate} from "/renderer/util/date";


export const ActivityCalendarItem = create(
  require("./activity-calendar-item.scss"), "ActivityCalendarItem",
  function ({
    date,
    exceptionalOffDates
  }: {
    date: Dayjs,
    exceptionalOffDates: Array<string>
  }): ReactElement {

    const off = isOffDate(date, exceptionalOffDates);

    return (
      <button styleName="root" type="button" disabled={off}>
        <div styleName="heading">
          <div styleName="day">
            {date.format("D")}
          </div>
          {(!off) && (
            <div styleName="time">
              <TimeView time={1000 * 60 * (Math.random() * 480)}/>
            </div>
          )}
        </div>
      </button>
    );

  }
);