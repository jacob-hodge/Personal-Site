import type { ECGRecording } from "../types/ecg";

const ECG_FILE_PATH = "/mock/sample.json";

export async function getECGSnippet(
  startSeconds: number,
  durationSeconds: number
): Promise<number[]> {
  const res = await fetch(ECG_FILE_PATH);
  if (!res.ok) {
    throw new Error("Failed to load ECG data");
  }

  const json: ECGRecording = await res.json();

  const startMs = startSeconds * 1000;
  const endMs = startMs + durationSeconds * 1000;

  return json.samples
    .filter(
      s =>
        s.recording_time_delta_milliseconds >= startMs &&
        s.recording_time_delta_milliseconds <= endMs
    )
    .map(s => s.amplitude_millivolts);
}