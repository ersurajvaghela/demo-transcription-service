import { Router } from "express";
import { createTranscription, getRecentTranscriptions, azureTranscription} from "../controllers/transcription.controller";

const router = Router();

router.post("/transcription", createTranscription);
router.get("/transcriptions", getRecentTranscriptions);

router.post("/azure-transcription", azureTranscription);

router.get("/", (req, res) => {
  res.send("Transcription Service is running");
});

export default router;
