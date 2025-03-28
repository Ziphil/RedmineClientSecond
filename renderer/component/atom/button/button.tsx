/* eslint-disable quote-props, @typescript-eslint/naming-convention */

import {ForwardedRef, MouseEvent, ReactElement, ReactNode} from "react";
import {createWithRef} from "/renderer/component/create";


export const Button = createWithRef(
  require("./button.scss"), "Button",
  function ({
    type = "button",
    onClick,
    children,
    className,
    ref
  }: {
    type?: "button" | "submit" | "reset",
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void,
    children?: ReactNode,
    className?: string,
    ref: ForwardedRef<HTMLButtonElement>
  }): ReactElement {

    return (
      <button styleName="root" className={className} type={type} onClick={onClick} ref={ref}>
        <div styleName="inner">
          {children}
        </div>
      </button>
    );

  }
);