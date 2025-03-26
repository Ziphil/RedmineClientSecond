//

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleNotch} from "@fortawesome/sharp-light-svg-icons";
import {ReactElement} from "react";
import {create} from "/renderer/component/create";


export const LoadingIcon = create(
  require("./loading-icon.scss"), "LoadingIcon",
  function ({
    ...rest
  }: {
    className?: string
  }): ReactElement {

    return (
      <FontAwesomeIcon
        styleName="root"
        icon={faCircleNotch}
        spin={true}
        {...rest}
      />
    );

  }
);