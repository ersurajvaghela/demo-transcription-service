# Transcription Service API

A minimal **Node.js + TypeScript** backend service that accepts an audio file URL, mocks transcription, and stores the result in MongoDB. Designed with clean code architecture, TypeScript interfaces, retry logic, and test coverage.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Setup](#setup)
* [Environment Variables](#environment-variables)
* [Endpoints](#endpoints)
* [Testing](#testing)
* [MongoDB Indexing](#mongodb-indexing)
* [Scaling the Service](#scaling-the-service)

---

## Features

* POST `/api/transcription` → accepts audio URL, mocks transcription, stores in MongoDB
* GET `/api/transcriptions` → fetch transcriptions created in the last 30 days
* Retry logic for download failures
* TypeScript interfaces for request/response types
* Clean architecture: **controllers**, **services**, **models**, **routes**
* Jest test coverage for API endpoints

---

## Tech Stack

* **Node.js** + **TypeScript**
* **Express** (REST API)
* **MongoDB** (Mongoose)
* **Axios** (mock download)
* **Jest** + **Supertest** (testing)
* **dotenv** (environment variables)

---

## Setup

```bash
# Clone repository
git clone <repo-url>
cd transcription-api

# Install dependencies
npm install

# Start development server
npm run dev
```

Server will run at `http://localhost:3500`.

---

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/transcriptions
RETRY_COUNT=3
```

* `PORT` → port for Express server
* `MONGO_URI` → MongoDB connection string
* `RETRY_COUNT` → number of retries for download

---

## Endpoints

### POST `/api/transcription`

**Request Body:**

```json
{
  "audioUrl": "https://example.com/sample.mp3"
}
```

**Response:**

```json
{
  "id": "68f4752cdb810b07a8c445ec"
}
```

**Behavior:**

* Mock downloads audio from URL
* Mocks transcription as "transcribed text"
* Stores `{ audioUrl, transcription, createdAt }` in MongoDB
* Returns MongoDB `_id`

---

### GET `/api/transcriptions`

**Response:**

```json
[
  {
    "_id": "68f4752cdb810b07a8c445ec",
    "audioUrl": "https://example.com/sample.mp3",
    "transcription": "transcribed text",
    "createdAt": "2025-10-01T10:00:00.000Z"
  }
]
```

**Behavior:**

* Returns transcriptions created in the last **30 days**, newest first
---

### POST `/api/azure-transcription`

**Request Body:**

```json
{
  "audioUrl": "https://example.com/sample.mp3"
}
```

**Response:**

```json
{
  "id": "68f478867767b6cc71f45d04"
}
```

**Behavior:**

* Mock downloads audio from URL
* Mocks transcription as "transcribed text"
* localpath

* Stores `{ audioUrl, transcription, source, createdAt }` in MongoDB
* Returns MongoDB `_id`

---

## Testing

Run tests with:

```bash
npm test
```

* Tests use **Jest + Supertest**
* Axios is mocked for download
* Includes POST and GET endpoint tests

---

## MongoDB Indexing

For large datasets (100M+ records):

```js
db.transcriptions.createIndex({ createdAt: -1 });
```

* Optimizes queries filtering by `createdAt` and sorting by newest first
* Ensures fast access to recent transcriptions

---

## Scaling the Service

To handle **10k+ concurrent requests**:

1. **Load Balancing & Containerization**

   * Deploy in Docker containers behind a load balancer
   * Use autoscaling to handle traffic spikes

2. **Asynchronous Processing with Queues**

   * Offload transcription to a **message queue** (RabbitMQ, Kafka)
   * Workers consume tasks asynchronously, preventing timeouts

3. **Caching Frequently Accessed Data**

   * Use Redis or in-memory cache for repeated queries
   * Reduces load on MongoDB and speeds up responses

---

## License

MIT
