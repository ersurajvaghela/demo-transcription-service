import express from "express";
import dotenv from "dotenv";
import transcriptionRoutes from "./routes/transcription.route";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", transcriptionRoutes);

// Swagger setup
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Transcription API",
      version: "1.0.0",
      description: "Transcribe audio files using Azure Speech-to-Text",
    },
  },
  apis: ["./app.ts"], // files containing Swagger annotations
};

const swaggerDocs = swaggerJsdoc(options);

app.use("/api/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.get("/", (req, res) => {
  res.send("Service is running...");
});

export default app;
