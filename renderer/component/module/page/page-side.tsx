//

import {ReactElement, ReactNode} from "react";
import {create} from "/renderer/component/create";
import {data} from "/renderer/util/data";


export const PageSide = create(
  require("./page-side.scss"), "PageSide",
  function ({
    display = true,
    children,
    className
  }: {
    display?: boolean,
    children?: ReactNode,
    className?: string
  }): ReactElement {

    return (
      <section styleName="root" className={className} {...data({display})}>
        {children}
      </section>
    );

  }
);