import axios from "axios";
import { Transcription } from "../models/transcription.model";
import { withRetry } from "../utils/retry";

export const transcribeAudio = async (audioUrl: string) => {
  // Mock download with retry
  await withRetry(async () => {
    console.log(`Downloading audio from: ${audioUrl}`);
    const response = await axios.get(audioUrl, { timeout: 2000 }); // mock HTTP request
    if (response.status !== 200) throw new Error("Download failed");
  }, parseInt(process.env.RETRY_COUNT || "3"));

  // Mock transcription
  const transcription = "transcribed text";

  // Save record
  const record = await Transcription.create({
    audioUrl,
    transcription,
    createdAt: new Date(),
  });

  return record;
};
