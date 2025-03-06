//

import {DateString, Id} from "/renderer/type/common";


export interface Activity {

  id: Id;
  project: {id: Id, name: string};
  issue: {id: Id} | null;
  user: {id: Id, name: string};
  time: number;
  date: DateString;

}