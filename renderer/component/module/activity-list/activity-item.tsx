//

import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {TimeView} from "/renderer/component/module/time-view";
import {WorkView} from "/renderer/component/module/work-view";
import {Activity} from "/renderer/type/activity";


export const ActivityItem = create(
  require("./activity-item.scss"), "ActivityItem",
  function ({
    activity
  }: {
    activity: Activity
  }): ReactElement {

    return (
      <li styleName="root">
        <div styleName="top">
          <WorkView work={(activity.issue !== null) ? activity.issue : activity.project}/>
        </div>
        <div styleName="bottom">
          <TimeView styleName="time" time={activity.time}/>
        </div>
      </li>
    );

  }
);