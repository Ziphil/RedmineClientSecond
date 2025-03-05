//

import {ReactElement} from "react";
import {create} from "/renderer/component/create";


export const ActivityCalendarDummyItem = create(
  require("./activity-calendar-dummy-item.scss"), "ActivityCalendarDummyItem",
  function ({
  }: {
  }): ReactElement {

    return (
      <button styleName="root" type="button" disabled={true}>
      </button>
    );

  }
);