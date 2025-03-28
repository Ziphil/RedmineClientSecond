//

import {DateString, Id} from "/renderer/type/common";
import {LinkedIssue} from "/renderer/type/issue";
import {LinkedProject} from "/renderer/type/project";


export interface Activity {

  id: Id;
  project: LinkedProject;
  issue: LinkedIssue | null;
  user: {id: Id, name: string};
  time: number;
  date: DateString;

}


export interface ActivityForAdd {

  project?: {id: Id};
  issue?: {id: Id};
  time: number;
  date: DateString;

}