//

import {Id} from "/renderer/type/common";


export interface Project {

  id: Id;
  name: string;
  number: number | null;

}


export interface SimpleProject {

  id: Id;
  name: string;
  number: number | null;

}
