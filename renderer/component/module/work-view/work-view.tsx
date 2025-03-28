//

import {ReactElement} from "react";
import {SingleLineText} from "/renderer/component/atom/single-line-text";
import {create} from "/renderer/component/create";
import {NumberView} from "/renderer/component/module/number-view";
import {LinkedIssue, LinkedProject} from "/renderer/type";


export const WorkView = create(
  require("./work-view.scss"), "WorkView",
  function ({
    work,
    className
  }: {
    work: LinkedProject | LinkedIssue,
    className?: string
  }): ReactElement {

    return (
      <span styleName="root" className={className}>
        <NumberView styleName="number" work={work}/>
        <SingleLineText styleName="name">{work.name}</SingleLineText>
      </span>
    );

  }
);