//

import dayjs from "dayjs";
import {ReactElement, useState} from "react";
import {useParams} from "react-router-dom";
import {create} from "/renderer/component/create";
import {Page} from "/renderer/component/module/page";
import {useToday} from "/renderer/hook/today";
import {CalendarPageMain} from "./calendar-page-main";
import {CalendarPageSide} from "./calendar-page-side";


export const CalendarPage = create(
  require("./calendar-page.scss"), "CalendarPage",
  function ({
  }: {
  }): ReactElement {

    const today = useToday();

    const {monthString} = useParams();
    const month = dayjs(monthString, "YYYY-MM");

    const [activeDate, setActiveDate] = useState(() => {
      if (today.isSame(month, "month")) {
        return today;
      } else {
        return month.startOf("month");
      }
    });

    return (
      <Page styleName="root">
        <CalendarPageMain month={month} setActiveDate={setActiveDate}/>
        <CalendarPageSide activeDate={activeDate}/>
      </Page>
    );

  }
);