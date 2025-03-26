//

import {Settings} from "/main/api/settings";
import type {Project} from "/renderer/type";


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

function createProject(rawEntry: Record<string, any>): Project {
  const project = {
    id: rawEntry["id"],
    name: parseProjectName(rawEntry["name"]),
    number: parseProjectNumber(rawEntry["name"])
  } satisfies Project;
  return project;
}

export function parseProjectName(rawName: string): string {
  const name = rawName.replace(/^\d+(-|_)/, "");
  return name;
}

export function parseProjectNumber(rawName: string): number | null {
  const numberString = rawName.match(/^(\d)(\d*)(-|_)/)?.[2] ?? null;
  const number = numberString ? parseInt(numberString, 10) : null;
  return number;
}

