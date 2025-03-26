//

import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {data} from "/renderer/util/data";


export const NumberView = create(
  require("./number-view.scss"), "NumberView",
  function ({
    number,
    project = false,
    className
  }: {
    number: number | null,
    project?: boolean,
    className?: string
  }): ReactElement {

    return (
      <span styleName="root" className={className} {...data({project: number === null})}>
        {(project) && <span styleName="project">P</span>}
        {number}
      </span>
    );

  }
);