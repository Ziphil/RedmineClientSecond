//

import {ReactElement, ReactNode} from "react";
import {create} from "/renderer/component/create";


export const Page = create(
  require("./page.scss"), "Page",
  function ({
    children
  }: {
    children: ReactNode
  }): ReactElement {

    return (
      <div styleName="root">
        {children}
      </div>
    );

  }
);