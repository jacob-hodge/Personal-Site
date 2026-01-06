export type ECGSamplePoint = {
  amplitude_millivolts: number;
  recording_time_delta_milliseconds: number;
};

export type ECGRecording = {
  samples: ECGSamplePoint[];
};