//

import {
  fetchMonthlyActivities
} from "/main/api/redmine/activity";
import {
  fetchSettings
} from "/main/api/system/settings";


export const API_CATALOG = {
  fetchMonthlyActivities,
  fetchSettings
};

export type ApiCatalog = typeof API_CATALOG;