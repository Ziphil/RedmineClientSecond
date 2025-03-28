//

import {Settings} from "/main/api/settings";
import {isConcrete} from "/main/util/misc";
import type {Issue, Project} from "/renderer/type";


export async function searchWorks({pattern}: {pattern: string}): Promise<Array<Project | Issue>> {
  const settings = await Settings.get();
  const response = await settings.client.get("/search.json", {params: {
    q: pattern,
    projects: 1,
    issues: 1,
    titlesOnly: 1,
    limit: 100
  }});
  const rawWorks = response.data["results"] as Array<Record<string, any>>;
  const works = rawWorks.map((rawWork) => createWork(rawWork)).filter(isConcrete);
  return works;
}

export async function searchProjects({pattern}: {pattern: string}): Promise<Array<Project>> {
  console.log("api called", "searchProjects");
  const settings = await Settings.get();
  const response = await settings.client.get("/projects.json", {params: {
    name: `~${pattern}`,
    limit: 100
  }});
  const projects = response.data["projects"].map(createProject);
  return projects;
}

function createWork(rawWork: Record<string, any>): Project | Issue | null {
  if (rawWork["type"].startsWith("project")) {
    return createProject(rawWork);
  } else if (rawWork["type"].startsWith("issue")) {
    return createIssue(rawWork);
  } else {
    return null;
  }
}

function createProject(rawWork: Record<string, any>): Project {
  const rawName = rawWork["title"].replace(/^.+?:\s/, "");
  const project = {
    type: "project",
    id: rawWork["id"],
    name: parseProjectName(rawName),
    numbers: parseProjectNumbers(rawName)
  } satisfies Project;
  return project;
}

function createIssue(rawWork: Record<string, any>): Issue {
  const rawName = rawWork["title"].replace(/^.+?:\s/, "");
  const issue = {
    type: "issue",
    id: rawWork["id"],
    number: rawWork["id"],
    name: rawName
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
