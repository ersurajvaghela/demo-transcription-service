export interface TranscriptionRequest {
  audioUrl: string;
}

export interface TranscriptionResponse {
  id: string;
}

export interface TranscriptionRecord {
  audioUrl: string;
  transcription: string;
  source?: string;
  createdAt: Date;
}
