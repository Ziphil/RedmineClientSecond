//

import {
  addActivity,
  deleteActivity,
  fetchDailyActivities,
  fetchMonthlyActivities
} from "/main/api/redmine/activity";
import {
  searchWorks
} from "/main/api/redmine/work";
import {
  fetchSettings
} from "/main/api/system/settings";


export const API_CATALOG = {
  addActivity,
  deleteActivity,
  fetchMonthlyActivities,
  fetchDailyActivities,
  searchWorks,
  fetchSettings
};

export type ApiCatalog = typeof API_CATALOG;