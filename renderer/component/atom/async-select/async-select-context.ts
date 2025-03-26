//

import {createContext} from "react";
import {noop} from "ts-essentials";


export type AsyncSelectContextValue = {
  updateValue: (value: any) => void
};

export const asyncSelectContext = createContext<AsyncSelectContextValue>({
  updateValue: noop
});
export const AsyncSelectContextProvider = asyncSelectContext["Provider"];