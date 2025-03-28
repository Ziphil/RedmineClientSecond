//

import {Opaque} from "ts-essentials";


export type Id = Opaque<number, "id">;
export type DateString = string;

export type Typed<T extends string> = {type: T};