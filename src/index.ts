import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { router as carsRouter } from "./routes/cars";
import { initializeDatabase } from "./database/connection";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.use("/api/cars", carsRouter);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

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
