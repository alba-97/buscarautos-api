import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { router as carsRouter } from "../routes/cars";
import { initializeDatabase } from "../database/connection";
import ServerlessHttp from "serverless-http";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use(
  "/.netlify/functions/server/api/uploads",
  express.static(path.join(__dirname, "./uploads"))
);

app.use("/.netlify/functions/server/api/cars", carsRouter);

initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  });

export const handler = ServerlessHttp(app);
