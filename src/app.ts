import express from "express";
import dotenv from "dotenv";
import transcriptionRoutes from "./routes/transcription.route";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", transcriptionRoutes);

app.get("/", (req, res) => {
  res.send("Service is running...");
});

export default app;
