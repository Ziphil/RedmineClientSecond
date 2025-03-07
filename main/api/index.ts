//

import {
  fetchDailyActivities,
  fetchMonthlyActivities
} from "/main/api/redmine/activity";
import {
  fetchSettings
} from "/main/api/system/settings";


export const API_CATALOG = {
  fetchMonthlyActivities,
  fetchDailyActivities,
  fetchSettings
};

export type ApiCatalog = typeof API_CATALOG;