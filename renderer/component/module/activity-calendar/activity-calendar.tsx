//

import {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {ActivityCalendarDummyItem} from "./activity-calendar-dummy-item";
import {ActivityCalendarItem} from "./activity-calendar-item";


export const ActivityCalendar = create(
  require("./activity-calendar.scss"), "ActivityCalendar",
  function ({
    month,
    exceptionalOffDates,
    className
  }: {
    month: Dayjs,
    exceptionalOffDates: Array<string>,
    className?: string
  }): ReactElement {

    const firstDate = month.startOf("month");
    const precedingDateCount = (firstDate.day() + 6) % 7;
    const succeedingDateCount = 42 - precedingDateCount - month.daysInMonth();

    const dates = Array.from({length: month.daysInMonth()}).map((dummy, index) => firstDate.add(index, "day"));

    return (
      <div styleName="root" className={className}>
        {Array.from({length: precedingDateCount}).map((dummy, index) => (
          <ActivityCalendarDummyItem key={index}/>
        ))}
        {dates.map((date) => (
          <ActivityCalendarItem key={date.date()} date={date} exceptionalOffDates={exceptionalOffDates}/>
        ))}
        {Array.from({length: succeedingDateCount}).map((dummy, index) => (
          <ActivityCalendarDummyItem key={index}/>
        ))}
      </div>
    );

  }
);