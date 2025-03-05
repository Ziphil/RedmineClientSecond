//

import {ReactElement, ReactNode} from "react";
import {create} from "/renderer/component/create";


export const Page = create(
  require("./page.scss"), "Page",
  function ({
    children,
    className
  }: {
    children: ReactNode,
    className?: string
  }): ReactElement {

    return (
      <div styleName="root" className={className}>
        {children}
      </div>
    );

  }
);