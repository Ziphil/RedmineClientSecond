//

import dayjs from "dayjs";
import {parseProjectName, parseProjectNumbers} from "/main/api/redmine/project";
import {Settings} from "/main/api/settings";
import type {Activity, ActivityForAdd, DateString, Id} from "/renderer/type";


export async function addActivity({activity}: {activity: ActivityForAdd}): Promise<void> {
  console.log("api called", "addActivity");
  const settings = await Settings.get();
  await settings.client.post("/time_entries.json", {timeEntry: {
    projectId: activity.project?.id,
    issueId: activity.issue?.id,
    activityId: settings.activityId,
    hours: activity.time / 1000 / 60 / 60,
    spentOn: activity.date
  }});
}

export async function deleteActivity({id}: {id: Id}): Promise<void> {
  console.log("api called", "deleteActivity");
  const settings = await Settings.get();
  await settings.client.delete(`/time_entries/${id}.json`);
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
  const rawActivities = response.data["timeEntries"] as Array<Record<string, any>>;
  const activities = rawActivities.map((rawActivity) => createActivity(rawActivity));
  const groupedActivities = groupActivity(activities);
  return groupedActivities;
}

export async function fetchDailyActivities({date}: {date: string}): Promise<Array<Activity>> {
  console.log("api called", "fetchDailyActivities");
  const settings = await Settings.get();
  const activityResponse = await settings.client.get("/time_entries.json", {params: {
    from: dayjs(date).format("YYYY-MM-DD"),
    to: dayjs(date).format("YYYY-MM-DD"),
    userId: "me",
    limit: 100
  }});
  const issueIds = getIssueIds(activityResponse.data["timeEntries"]);
  const issueResponse = await settings.client.get("/issues.json", {params: {
    ids: issueIds.join(","),
    limit: 100
  }});
  const rawIssues = issueResponse.data["issues"] as Array<Record<string, any>>;
  const rawActivities = activityResponse.data["timeEntries"] as Array<Record<string, any>>;
  const activities = rawActivities.map((rawActivity) => createActivity(rawActivity, rawIssues));
  return activities;
}

function getIssueIds(rawActivities: Array<Record<string, any>>): Array<string> {
  return rawActivities.flatMap((rawActivity) => ("issue" in rawActivity) ? [rawActivity["issue"]["id"]] : []);
}

function createActivity(rawActivity: Record<string, any>, rawIssues?: Array<Record<string, any>>): Activity {
  const rawIssue = ("issue" in rawActivity) ? rawIssues?.find((rawIssue) => rawIssue["id"] === rawActivity["issue"]["id"]) : undefined;
  const activity = {
    id: rawActivity["id"],
    project: {
      id: rawActivity["project"]["id"],
      name: parseProjectName(rawActivity["project"]["name"]),
      numbers: parseProjectNumbers(rawActivity["project"]["name"])
    },
    issue: ("issue" in rawActivity) ? {
      id: rawActivity["issue"]["id"],
      number: rawActivity["issue"]["id"],
      name: (rawIssue !== undefined) ? rawIssue["subject"] : "?"
    } : null,
    user: {
      id: rawActivity["user"]["id"],
      name: rawActivity["user"]["name"]
    },
    time: rawActivity["hours"] * 1000 * 60 * 60,
    date: rawActivity["spentOn"]
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