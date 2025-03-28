//

import {ReactElement, useCallback} from "react";
import {AsyncSelect, AsyncSelectOption} from "/renderer/component/atom/async-select";
import {create} from "/renderer/component/create";
import {WorkView} from "/renderer/component/module/work-view";
import {Project} from "/renderer/type";


export const ProjectSelect = create(
  require("./project-select.scss"), "ProjectSelect",
  function ({
    value,
    defaultValue,
    onSet,
    className
  }: {
    value?: Project | null,
    defaultValue?: Project | null,
    onSet?: (value: Project) => unknown,
    className?: string
  }): ReactElement {

    const loadOptions = useCallback(async function (pattern: string): Promise<Array<Project>> {
      const projects = await window.api.searchProjects({pattern});
      return projects;
    }, []);

    return (
      <AsyncSelect
        value={value}
        defaultValue={defaultValue}
        onSet={onSet}
        loadOptions={loadOptions}
        className={className}
        renderLabel={(project) => <WorkView work={project}/>}
      >
        {(project) => (
          <AsyncSelectOption key={project.id}>
            <WorkView work={project}/>
          </AsyncSelectOption>
        )}
      </AsyncSelect>
    );

  }
);