
//

import {ForwardedRef, ReactElement} from "react";
import {createWithRef} from "/renderer/component/create";
import {AdditionalProps} from "/renderer/util/data";


export const MenuSeparator = createWithRef(
  require("./menu-separator.scss"), "MenuSeparator",
  function ({
    ref,
    ...rest
  }: {
    className?: string,
    ref: ForwardedRef<HTMLHRElement>
  } & AdditionalProps): ReactElement {

    return (
      <hr styleName="root" {...rest}/>
    );

  }
);
