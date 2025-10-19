import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";
import { Transcription } from "../src/models/transcription.model";

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ status: 200 })),
}));

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/test-transcriptions");
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("POST /api/transcription", () => {
  it("should create a transcription and return its id", async () => {
    const res = await request(app)
      .post("/api/transcription")
      .send({ audioUrl: "https://example.com/audio.mp3" });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();

    const record = await Transcription.findById(res.body.id);
    expect(record?.transcription).toBe("transcribed text");
  });
});
