//

import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {Activity} from "/renderer/type/activity";
import {ActivityItem} from "./activity-item";


export const ActivityList = create(
  require("./activity-list.scss"), "ActivityList",
  function ({
    activities
  }: {
    activities: Array<Activity>
  }): ReactElement {

    return (
      <ol styleName="root">
        {activities?.map((activity, index) => (
          <ActivityItem key={index} activity={activity}/>
        ))}
      </ol>
    );

  }
);