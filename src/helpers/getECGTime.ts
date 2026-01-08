import type { ECGRecording } from "../types/ecg";

const ECG_FILE_PATH = "/mock/sample.json";

export async function getECGTime(): Promise<string> {
  const res = await fetch(ECG_FILE_PATH);
  if (!res.ok) throw new Error("Failed to load ECG data");

  const json: ECGRecording & { test_time: number } = await res.json();

  const date = new Date(json.test_time);
  return date.toLocaleString();
}