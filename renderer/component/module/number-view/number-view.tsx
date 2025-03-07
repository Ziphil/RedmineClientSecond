//

import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {data} from "/renderer/util/data";


export const NumberView = create(
  require("./number-view.scss"), "NumberView",
  function ({
    number,
    className
  }: {
    number: number | null,
    className?: string
  }): ReactElement {

    return (
      <span styleName="root" className={className} {...data({project: number === null})}>
        {number ?? "PJ"}
      </span>
    );

  }
);