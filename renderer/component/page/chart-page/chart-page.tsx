//

import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {Page} from "/renderer/component/module/page";


export const ChartPage = create(
  null, "ChartPage",
  function ({
  }: {
  }): ReactElement {

    return (
      <Page>
        Hello!?
      </Page>
    );

  }
);