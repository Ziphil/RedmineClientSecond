//

import {ReactElement} from "react";
import {ProjectSelect} from "/renderer/component/atom/project-select";
import {create} from "/renderer/component/create";


export const AddActivityForm = create(
  require("./add-activity-form.scss"), "AddActivityForm",
  function ({
    className
  }: {
    className?: string
  }): ReactElement {

    return (
      <form styleName="root" className={className}>
        <ProjectSelect/>
      </form>
    );

  }
);