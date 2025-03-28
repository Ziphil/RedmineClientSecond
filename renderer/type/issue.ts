//

import {Id, Typed} from "/renderer/type/common";


export interface Issue extends Typed<"issue"> {

  id: Id;
  number: number;
  name: string;

}


export interface LinkedIssue extends Typed<"issue"> {

  id: Id;
  number: number;
  name: string;

}
