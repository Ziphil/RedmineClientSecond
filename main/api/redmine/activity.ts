//

import dayjs from "dayjs";
import {parseProjectName, parseProjectNumber} from "/main/api/redmine/project";
import {Settings} from "/main/api/settings";
import type {Activity, ActivityForAdd, DateString} from "/renderer/type";


export async function addActivity({activity}: {activity: ActivityForAdd}): Promise<void> {
  console.log("api called", "addActivity");
  const settings = await Settings.get();
  await settings.client.post("/time_entries.json", {timeEntry: {
    projectId: activity.project?.id,
    issueId: activity.issue?.id,
    activityId: settings.activityId,
    hours: activity.time / 1000 / 60 / 60
  }});
}

export async function fetchMonthlyActivities({month}: {month: string}): Promise<Map<DateString, Array<Activity>>> {
  console.log("api called", "fetchMonthlyActivities");
  const settings = await Settings.get();
  const response = await settings.client.get("/time_entries.json", {params: {
    from: dayjs(month, "YYYY-MM").startOf("month").format("YYYY-MM-DD"),
    to: dayjs(month, "YYYY-MM").endOf("month").format("YYYY-MM-DD"),
    userId: "me",
    limit: 100
  }});
  const activities = response.data["timeEntries"].map(createActivity);
  const groupedActivities = groupActivity(activities);
  return groupedActivities;
}

export async function fetchDailyActivities({date}: {date: string}): Promise<Array<Activity>> {
  console.log("api called", "fetchDailyActivities");
  const settings = await Settings.get();
  const response = await settings.client.get("/time_entries.json", {params: {
    from: dayjs(date).format("YYYY-MM-DD"),
    to: dayjs(date).format("YYYY-MM-DD"),
    userId: "me",
    limit: 100
  }});
  const activities = response.data["timeEntries"].map(createActivity);
  return activities;
}

function createActivity(rawEntry: Record<string, any>): Activity {
  const activity = {
    id: rawEntry["id"],
    project: {
      id: rawEntry["project"]["id"],
      name: parseProjectName(rawEntry["project"]["name"]),
      number: parseProjectNumber(rawEntry["project"]["name"])
    },
    issue: ("issue" in rawEntry) ? {
      id: rawEntry["issue"]["id"]
    } : null,
    user: {
      id: rawEntry["user"]["id"],
      name: rawEntry["user"]["name"]
    },
    time: rawEntry["hours"] * 1000 * 60 * 60,
    date: rawEntry["spentOn"]
  } satisfies Activity;
  return activity;
}

function groupActivity(activities: Array<Activity>): Map<DateString, Array<Activity>> {
  const map = new Map<DateString, Array<Activity>>();
  for (const activity of activities) {
    const date = activity.date;
    if (!map.has(date)) {
      map.set(date, []);
    }
    map.get(date)!.push(activity);
  }
  return map;
}