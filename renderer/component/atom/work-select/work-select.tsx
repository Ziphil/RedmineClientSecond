//

import {ReactElement, useCallback} from "react";
import {AsyncSelect, AsyncSelectOption} from "/renderer/component/atom/async-select";
import {create} from "/renderer/component/create";
import {WorkView} from "/renderer/component/module/work-view";
import {Issue, Project} from "/renderer/type";


export const WorkSelect = create(
  require("./work-select.scss"), "WorkSelect",
  function ({
    work,
    defaultWork,
    onSet,
    className
  }: {
    work?: Project | Issue | null,
    defaultWork?: Project | Issue | null,
    onSet?: (work: Project | Issue) => unknown,
    className?: string
  }): ReactElement {

    const loadOptions = useCallback(async function (pattern: string): Promise<Array<Project | Issue>> {
      const works = await window.api.searchWorks({pattern});
      return works;
    }, []);

    return (
      <AsyncSelect
        value={work}
        defaultValue={defaultWork}
        onSet={onSet}
        loadOptions={loadOptions}
        className={className}
        renderLabel={(work) => <WorkView work={work}/>}
      >
        {(work) => (
          <AsyncSelectOption key={work.id}>
            <WorkView work={work}/>
          </AsyncSelectOption>
        )}
      </AsyncSelect>
    );

  }
);