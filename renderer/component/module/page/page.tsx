//

import {faCalendar, faChartBar} from "@fortawesome/pro-light-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ReactElement, ReactNode} from "react";
import {useMatch} from "react-router-dom";
import {TransitionLink} from "/renderer/component/atom/transition-link";
import {create} from "/renderer/component/create";
import {useToday} from "/renderer/hook/today";
import {data} from "/renderer/util/data";


export const Page = create(
  require("./page.scss"), "Page",
  function ({
    children,
    className
  }: {
    children?: ReactNode,
    className?: string
  }): ReactElement {

    const today = useToday();
    const match = useMatch("/:primaryName/*");

    return (
      <div styleName="root">
        <aside styleName="bar">
          <TransitionLink styleName="link" to={`/calendar/${today.format("YYYY-MM")}`} {...data({active: match?.params.primaryName === "calendar"})}>
            <FontAwesomeIcon icon={faCalendar}/>
          </TransitionLink>
          <TransitionLink styleName="link" to="/chart" {...data({active: match?.params.primaryName === "chart"})}>
            <FontAwesomeIcon icon={faChartBar}/>
          </TransitionLink>
        </aside>
        <main styleName="main" className={className}>
          {children}
        </main>
      </div>
    );

  }
);