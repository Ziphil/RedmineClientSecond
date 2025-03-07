//

import {ReactElement} from "react";
import {create} from "/renderer/component/create";
import {Page, PageMain, PageSide} from "/renderer/component/module/page";


export const ChartPage = create(
  require("./chart-page.scss"), "ChartPage",
  function ({
  }: {
  }): ReactElement {

    return (
      <Page styleName="root">
        <PageMain styleName="main">
          TO DO
        </PageMain>
        <PageSide styleName="side" display={false}/>
      </Page>
    );

  }
);