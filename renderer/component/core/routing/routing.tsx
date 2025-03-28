/* eslint-disable react/jsx-closing-bracket-location */

import {ReactElement, Suspense} from "react";
import {RouterProvider, createHashRouter} from "react-router-dom";
import {LoadingIcon} from "/renderer/component/atom/loading-icon";
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
          <LoadingIcon styleName="icon"/>
        </div>
      )}>
        <RouterProvider router={router}/>
      </Suspense>
    );

  }
);