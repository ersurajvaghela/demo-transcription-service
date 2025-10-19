import axios from "axios";
import fs from "fs";
import path from "path";
import { Transcription } from "../models/transcription.model";
import { withRetry } from "../utils/retry";

/**
 * Downloads audio from a URL and saves it to a specified folder.
 * @param audioUrl The URL of the audio file to download.
 * @param saveFolder The folder where the downloaded audio file will be saved.
 * @returns The path to the downloaded audio file.
 */
export const downloadAudio = async (audioUrl: string, saveFolder: string = "public/downloads/transcription") => {
  // Ensure folder exists
  if (!fs.existsSync(saveFolder)) {
    fs.mkdirSync(saveFolder, { recursive: true });
  }

  // Extract file extension
  const ext = path.extname(audioUrl) || ".mp3";

  // Generate unique file name with timestamp
  const timestamp = Date.now();
  const fileName = `audio_${timestamp}${ext}`;
  const filePath = path.join(saveFolder, fileName);

  // Download with retry
  await withRetry(async () => {
    const response = await axios.get(audioUrl, { responseType: "stream", timeout: 5000 });
    if (response.status !== 200) throw new Error("Download failed");

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    await new Promise<void>((resolve, reject) => {
      writer.on("finish", () => resolve());
      writer.on("error", reject);
    });
  }, parseInt(process.env.RETRY_COUNT || "3"));

  return filePath;
};


export const transcribeAudio = async (audioUrl: string, source: string) => {
  // Mock download with retry
//   await withRetry(async () => {
//     console.log(`Downloading audio from: ${audioUrl}`);
//     const response = await axios.get(audioUrl, { timeout: 2000 }); // mock HTTP request
//     if (response.status !== 200) throw new Error("Download failed");
//   }, parseInt(process.env.RETRY_COUNT || "3"));

     const localFilePath = await downloadAudio(audioUrl);

  // Mock transcription
  const transcription = "transcribed text";

  const recordData: any = {
    audioUrl,
    transcription,
    createdAt: new Date(),
    path: localFilePath,
  };

  // Only add `source` if it exists
  if (source) {
    recordData.source = source;
  }

  console.log(`Transcription source: ${source || "default"}`);
  console.log(`Transcription completed for: ${JSON.stringify(recordData)}`);


  const record = await Transcription.create(recordData);

  return record;
};
