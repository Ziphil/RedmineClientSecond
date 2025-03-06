//

import {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {Activity, DateString} from "/renderer/type";
import {ActivityCalendarDummyItem} from "./activity-calendar-dummy-item";
import {ActivityCalendarItem} from "./activity-calendar-item";


export const ActivityCalendar = create(
  require("./activity-calendar.scss"), "ActivityCalendar",
  function ({
    month,
    activities,
    exceptionalOffDates,
    onClick,
    className
  }: {
    month: Dayjs,
    activities: Map<DateString, Array<Activity>>,
    exceptionalOffDates: Array<string>,
    onClick: (date: Dayjs) => void,
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
          <ActivityCalendarItem
            key={date.format("YYYY-MM-DD")}
            date={date}
            activities={activities.get(date.format("YYYY-MM-DD")) ?? []}
            exceptionalOffDates={exceptionalOffDates}
            onClick={onClick}
          />
        ))}
        {Array.from({length: succeedingDateCount}).map((dummy, index) => (
          <ActivityCalendarDummyItem key={index}/>
        ))}
      </div>
    );

  }
);