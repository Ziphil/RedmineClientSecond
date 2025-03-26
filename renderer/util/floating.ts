//

import {Middleware} from "@floating-ui/core";
import {size} from "@floating-ui/react";


export function fitWidth(): Middleware {
  const middleware = size({
    apply: ({rects, elements}) => {
      Object.assign(elements.floating.style, {
        width: `${rects.reference.width}px`
      });
    }
  });
  return middleware;
}