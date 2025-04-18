//

import dayjs from "dayjs";
import dayjsJa from "dayjs/locale/ja";
import updateLocalePlugin from "dayjs/plugin/updateLocale";
import {createRoot} from "react-dom/client";
import Root from "/renderer/component/root";


export class Main {

  public main(): void {
    this.setupDayjsLocale();
    this.render();
  }

  private setupDayjsLocale(): void {
    dayjs.extend(updateLocalePlugin);
    dayjs.locale(dayjsJa);
    dayjs.updateLocale("ja", {
      weekStart: 1
    });
  }

  private render(): void {
    const container = document.getElementById("root");
    if (container) {
      const root = createRoot(container);
      root.render(<Root/>);
    }
  }

}


const main = new Main();
main.main();