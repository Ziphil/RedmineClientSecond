//

import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {data} from "/renderer/util/data";


export const ActivityCalendarDummyItem = create(
  require("./activity-calendar-dummy-item.scss"), "ActivityCalendarDummyItem",
  function ({
  }: {
  }): ReactElement {

    return (
      <div styleName="root" {...data({off: true})}>
      </div>
    );

  }
);