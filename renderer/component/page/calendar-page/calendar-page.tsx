//

import dayjs from "dayjs";
import {ReactElement} from "react";
import {useParams} from "react-router-dom";
import {create} from "/renderer/component/create";
import {Page} from "/renderer/component/module/page";


export const CalendarPage = create(
  null, "CalendarPage",
  function ({
  }: {
  }): ReactElement {

    const {monthString} = useParams();
    const month = dayjs(monthString, "YYYY-MM");

    return (
      <Page>
        {month.format("YYYY/MM")}
      </Page>
    );

  }
);