//

import {Dayjs} from "dayjs";
import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {PageSide} from "/renderer/component/module/page";


export const CalendarPageSide = create(
  require("./calendar-page-side.scss"), "CalendarPageSide",
  function ({
    activeDate
  }: {
    activeDate: Dayjs
  }): ReactElement {

    return (
      <PageSide styleName="root">
        {activeDate.format("YYYY-MM-DD")}
      </PageSide>
    );

  }
);