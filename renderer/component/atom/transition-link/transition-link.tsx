/* eslint-disable no-useless-computed-key */

import {AnchorHTMLAttributes, ReactElement} from "react";
import {Link, Path} from "react-router-dom";
import {create} from "/renderer/component/create";


export const TransitionLink = create(
  require("./transition-link.scss"), "TransitionLink",
  function ({
    to,
    children,
    ...data
  }: AnchorHTMLAttributes<HTMLAnchorElement> & {
    to: string | Partial<Path>
  }): ReactElement {

    return (
      <Link to={to} styleName="root" viewTransition={true} {...data}>
        {children}
      </Link>
    );

  }
);