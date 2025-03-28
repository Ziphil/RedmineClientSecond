//

import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {LinkedIssue, LinkedProject} from "/renderer/type";


export const NumberView = create(
  require("./number-view.scss"), "NumberView",
  function ({
    work,
    className
  }: {
    work: LinkedProject | LinkedIssue,
    className?: string
  }): ReactElement {

    return (
      <span styleName="root" className={className}>
        {(work.type === "project") && (
          <span styleName="project">P{work.numbers?.category}-</span>
        )}
        {(work.type === "project") ? work.numbers?.serial : work.number}
      </span>
    );

  }
);