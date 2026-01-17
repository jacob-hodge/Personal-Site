import { DATA_BASE_URL, ACTIVITY_DATA_PATH } from "../config/dataConfig";

export type ActivityData = Record<string, boolean>;

const ACTIVITY_FILE_PATH = `${DATA_BASE_URL}${ACTIVITY_DATA_PATH}`;

export async function getActivityData(): Promise<ActivityData> {
  const res = await fetch(ACTIVITY_FILE_PATH);
  if (!res.ok) {
    throw new Error("Failed to load activity data");
  }

  return res.json();
}
