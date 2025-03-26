//

import {DateString, Id} from "/renderer/type/common";
import {SimpleProject} from "/renderer/type/project";


export interface Activity {

  id: Id;
  project: SimpleProject;
  issue: {id: Id} | null;
  user: {id: Id, name: string};
  time: number;
  date: DateString;

}