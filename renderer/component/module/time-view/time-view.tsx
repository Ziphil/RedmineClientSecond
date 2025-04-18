//

import {ReactElement} from "react";
import {create} from "/renderer/component/create";


export const TimeView = create(
  require("./time-view.scss"), "TimeView",
  function ({
    time,
    className
  }: {
    time: number,
    className?: string
  }): ReactElement {

    const hour = Math.floor(time / 1000 / 60 / 60);
    const minute = Math.floor(time / 1000 / 60) % 60;
    const hourString = hour.toString();
    const minuteString = minute.toString().padStart(2, "0");

    return (
      <span styleName="root" className={className}>
        {[...hourString].map((digit, index) => (
          <span key={index} styleName="digit">{digit}</span>
        ))}
        {(
          <span styleName="colon">:</span>
        )}
        {[...minuteString].map((digit, index) => (
          <span key={index} styleName="digit">{digit}</span>
        ))}
      </span>
    );

  }
);