/* eslint-disable react/jsx-closing-bracket-location */

import {faCircleNotch} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ReactElement, Suspense} from "react";
import {RouterProvider, createHashRouter} from "react-router-dom";
import {create} from "/renderer/component/create";
import {CalendarPage} from "/renderer/component/page/calendar-page";
import {useAutoUpdateToday} from "/renderer/hook/today";


const router = createHashRouter([
  {path: "/calendar/:monthString", element: <CalendarPage/>}
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