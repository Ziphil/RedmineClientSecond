//

import {DateString, Id} from "/renderer/type/common";
import {Issue, LinkedIssue} from "/renderer/type/issue";
import {LinkedProject, Project} from "/renderer/type/project";


export interface Activity {

  id: Id;
  project: LinkedProject;
  issue: LinkedIssue | null;
  user: {id: Id, name: string};
  time: number;
  date: DateString;

}


export interface ActivityForAdd {

  work: Project | Issue;
  time: number;
  date: DateString;

}