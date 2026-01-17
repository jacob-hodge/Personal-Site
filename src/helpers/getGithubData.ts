import { GITHUB_BASE_URL, GITHUB_DATA_PATH } from "../config/dataConfig";

export type GithubData = Record<string, boolean>;

const GITHUB_FILE_PATH = `${GITHUB_BASE_URL}${GITHUB_DATA_PATH}`;

export async function getGithubData(): Promise<GithubData> {
  const res = await fetch(GITHUB_FILE_PATH);
  if (!res.ok) {
    throw new Error("Failed to load github data");
  }

  return res.json();
}
