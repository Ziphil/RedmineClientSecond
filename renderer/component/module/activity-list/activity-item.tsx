//

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/sharp-light-svg-icons";
import {ReactElement, useCallback} from "react";
import {Button} from "/renderer/component/atom/button";
import {create} from "/renderer/component/create";
import {TimeView} from "/renderer/component/module/time-view";
import {WorkView} from "/renderer/component/module/work-view";
import {invalidateResponses} from "/renderer/hook/request";
import {Activity} from "/renderer/type/activity";


export const ActivityItem = create(
  require("./activity-item.scss"), "ActivityItem",
  function ({
    activity
  }: {
    activity: Activity
  }): ReactElement {

    const handleDelete = useCallback(async function (): Promise<void> {
      await window.api.deleteActivity({id: activity.id});
      await Promise.all([
        invalidateResponses("fetchMonthlyActivities"),
        invalidateResponses("fetchDailyActivities")
      ]);
    }, [activity.id]);

    return (
      <li styleName="root">
        <div styleName="top">
          <WorkView work={(activity.issue !== null) ? activity.issue : activity.project}/>
        </div>
        <div styleName="bottom">
          <TimeView styleName="time" time={activity.time}/>
          <Button styleName="button" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrashAlt}/>
          </Button>
        </div>
      </li>
    );

  }
);