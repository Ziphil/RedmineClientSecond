/* eslint-disable react/jsx-closing-bracket-location */

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleNotch} from "@fortawesome/sharp-light-svg-icons";
import {ReactElement, Suspense} from "react";
import {RouterProvider, createHashRouter} from "react-router-dom";
import {create} from "/renderer/component/create";
import {CalendarPage} from "/renderer/component/page/calendar-page";
import {ChartPage} from "/renderer/component/page/chart-page";
import {useAutoUpdateToday} from "/renderer/hook/today";


const router = createHashRouter([
  {path: "/calendar/:monthString", element: <CalendarPage/>},
  {path: "/chart", element: <ChartPage/>}
]);


export const Routing = create(
  require("./routing.scss"), "Routing",
  function ({
  }: {
  }): ReactElement | null {

    useAutoUpdateToday();

    return (
      <Suspense fallback={(
        <div styleName="loading">
          <FontAwesomeIcon styleName="icon" icon={faCircleNotch} spin={true}/>
        </div>
      )}>
        <RouterProvider router={router}/>
      </Suspense>
    );

  }
);