//

import {ReactElement, ReactNode} from "react";
import {create} from "/renderer/component/create";


export const PageMain = create(
  require("./page-main.scss"), "PageMain",
  function ({
    children,
    className
  }: {
    children?: ReactNode,
    className?: string
  }): ReactElement {

    return (
      <section styleName="root" className={className}>
        {children}
      </section>
    );

  }
);