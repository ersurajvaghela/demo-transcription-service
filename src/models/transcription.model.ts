import mongoose, { Schema, Document } from "mongoose";

export interface ITranscription extends Document {
  audioUrl: string;
  transcription: string;
  source?: string;
  createdAt: Date;
}

const schema = new Schema<ITranscription>({
  audioUrl: { type: String, required: true },
  transcription: { type: String, required: true },
  source: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

export const Transcription = mongoose.model<ITranscription>("Transcription", schema);
