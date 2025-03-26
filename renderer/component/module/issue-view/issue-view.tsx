//

import {ReactElement} from "react";
import {SingleLineText} from "/renderer/component/atom/single-line-text";
import {create} from "/renderer/component/create";
import {NumberView} from "/renderer/component/module/number-view";
import {Id} from "/renderer/type";


export const IssueView = create(
  require("./issue-view.scss"), "IssueView",
  function ({
    issue,
    className
  }: {
    issue: {id: Id, name: string},
    className?: string
  }): ReactElement {

    return (
      <span styleName="root" className={className}>
        <NumberView styleName="number" number={issue.id} project={false}/>
        <SingleLineText styleName="name">{issue.name}</SingleLineText>
      </span>
    );

  }
);