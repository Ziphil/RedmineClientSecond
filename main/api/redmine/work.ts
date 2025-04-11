//

import {Settings} from "/main/api/settings";
import {isConcrete} from "/main/util/misc";
import type {Issue, Project} from "/renderer/type";


export async function searchWorks({pattern}: {pattern: string}): Promise<Array<Project | Issue>> {
  const settings = await Settings.get();
  const [issueResponse, searchResponse] = await Promise.all([
    settings.client.get(`/issues/${pattern}.json`, {params: {
      limit: 1
    }}).catch(() => undefined),
    settings.client.get("/search.json", {params: {
      q: pattern,
      projects: 1,
      issues: 1,
      titlesOnly: 1,
      limit: 100
    }}).catch(() => undefined)
  ]);
  const rawWorks = searchResponse?.data["results"] as Array<Record<string, any>> | undefined;
  const rawIssue = issueResponse?.data["issue"] as Array<Record<string, any>> | undefined;
  const works = (rawWorks !== undefined) ? rawWorks.map((rawWork) => createWorkFromSearch(rawWork)).filter(isConcrete) : [];
  const issue = (rawIssue !== undefined) ? createIssue(rawIssue) : undefined;
  return [...((issue !== undefined) ? [issue] : []), ...works];
}

function createWorkFromSearch(rawWork: Record<string, any>): Project | Issue | null {
  if (rawWork["type"].startsWith("project")) {
    return createProjectFromSearch(rawWork);
  } else if (rawWork["type"].startsWith("issue")) {
    return createIssueFromSearch(rawWork);
  } else {
    return null;
  }
}

function createProjectFromSearch(rawWork: Record<string, any>): Project {
  const rawName = rawWork["title"].replace(/^.+?:\s/, "");
  const project = {
    type: "project",
    id: rawWork["id"],
    name: parseProjectName(rawName),
    numbers: parseProjectNumbers(rawName)
  } satisfies Project;
  return project;
}

function createIssueFromSearch(rawWork: Record<string, any>): Issue {
  const rawName = rawWork["title"].replace(/^.+?:\s/, "");
  const issue = {
    type: "issue",
    id: rawWork["id"],
    number: rawWork["id"],
    name: rawName
  } satisfies Issue;
  return issue;
}

function createIssue(rawIssue: Record<string, any>): Issue {
  const issue = {
    type: "issue",
    id: rawIssue["id"],
    number: rawIssue["id"],
    name: rawIssue["subject"]
  } satisfies Issue;
  return issue;
}

export function parseProjectName(rawName: string): string {
  const name = rawName.replace(/^\d+(-|_)/, "");
  return name;
}

export function parseProjectNumbers(rawName: string): {category: number, serial: number} | null {
  const match = rawName.match(/^(\d)(\d*)(-|_)/);
  if (match !== null) {
    const categoryNumber = parseInt(match[1], 10);
    const serialNumber = parseInt(match[2], 10);
    if (!isNaN(categoryNumber) && !isNaN(serialNumber)) {
      return {category: categoryNumber, serial: serialNumber};
    } else {
      return null;
    }
  } else {
    return null;
  }
}
