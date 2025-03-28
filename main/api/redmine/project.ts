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
    numbers: parseProjectNumbers(rawEntry["name"])
  } satisfies Project;
  return project;
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
