//

import {Id, Typed} from "/renderer/type/common";


export interface Project extends Typed<"project"> {

  id: Id;
  numbers: ProjectNumbers | null;
  name: string;

}


export interface LinkedProject extends Typed<"project"> {

  id: Id;
  numbers: ProjectNumbers | null;
  name: string;

}


export type ProjectNumbers = {category: number, serial: number};