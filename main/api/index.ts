//

import {
  addActivity,
  deleteActivity,
  fetchDailyActivities,
  fetchMonthlyActivities
} from "/main/api/redmine/activity";
import {
  searchProjects,
  searchWorks
} from "/main/api/redmine/project";
import {
  fetchSettings
} from "/main/api/system/settings";


export const API_CATALOG = {
  addActivity,
  deleteActivity,
  fetchMonthlyActivities,
  fetchDailyActivities,
  searchWorks,
  searchProjects,
  fetchSettings
};

export type ApiCatalog = typeof API_CATALOG;