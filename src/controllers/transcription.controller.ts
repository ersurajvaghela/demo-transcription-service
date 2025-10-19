import { Request, Response } from "express";
import { transcribeAudio } from "../services/transcription.service";
import { TranscriptionRequest, TranscriptionResponse } from "../types/transcription.types";
import { Transcription } from "../models/transcription.model";

export const createTranscription = async (
  req: Request<{}, {}, TranscriptionRequest>,
  res: Response<TranscriptionResponse | { error: string }>
) => {
  try {
    const { audioUrl } = req.body;
    if (!audioUrl) {
      return res.status(400).json({ error: "audioUrl is required" });
    }

    const record = await transcribeAudio(audioUrl, '');
    res.status(201).json({ id: (record as any)._id.toString() });
  } catch (error: any) {
    console.error("Transcription failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getRecentTranscriptions = async (
  req: Request,
  res: Response
) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const records = await Transcription.find({
      createdAt: { $gte: thirtyDaysAgo },
    }).sort({ createdAt: -1 }); // newest first

    console.log(`Fetched ${records.length} recent transcriptions`);
    res.status(200).json(records);

  } catch (error: any) {
    console.error("Error fetching recent transcriptions:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const azureTranscription = async (
  req: Request<{}, {}, TranscriptionRequest>,
  res: Response
) => {
  try {
    const { audioUrl } = req.body;
    if (!audioUrl) {
      return res.status(400).json({ error: "audioUrl is required" });
    }

    const record = await transcribeAudio(audioUrl, "azure");
    res.status(201).json({ id: (record as any)._id.toString() });
  } catch (error: any) {
    console.error("Azure Transcription failed:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};