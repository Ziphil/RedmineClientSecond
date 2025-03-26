//

import {ReactElement} from "react";
import {SingleLineText} from "/renderer/component/atom/single-line-text";
import {create} from "/renderer/component/create";
import {NumberView} from "/renderer/component/module/number-view";
import {Project} from "/renderer/type/project";


export const ProjectView = create(
  require("./project-view.scss"), "ProjectView",
  function ({
    project,
    className
  }: {
    project: Project,
    className?: string
  }): ReactElement {

    return (
      <span styleName="root" className={className}>
        <NumberView styleName="number" number={project.number} project={true}/>
        <SingleLineText styleName="name">{project.name}</SingleLineText>
      </span>
    );

  }
);