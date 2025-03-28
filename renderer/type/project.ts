//

import {Id} from "/renderer/type/common";


export interface Project {

  id: Id;
  numbers: {category: number, serial: number} | null;
  name: string;

}


export interface LinkedProject {

  id: Id;
  numbers: {category: number, serial: number} | null;
  name: string;

}
